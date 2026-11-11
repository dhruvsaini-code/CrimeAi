import React from 'react';
import { ShieldCheck, AlertOctagon, BookOpen, CheckCircle, Lock } from 'lucide-react';

export const AboutEthicsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-dark-panel border-l-4 border-emerald-500 border-y border-r border-dark-line p-6 rounded-lg shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ETHICAL & RESPONSIBLE AI DECLARATION</span>
        </div>
        <h2 className="text-3xl font-display font-bold text-crime-text">
          Ethical Framework, Provenance & Academic Mandate
        </h2>
        <p className="text-xs text-crime-muted font-mono mt-1">
          CrimePattern AI is built under rigorous ethical guidelines for university forensic data science and artificial intelligence research.
        </p>
      </div>

      {/* Prohibitions Card */}
      <div className="bg-dark-panel border border-dark-line rounded-lg p-6 shadow-xl space-y-4">
        <h3 className="text-xl font-display font-bold text-crime-red flex items-center gap-2">
          <AlertOctagon className="w-5 h-5" />
          <span>Strict Ethical Prohibitions</span>
        </h3>
        <p className="text-xs text-crime-subtext font-mono leading-relaxed">
          The system enforces strict behavioral and algorithmic boundaries:
        </p>

        <ul className="space-y-3 font-mono text-xs text-crime-subtext">
          <li className="flex items-start gap-3 bg-dark-card border border-dark-line p-3.5 rounded">
            <span className="text-crime-red font-bold">1.</span>
            <div>
              <strong className="text-crime-text">No Prediction of Living Individuals:</strong> Under no
              circumstances does this software predict whether any living person is a criminal, will commit a crime,
              or is at risk of recidivism.
            </div>
          </li>
          <li className="flex items-start gap-3 bg-dark-card border border-dark-line p-3.5 rounded">
            <span className="text-crime-red font-bold">2.</span>
            <div>
              <strong className="text-crime-text">No Suspect Profiling or Accusation:</strong> This tool
              cannot be utilized to identify suspects, evaluate investigative targets, or generate automated policing labels.
            </div>
          </li>
          <li className="flex items-start gap-3 bg-dark-card border border-dark-line p-3.5 rounded">
            <span className="text-crime-red font-bold">3.</span>
            <div>
              <strong className="text-crime-text">No Causality Claims:</strong> Statistical correlation,
              vector similarity, or association rule lift does not imply systemic causal linkage or organizational conspiracy.
            </div>
          </li>
        </ul>
      </div>

      {/* Provenance Card */}
      <div className="bg-dark-panel border border-dark-line rounded-lg p-6 shadow-xl space-y-4">
        <h3 className="text-xl font-display font-bold text-crime-tape flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <span>Dataset Provenance & Quality Validation</span>
        </h3>
        <div className="text-xs font-mono text-crime-subtext space-y-3 leading-relaxed">
          <p>
            The dataset comprises <strong>492 publicly documented historical serial crime cases</strong> spanning
            from 1900 to 2022 across 83 sovereign countries.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-dark-card border border-dark-line p-3 rounded">
              <div className="text-crime-muted text-[11px]">Primary Source:</div>
              <div className="text-crime-text font-bold">Public Encyclopedic Archives (Wikipedia)</div>
            </div>
            <div className="bg-dark-card border border-dark-line p-3 rounded">
              <div className="text-crime-muted text-[11px]">Verification Status:</div>
              <div className="text-emerald-400 font-bold">100% Traceable Citations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Use Notice */}
      <div className="bg-dark-card border border-dark-line p-5 rounded-lg text-xs font-mono text-crime-muted flex items-start gap-3">
        <Lock className="w-4 h-4 text-crime-tape shrink-0 mt-0.5" />
        <div>
          <strong>Applications of AI University Project:</strong> Built for academic curriculum viva and
          demonstration of unsupervised clustering, association rule mining, graph algorithms, and NLP information retrieval.
        </div>
      </div>
    </div>
  );
};

