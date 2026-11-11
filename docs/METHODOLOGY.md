# CrimePattern AI — Algorithmic Architecture & Forensic Data Science Methodology

## Academic & Educational Notice
**CrimePattern AI** is strictly an academic, educational, and historical pattern discovery system. It analyses publicly documented historical serial crime cases to demonstrate unsupervised clustering, topological graph intelligence, association rule mining, and natural language information retrieval.
It **never** predicts whether a living person is a criminal, identifies suspects, or profiles individuals.

---

## 1. Data Ingestion, Deduplication & Preprocessing

The historical dataset comprises **492 publicly documented historical cases** across **83 countries**, spanning from 1900 to 2022.

### 1.1 Data Provenance
- Source: Documented public encyclopedic records (Wikipedia historical archives).
- Every case includes:
  - Unique identifier (`CASE-001` through `CASE-492`)
  - Case name / Subject designation
  - Primary sovereign country and macro-geographic region
  - Active start year, end year, active decade, and active duration
  - Documented proven victims, possible victims, confessed victims, and victim scale category
  - Method category (Strangulation / Asphyxiation, Stabbing / Sharp Instrument, Firearm, Blunt Force / Beating, Poisoning / Medical, Arson / Fire)
  - Target demographic profile (Young Adults / Students, Children / Minors, Elderly / Vulnerable, Medical Patients, Travellers / Hitchhikers, etc.)
  - Site type (Highway / Rural / Remote, Residential / Private Residence, Healthcare / Institutional, Urban / Commercial)
  - Neutral archival synopsis
  - Traceable source title and URL

### 1.2 Missing-Value Handling & Standardization
- Numerical median imputation for missing start years and victim tallies.
- Unknown category handling preventing silent leakage into confirmed facts.
- Categorical one-hot encoding across macro-regions, methods, victim demographics, and location sites.
- Standard feature scaling ($\mu = 0, \sigma = 1$) via scikit-learn `StandardScaler`.

---

## 2. Machine Learning & Unsupervised Pattern Discovery

### 2.1 K-Means Clustering
Partitions cases into $k=5$ forensic modality archetypes by minimizing within-cluster sum of squares (inertia):
$$\arg\min_S \sum_{i=1}^k \sum_{x \in S_i} \| x - \mu_i \|^2$$
Evaluated across $k=2\dots 10$ with the Elbow method and Silhouette coefficients.

### 2.2 DBSCAN (Density-Based Spatial Clustering of Applications with Noise)
Discovers dense clusters without forcing arbitrary spherical shapes ($\epsilon = 2.2, \text{min\_samples} = 4$).
**Forensic Note:** Noise designations indicate statistical rarity in documented attributes, never criminal culpability.

### 2.3 Principal Component Analysis (PCA)
Orthogonal linear transformation projecting the 33-dimensional forensic feature space into two principal components for visual cluster galaxy rendering, capturing ~30% of total variance without distorting underlying distances.

### 2.4 Multi-Algorithm Benchmark Comparison
Systematic comparative evaluation across 5 clustering algorithms:
1. K-Means
2. DBSCAN
3. Agglomerative Hierarchical Clustering (Ward linkage)
4. Gaussian Mixture Models (Expectation-Maximization)
5. Spectral Clustering

Evaluated using:
- **Silhouette Coefficient** (cluster cohesion vs separation)
- **Davies-Bouldin Index** (ratio of within-cluster distances to between-cluster distances)
- **Calinski-Harabasz Score** (variance ratio criterion)

---

## 3. Intelligent Information Retrieval & Forensic NLP

### 3.1 Lexical & Probabilistic Ranking
- **TF-IDF Vectorizer**: Sublinear term frequency with inverse document frequency.
- **Okapi BM25**: Non-linear term saturation with document length normalization:
$$\text{Score}(D, Q) = \sum_{q \in Q} \text{IDF}(q) \cdot \frac{f(q, D) \cdot (k_1 + 1)}{f(q, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgDL}}\right)}$$

### 3.2 Dense Semantic Vector Retrieval (TruncatedSVD / LSA)
Computes dense 64-dimensional semantic latent vectors from the co-occurrence matrix, normalized to unit Euclidean length for cosine similarity calculations:
$$\cos(\theta) = \frac{u \cdot v}{\|u\|_2 \|v\|_2}$$

### 3.3 Exact Index Search
- K-Nearest Neighbors (KNN with cosine and euclidean distance)
- BallTree and KDTree spatial search structures.

---

## 4. Graph Intelligence & Community Detection

Constructs an attribute relationship graph linking historical cases:
- Shared method and macro-region ($w = 1.0$)
- Shared method and active decade ($w = 0.8$)
- Shared region and active decade ($w = 0.5$)

Algorithms implemented:
1. **PageRank Centrality**: Authority score quantifying historical archetype centrality.
2. **Louvain Modularity / Label Propagation**: Unsupervised community partition.
3. **Dijkstra Shortest Path**: Minimal forensic distance ($d = 1 / w$) between cases.
4. **BFS & DFS**: Graph traversal exploration.

---

## 5. Statistical Anomaly Detection

- **Isolation Forest**: Isolates anomalies by constructing random decision trees; outliers have significantly shorter path lengths.
- **Local Outlier Factor (LOF)**: Measures local density deviation relative to $k=20$ nearest neighbors.
- **Factor Attribution**: Explains why a record was flagged (e.g. extreme victim count, multi-decade duration, specialized medical background).

---

## 6. Association & Sequential Pattern Mining

- **Apriori Algorithm**: Extracts frequent forensic itemsets across discretized transaction attributes evaluated by Support, Confidence, and Lift.
$$\text{Lift}(A \to B) = \frac{P(A \cap B)}{P(A) \cdot P(B)}$$
- **PrefixSpan Sequential Mining**: Identifies longitudinal shifts in prominent methods and regional occurrences across successive decades (1950s $\to$ 2010s).

---

## 7. Hyperparameter Optimization

Automated search engines compare hyperparameter configurations:
1. **Grid Search**: Exhaustive exploration over K-Means $k$, initialization methods, and iteration limits.
2. **Random Search**: Stochastic sampling over DBSCAN $\epsilon$ and `min_samples`.
3. **Genetic Algorithm**: Evolutionary chromosome selection (crossover and mutation) optimizing the Silhouette coefficient.

