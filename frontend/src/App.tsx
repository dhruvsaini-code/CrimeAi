import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BloodDrip } from './components/BloodDrip';
import { ForensicBackdrop } from './components/ForensicBackdrop';
import { CaseDossierModal } from './components/CaseDossierModal';
import { OverviewPage } from './pages/OverviewPage';
import { CaseExplorerPage } from './pages/CaseExplorerPage';
import { ClusteringPage } from './pages/ClusteringPage';
import { SearchPage } from './pages/SearchPage';
import { GraphPage } from './pages/GraphPage';
import { AnomalyPage } from './pages/AnomalyPage';
import { PatternsPage } from './pages/PatternsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AboutEthicsPage } from './pages/AboutEthicsPage';
import { CaseAnalyzer } from './components/CaseAnalyzer';
import { TimelineChart } from './components/TimelineChart';
import { GeoExplorer } from './components/GeoExplorer';
import { api } from './services/api';
import { DashboardStats, CaseItem, TimelineData } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [geoSummary, setGeoSummary] = useState<any | null>(null);
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<CaseItem | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  // Periodic real backend health check (Issue 1 Fix)
  useEffect(() => {
    let isMounted = true;

    const checkSystemHealth = async () => {
      try {
        const health = await api.checkHealth();
        if (isMounted) {
          setBackendOnline(health.online);
        }
      } catch {
        if (isMounted) setBackendOnline(false);
      }
    };

    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 15000); // Probe every 15s

    // Initial fetch of core stats, timeline, and geography
    api.getOverviewStats().then((res) => setStats(res)).catch((e) => console.error(e));
    api.getTimeline().then((res) => setTimelineData(res)).catch((e) => console.error(e));
    api.getGeographySummary().then((res) => setGeoSummary(res)).catch((e) => console.error(e));

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleSelectCaseDetail = async (caseId: string) => {
    try {
      const caseItem = await api.getCaseDetail(caseId);
      setSelectedCaseDetail(caseItem);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040406] text-[#efe9e1] flex flex-col font-sans selection:bg-[#8B0000] selection:text-white">
      {/* Full-Screen Layered Forensic Investigation Backdrop */}
      <ForensicBackdrop />

      {/* Top Documentary Command Center Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendOnline={backendOnline}
      />

      {/* Realistic Photographic Dripping Blood Accent */}
      <BloodDrip variant="top-banner" />

      {/* Main Content Area: Full-bleed for Overview homepage, centered container for analytical subpages */}
      <main
        className={
          activeTab === 'overview'
            ? 'relative z-10 flex-1 w-full'
            : 'relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'
        }
      >
        {activeTab === 'overview' && (
          <OverviewPage
            stats={stats}
            setActiveTab={setActiveTab}
            onSelectCaseDetail={handleSelectCaseDetail}
            backendOnline={backendOnline}
          />
        )}

        {activeTab === 'clustering' && (
          <ClusteringPage onSelectCaseDetail={handleSelectCaseDetail} />
        )}

        {activeTab === 'search' && (
          <SearchPage onSelectCaseDetail={handleSelectCaseDetail} />
        )}

        {activeTab === 'cases' && (
          <CaseExplorerPage onSelectCaseDetail={handleSelectCaseDetail} />
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-8">
            {timelineData && <TimelineChart timelineData={timelineData} />}
            {geoSummary && (
              <GeoExplorer
                geoSummary={geoSummary}
                onSelectCase={handleSelectCaseDetail}
              />
            )}
          </div>
        )}

        {activeTab === 'graph' && (
          <GraphPage onSelectCaseDetail={handleSelectCaseDetail} />
        )}

        {activeTab === 'anomaly' && (
          <AnomalyPage onSelectCaseDetail={handleSelectCaseDetail} />
        )}

        {activeTab === 'patterns' && <PatternsPage />}

        {activeTab === 'analyze' && (
          <div className="space-y-6">
            <div className="bg-[#0b0c10] border border-[#222226] p-6 rounded-sm shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-oswald font-semibold uppercase tracking-wide text-[#f3f4f6]">
                  Forensic Case Comparison & Similarity Engine
                </h2>
                <p className="text-xs text-[#9ca3af] font-mono mt-1">
                  Enter documented case characteristics or investigative text to identify closest historical matches
                  and project the query into the 2D PCA cluster space.
                </p>
              </div>
            </div>
            <CaseAnalyzer onSelectCaseDetail={handleSelectCaseDetail} />
          </div>
        )}

        {activeTab === 'methodology' && <MethodologyPage />}

        {activeTab === 'ethics' && <AboutEthicsPage />}
      </main>

      {/* Slide-in Case Dossier Modal */}
      <CaseDossierModal
        caseItem={selectedCaseDetail}
        onClose={() => setSelectedCaseDetail(null)}
      />

      {/* Gothic Forensic Footer */}
      <footer className="relative z-20 border-t border-[#261416] bg-[#070709] py-6 text-xs font-mono text-[#9ca3af] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bebas tracking-wide text-lg text-[#C00000]">CRIMEPATTERN AI</span>
            <span className="text-[#6b7280]">·</span>
            <span>Historical Forensic Machine Learning System</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FastAPI + React 18</span>
            <span>·</span>
            <span>492 Documented Cases</span>
            <span>·</span>
            <span className="text-[#ff6666]">Strictly Non-Predictive Research</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
