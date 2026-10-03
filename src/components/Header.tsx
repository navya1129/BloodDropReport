import React from 'react';
import { ClinicalCase, AppJourneyStage } from '../types';
import { ShieldCheck, User, RotateCcw, Activity } from 'lucide-react';

interface HeaderProps {
  currentStage: AppJourneyStage;
  activeCase: ClinicalCase | null;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  activeCase,
  onReset,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-md bg-rose-950/80 border border-rose-800/60 text-rose-400 shadow-sm">
            <svg
              className="w-5 h-5 fill-rose-500 stroke-rose-300"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.75"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              <path
                d="M12 9v6m-3-3h6"
                stroke="white"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-wider text-slate-100 uppercase">
                BloodDrop
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700 font-semibold tracking-wider">
                LIS v3.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              Clinical Laboratory Diagnostic Interpretation Suite
            </p>
          </div>
        </div>

        {/* Center: Contextual Patient Badge if case is active */}
        {activeCase && currentStage !== 'UPLOAD' && (
          <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Accession:</span>
            <span className="font-mono text-slate-200 font-semibold">
              {activeCase.accessionNumber}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium">
              {activeCase.patientName} ({activeCase.patientSex === 'Female' ? 'F' : 'M'}, {activeCase.patientAge}y)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 truncate max-w-[140px]">
              {activeCase.hospitalName}
            </span>
          </div>
        )}

        {/* Right side info */}
        <div className="flex items-center gap-3">
          {/* LIS Status - Calm, professional, non-flashing */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium font-mono text-[10px] tracking-wider uppercase text-emerald-400">
              LIS Connected
            </span>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800 text-xs text-slate-300">
            <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-medium text-slate-200 text-xs">Dr. E. Vance, MD</div>
              <div className="text-[10px] text-slate-400 font-mono">Hematopathology</div>
            </div>
          </div>

          {/* Reset button if in review */}
          {currentStage === 'REVIEW' && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors ml-2 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              title="Process another report"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Intake</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
