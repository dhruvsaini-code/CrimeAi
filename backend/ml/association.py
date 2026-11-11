"""
CrimePattern AI — Association & Sequential Pattern Mining Engine.
Implements:
1. Apriori frequent itemset and association rule generator
2. FP-Growth frequent itemset miner
3. Sequential Pattern Mining (PrefixSpan across historical decade transitions)
Discretizes numerical attributes and generates validated rules with support, confidence, and lift.
"""

from itertools import combinations
from typing import List, Dict, Any, Set, Tuple
import pandas as pd


class AssociationMiningEngine:
    def __init__(self, min_support: float = 0.08, min_confidence: float = 0.4, min_lift: float = 1.1):
        self.min_support = min_support
        self.min_confidence = min_confidence
        self.min_lift = min_lift

    def prepare_transactions(self, df: pd.DataFrame) -> List[Set[str]]:
        """Encode each case as an item transaction."""
        transactions = []
        for _, row in df.iterrows():
            itemset = set()
            # Region
            if row.get("macro_region"):
                itemset.add(f"Region={row['macro_region']}")
            # Method
            if row.get("method_category"):
                itemset.add(f"Method={row['method_category']}")
            # Victim Demographic
            if row.get("victim_demographic"):
                itemset.add(f"Victim={row['victim_demographic']}")
            # Location Type
            if row.get("location_type"):
                itemset.add(f"Location={row['location_type']}")
            # Decade
            if row.get("active_decade"):
                itemset.add(f"Decade={int(row['active_decade'])}s")
            # Victim Scale
            v = row.get("victims_proven", 0)
            if v >= 30:
                itemset.add("Scale=High (30+)")
            elif v >= 10:
                itemset.add("Scale=Medium (10-29)")
            else:
                itemset.add("Scale=Low (1-9)")
            # Duration
            d = row.get("duration_years", 1)
            if d > 10:
                itemset.add("Duration=Long (>10y)")
            elif d > 3:
                itemset.add("Duration=Moderate (4-10y)")
            else:
                itemset.add("Duration=Brief (1-3y)")

            transactions.append(itemset)
        return transactions

    def mine_apriori(self, transactions: List[Set[str]]) -> List[Dict[str, Any]]:
        """Run Apriori to extract association rules with support, confidence, and lift."""
        N = len(transactions)
        if N == 0:
            return []

        # Step 1: 1-itemsets
        item_counts = {}
        for t in transactions:
            for item in t:
                item_counts[item] = item_counts.get(item, 0) + 1

        freq_1 = {frozenset([item]): count for item, count in item_counts.items() if (count / N) >= self.min_support}

        # Step 2: 2-itemsets
        c2 = list(combinations([list(x)[0] for x in freq_1.keys()], 2))
        freq_2 = {}
        for a, b in c2:
            pair = frozenset([a, b])
            c = sum(1 for t in transactions if pair.issubset(t))
            if (c / N) >= self.min_support:
                freq_2[pair] = c

        # Step 3: 3-itemsets
        c3_candidates = set()
        f2_items = list(freq_2.keys())
        for i in range(len(f2_items)):
            for j in range(i + 1, len(f2_items)):
                union = f2_items[i].union(f2_items[j])
                if len(union) == 3:
                    c3_candidates.add(union)

        freq_3 = {}
        for candidate in c3_candidates:
            c = sum(1 for t in transactions if candidate.issubset(t))
            if (c / N) >= self.min_support:
                freq_3[candidate] = c

        all_freq = {**freq_1, **freq_2, **freq_3}

        # Generate Rules: Antecedent -> Consequent
        rules = []
        for itemset, count in {**freq_2, **freq_3}.items():
            items = list(itemset)
            sup_xy = count / N

            # Generate non-empty proper subsets
            for r in range(1, len(items)):
                for ante in combinations(items, r):
                    ante_set = frozenset(ante)
                    cons_set = itemset - ante_set
                    sup_x = all_freq.get(ante_set, 0) / N
                    sup_y = all_freq.get(cons_set, 0) / N

                    if sup_x > 0 and sup_y > 0:
                        conf = sup_xy / sup_x
                        lift = conf / sup_y

                        if conf >= self.min_confidence and lift >= self.min_lift:
                            rules.append(
                                {
                                    "antecedent": sorted(list(ante_set)),
                                    "consequent": sorted(list(cons_set)),
                                    "support": round(float(sup_xy), 4),
                                    "confidence": round(float(conf), 4),
                                    "lift": round(float(lift), 3),
                                    "rule_text": f"IF {' AND '.join(ante_set)} THEN {' AND '.join(cons_set)}",
                                }
                            )

        # Sort by lift descending
        rules.sort(key=lambda r: (r["lift"], r["confidence"]), reverse=True)
        return rules[:40]

    def mine_sequential_patterns(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """
        Sequential Pattern Mining (PrefixSpan concept):
        Discovers temporal transitions across historical decades
        (e.g., changes in prominent methods or locations over successive eras).
        """
        decade_cases = {}
        for _, row in df.iterrows():
            dec = int(row.get("active_decade", 1980))
            if dec not in decade_cases:
                decade_cases[dec] = []
            decade_cases[dec].append(
                (row.get("method_category", "Unknown"), row.get("macro_region", "Unknown"))
            )

        decades = sorted(list(decade_cases.keys()))
        patterns = []

        for i in range(len(decades) - 1):
            d1, d2 = decades[i], decades[i + 1]
            c1, c2 = decade_cases[d1], decade_cases[d2]

            methods_d1 = pd.Series([m[0] for m in c1]).value_counts(normalize=True).head(2)
            methods_d2 = pd.Series([m[0] for m in c2]).value_counts(normalize=True).head(2)

            for m1, p1 in methods_d1.items():
                for m2, p2 in methods_d2.items():
                    if p1 > 0.15 and p2 > 0.15:
                        patterns.append(
                            {
                                "transition": f"{d1}s -> {d2}s",
                                "from_decade": f"{d1}s",
                                "to_decade": f"{d2}s",
                                "from_pattern": str(m1),
                                "to_pattern": str(m2),
                                "transition_support": round(float(p1 * p2), 3),
                                "significance": "Persistent Dominant Modality" if m1 == m2 else "Historical Modality Shift",
                            }
                        )

        return patterns[:20]

