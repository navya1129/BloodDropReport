import React from 'react';
import { ClinicalCase } from '../types';
import { Check, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ReadyStateProps {
  activeCase: ClinicalCase;
  onReviewClick: () => void;
}

export const ReadyState: React.FC<ReadyStateProps> = ({
  activeCase,
  onReviewClick,
}) => {
  return (
    <div className="p-6 rounded-lg border border-emerald-500/70 bg-emerald-950/40 space-y-4 transition-all duration-500 transform animate-in fade-in zoom-in-[0.98] shadow-lg shadow-emerald-950/40">
      <div className="flex items-start gap-4">
        {/* Subtle Completion Seal Glyph with calm harmonic breathing ring */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-lg bg-emerald-500/20 animate-clinical-ring" />
          <div className="relative w-11 h-11 rounded-lg bg-emerald-600 border border-emerald-400 flex items-center justify-center text-white shadow-md">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
              Processing Complete
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-300">
              Accession #{activeCase.accessionNumber}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mt-0.5">
            Clinical Interpretation ready
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Multi-biomarker cross-correlation and clinical guideline reference mapping complete.
            The synthesized diagnostic dossier is ready for professional pathologist review and sign-off.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-emerald-800/60">
        <div className="text-xs font-mono text-emerald-300/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>24 Biomarkers Validated • Checksum Verified • Audit Log Sealed</span>
        </div>
        <button
          onClick={onReviewClick}
          className="px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md shadow-emerald-950/60 transition-all hover:translate-x-0.5 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
        >
          <span>Review Clinical Interpretation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
