import React, { useState } from 'react';
import { ClinicalCase, BiomarkerStatus } from '../types';
import {
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  Printer,
  FileText,
  RotateCcw,
  Check,
  Stethoscope,
  Filter,
  Shield,
  Layers,
} from 'lucide-react';

interface ClinicalInterpretationProps {
  clinicalCase: ClinicalCase;
  onReset: () => void;
}

export const ClinicalInterpretation: React.FC<ClinicalInterpretationProps> = ({
  clinicalCase,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'biomarkers' | 'correlation' | 'reflex'>('summary');
  const [biomarkerFilter, setBiomarkerFilter] = useState<'ALL' | 'ABNORMAL' | 'CRITICAL'>('ALL');
  const [customPathologistNote, setCustomPathologistNote] = useState<string>('');
  const [selectedReflexOrders, setSelectedReflexOrders] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    clinicalCase.reflexTests.forEach((t) => {
      initial[t.id] = t.recommended;
    });
    return initial;
  });
  const [isSigned, setIsSigned] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [signatureTimestamp, setSignatureTimestamp] = useState<string>('');

  const toggleReflex = (id: string) => {
    setSelectedReflexOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSignReport = () => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setSignatureTimestamp(time);
    setIsSigned(true);
    setShowSignModal(false);
  };

  const filteredBiomarkers = clinicalCase.biomarkers.filter((b) => {
    if (biomarkerFilter === 'CRITICAL') {
      return b.status === 'CRITICAL_LOW' || b.status === 'CRITICAL_HIGH';
    }
    if (biomarkerFilter === 'ABNORMAL') {
      return b.status !== 'NORMAL';
    }
    return true;
  });

  const getStatusBadge = (status: BiomarkerStatus) => {
    switch (status) {
      case 'CRITICAL_LOW':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-950 text-rose-300 border border-rose-800">
            CRITICAL LOW
          </span>
        );
      case 'CRITICAL_HIGH':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-950 text-rose-300 border border-rose-800">
            CRITICAL HIGH
          </span>
        );
      case 'LOW':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-950 text-amber-300 border border-amber-800/80">
            LOW
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-950 text-amber-300 border border-amber-800/80">
            HIGH
          </span>
        );
      case 'NORMAL':
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-emerald-400 border border-slate-700">
            NORMAL
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Mandatory Clinical Governance & AI Disclaimer Banner */}
      <div className="p-4 rounded-lg bg-slate-900 border-l-4 border-l-sky-500 border border-slate-800 shadow-sm text-xs text-slate-300 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-mono font-bold text-[10px] uppercase border border-sky-800">
              AI-Generated Clinical Synthesis
            </span>
            <span className="font-semibold text-slate-200">
              Professional Diagnostic Prototype • Fictional Simulation
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            LIS Regulatory Governance Standard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-[11px] leading-relaxed">
          <div className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span>
              <strong className="text-slate-200">AI-Generated for Professional Review:</strong> This clinical interpretation is synthesized by an automated diagnostic model and is intended solely for review by licensed pathologists and medical specialists.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>
              <strong className="text-slate-200">Not a Definitive Diagnosis:</strong> This analytical interpretation is not a final clinical diagnosis and does not constitute medical claims regarding patient health status.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span>
              <strong className="text-slate-200">Original Source Verification Required:</strong> Attending physicians and pathologists must independently examine the original laboratory source documents, patient history, and physical examination findings.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 font-bold">•</span>
            <span>
              <strong className="text-slate-200">Simulated Fictional Data:</strong> All biomarkers, reference ranges, and patient profiles presented in this interface are fictional placeholder data for prototype workflow evaluation.
            </span>
          </div>
        </div>
      </div>

      {/* Critical Value Action Banner if present */}
      {clinicalCase.criticalAlert && (
        <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/70 text-rose-200 flex items-start justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-rose-300">
                Panic / Critical Threshold Alert
              </div>
              <p className="text-sm font-medium text-slate-100 mt-0.5">
                {clinicalCase.criticalAlert}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono font-semibold uppercase rounded bg-rose-900/80 text-rose-100 border border-rose-700 shrink-0">
            Immediate Action Required
          </span>
        </div>
      )}

      {/* Patient & Accession Executive Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-slate-100">
              {clinicalCase.patientName}
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {clinicalCase.patientSex === 'Female' ? 'Female' : 'Male'}, {clinicalCase.patientAge} Years
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
              MRN: {clinicalCase.patientMrn}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              ACC: #{clinicalCase.accessionNumber}
            </span>
          </div>

          <div className="text-xs text-slate-400 mt-1.5 flex items-center gap-4 flex-wrap">
            <span>
              Facility: <strong className="text-slate-300">{clinicalCase.hospitalName}</strong>
            </span>
            <span>•</span>
            <span>
              Ordering Physician: <strong className="text-slate-300">{clinicalCase.orderingPhysician}</strong>
            </span>
            <span>•</span>
            <span>Collected: {clinicalCase.collectionTimestamp}</span>
          </div>
        </div>

        {/* Status seal / Digital sign tag */}
        <div className="flex items-center gap-3 shrink-0">
          {isSigned ? (
            <div className="px-3 py-1.5 rounded-md bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span>Signed & Approved ({signatureTimestamp})</span>
            </div>
          ) : (
            <button
              onClick={() => setShowSignModal(true)}
              className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Sign Interpretation</span>
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Print Clinical Dossier"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-1 text-sm font-medium">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'border-sky-500 text-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          Executive Diagnostic Summary
        </button>
        <button
          onClick={() => setActiveTab('biomarkers')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'biomarkers'
              ? 'border-sky-500 text-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Biomarker Matrix ({clinicalCase.biomarkers.length})
        </button>
        <button
          onClick={() => setActiveTab('correlation')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'correlation'
              ? 'border-sky-500 text-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          Pathophysiological Correlation
        </button>
        <button
          onClick={() => setActiveTab('reflex')}
          className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'reflex'
              ? 'border-sky-500 text-sky-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Recommended Reflex Orders ({clinicalCase.reflexTests.length})
        </button>
      </div>

      {/* Tab 1: Executive Diagnostic Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Primary Impression Card */}
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                Primary Diagnostic Impression
              </span>
              <span className="text-xs font-mono text-slate-400">
                ICD-10 / WHO Diagnostic Mapping
              </span>
            </div>
            <h2 className="text-lg font-semibold text-slate-100 leading-snug">
              {clinicalCase.primaryImpression}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
              {clinicalCase.clinicalNarrative}
            </p>
          </div>

          {/* Ranked Differential Diagnoses */}
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                Differential Diagnoses (Ranked by Likelihood)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Algorithmic cross-referencing against reference biomarker patterns.
              </p>
            </div>

            <div className="space-y-3">
              {clinicalCase.differentials.map((diff) => (
                <div
                  key={diff.condition}
                  className="p-4 rounded-md bg-slate-950/80 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          diff.probability >= 70
                            ? 'bg-emerald-400'
                            : diff.probability >= 20
                            ? 'bg-amber-400'
                            : 'bg-slate-600'
                        }`}
                      />
                      <span className="text-sm font-semibold text-slate-100">
                        {diff.condition}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${
                          diff.status === 'Likely'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : diff.status === 'Possible'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {diff.status}
                      </span>
                    </div>

                    <div className="text-right font-mono text-sm font-bold text-slate-200">
                      {diff.probability}%
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pl-5 leading-relaxed">
                    {diff.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pathologist Addendum / Notes Field */}
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 shadow-sm space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200">
              Attending Pathologist Notes & Addenda
            </label>
            <textarea
              rows={3}
              value={customPathologistNote}
              onChange={(e) => setCustomPathologistNote(e.target.value)}
              placeholder="Enter additional clinical impressions, specimen microscopy observations, or direct consultation notes..."
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500 font-sans"
            />
            <p className="text-[11px] text-slate-400">
              Notes entered here will be appended to the official LIS electronic record upon signature.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Biomarker Matrix */}
      {activeTab === 'biomarkers' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">Filter Analytes:</span>
              <button
                onClick={() => setBiomarkerFilter('ALL')}
                className={`px-2.5 py-1 rounded font-medium ${
                  biomarkerFilter === 'ALL'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All ({clinicalCase.biomarkers.length})
              </button>
              <button
                onClick={() => setBiomarkerFilter('ABNORMAL')}
                className={`px-2.5 py-1 rounded font-medium ${
                  biomarkerFilter === 'ABNORMAL'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Abnormal Only ({clinicalCase.biomarkers.filter((b) => b.status !== 'NORMAL').length})
              </button>
              <button
                onClick={() => setBiomarkerFilter('CRITICAL')}
                className={`px-2.5 py-1 rounded font-medium ${
                  biomarkerFilter === 'CRITICAL'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Critical Values Only ({clinicalCase.biomarkers.filter((b) => b.status.startsWith('CRITICAL')).length})
              </button>
            </div>

            <span className="text-slate-400 font-mono text-[11px]">
              Showing {filteredBiomarkers.length} of {clinicalCase.biomarkers.length} Analytes
            </span>
          </div>

          {/* Biomarker Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th scope="col" className="py-3 px-4">Analyte / LOINC</th>
                    <th scope="col" className="py-3 px-4">Observed Result</th>
                    <th scope="col" className="py-3 px-4">Reference Interval</th>
                    <th scope="col" className="py-3 px-4">Evaluation</th>
                    <th scope="col" className="py-3 px-4">Delta Check</th>
                    <th scope="col" className="py-3 px-4">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono tabular-nums">
                  {filteredBiomarkers.map((bio) => (
                    <tr
                      key={bio.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        bio.status.startsWith('CRITICAL')
                          ? 'bg-rose-950/20'
                          : bio.status !== 'NORMAL'
                          ? 'bg-amber-950/10'
                          : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-sans font-semibold text-slate-100">
                          {bio.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {bio.code}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-sm text-slate-100 tabular-nums">
                        {bio.value}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          {bio.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 tabular-nums">
                        {bio.referenceRange} {bio.unit}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(bio.status)}</td>
                      <td className="py-3 px-4 text-slate-400 tabular-nums">
                        {bio.delta || '—'}
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-sans">
                        {bio.category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Pathophysiological Correlation */}
      {activeTab === 'correlation' && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                Biochemical & Cellular Correlation Logic
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Detailed explanations of inter-marker relationships derived from physiological pathology models.
              </p>
            </div>

            <div className="space-y-3">
              {clinicalCase.pathophysiologicalCorrelation.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 flex items-center justify-center font-mono font-bold shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Recommended Reflex Orders */}
      {activeTab === 'reflex' && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                Actionable Reflex Laboratory Orders
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Recommended reflex testing triggered by abnormal algorithm findings. Check to authorize in the LIS requisition.
              </p>
            </div>

            <div className="space-y-3">
              {clinicalCase.reflexTests.map((test) => {
                const isChecked = !!selectedReflexOrders[test.id];
                return (
                  <div
                    key={test.id}
                    onClick={() => toggleReflex(test.id)}
                    className={`p-4 rounded-md border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                      isChecked
                        ? 'border-sky-500 bg-sky-950/20'
                        : 'border-slate-800 bg-slate-950 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-100">
                            {test.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                              test.priority.includes('STAT')
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {test.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {test.reason}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      {isChecked ? 'Authorized' : 'Excluded'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pathologist Bottom Action Bar */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Process Another Clinical Report</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {!isSigned ? (
            <button
              onClick={() => setShowSignModal(true)}
              className="px-6 py-2.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-sky-400"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Approve & Digitally Sign Report</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>HL7 Order Transmitted • Diagnostic Dossier Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Signature Modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-9 h-9 rounded-md bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  Electronic Pathologist Signature
                </h3>
                <p className="text-xs text-slate-400">
                  Affix accredited cryptographic laboratory signature
                </p>
              </div>
            </div>

            <div className="p-4 rounded-md bg-slate-950 border border-slate-800 text-xs space-y-2 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Signer:</span>
                <span className="text-slate-200 font-bold">Dr. Eleanor Vance, MD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Role:</span>
                <span className="text-slate-300">Attending Hematopathologist</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Accession:</span>
                <span className="text-sky-400">{clinicalCase.accessionNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Verification:</span>
                <span className="text-emerald-400">CAP / CLIA Compliant</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              By authorizing, you confirm clinical review of all extracted biomarkers, reference intervals, and the synthesized interpretation.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSignModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSignReport}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-md bg-sky-600 hover:bg-sky-500 text-white shadow-sm"
              >
                Authorize & Seal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
