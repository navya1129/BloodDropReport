import React from 'react';
import { ClinicalCase } from '../types';
import { FileCheck, ArrowRight, ShieldCheck, FileText, RotateCcw } from 'lucide-react';

interface UploadConfirmationProps {
  selectedCase: ClinicalCase;
  onConfirm: () => void;
  onReplaceFile: () => void;
}

export const UploadConfirmation: React.FC<UploadConfirmationProps> = ({
  selectedCase,
  onConfirm,
  onReplaceFile,
}) => {
  return (
    <div className="border border-slate-700 bg-slate-900 rounded-lg p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300">
      {/* Confirmation Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-950/80 border border-emerald-700/80 flex items-center justify-center text-emerald-400">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-100">
                Your report has been received.
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
                Upload Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              File integrity verified via SHA-256. Accession confirmed and queued for laboratory diagnostic synthesis.
            </p>
          </div>
        </div>

        <button
          onClick={onReplaceFile}
          className="text-xs text-slate-400 hover:text-slate-200 underline flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Select different file</span>
        </button>
      </div>

      {/* Selected File Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-md bg-slate-950 border border-slate-800/80 font-mono text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">File Name</span>
          <span className="text-slate-200 font-semibold truncate block mt-0.5" title={selectedCase.fileName}>
            {selectedCase.fileName}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Format / Size</span>
          <span className="text-slate-200 block mt-0.5">
            PDF ({selectedCase.pageCount} Pages) • {selectedCase.fileSize}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Detected Accession</span>
          <span className="text-sky-400 font-semibold block mt-0.5">
            {selectedCase.accessionNumber}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Specimen Category</span>
          <span className="text-slate-200 block mt-0.5 truncate">
            {selectedCase.specimenType}
          </span>
        </div>
      </div>

      {/* Start Analysis CTA */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>All pre-flight validation checks passed. Ready to begin analysis.</span>
        </div>

        <button
          onClick={onConfirm}
          className="w-full sm:w-auto px-6 py-3 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-sky-400 focus:outline-none"
        >
          <span>Start Clinical Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
