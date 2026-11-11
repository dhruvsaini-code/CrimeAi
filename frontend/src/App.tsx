import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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

  useEffect(() => {
    // Initial fetch of core stats, timeline, and geography
    api.getOverviewStats().then((res) => setStats(res)).catch((e) => console.error(e));
    api.getTimeline().then((res) => setTimelineData(res)).catch((e) => console.error(e));
    api.getGeographySummary().then((res) => setGeoSummary(res)).catch((e) => console.error(e));
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
    <div className="min-h-screen bg-dark-bg text-crime-text flex flex-col font-sans">
      {/* Top Command Center Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewPage
            stats={stats}
            setActiveTab={setActiveTab}
            onSelectCaseDetail={handleSelectCaseDetail}
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
            <div className="bg-dark-panel border border-dark-line p-6 rounded-lg shadow-xl">
              <h2 className="text-3xl font-display font-bold text-crime-text">
                Forensic Case Comparison & Similarity Engine
              </h2>
              <p className="text-xs text-crime-muted font-mono mt-1">
                Enter documented case characteristics or investigative text to identify closest historical matches
                and project the query into the 2D PCA cluster space.
              </p>
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

      {/* Footer */}
      <footer className="border-t border-dark-line bg-dark-panel py-6 text-xs font-mono text-crime-muted mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            CRIMEPATTERN AI · Applications of AI Academic Research Project
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FastAPI + React 18</span>
            <span>·</span>
            <span>492 Historical Cases</span>
            <span>·</span>
            <span className="text-crime-tape">Strictly Non-Predictive</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

