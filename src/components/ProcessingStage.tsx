import React from 'react';
import { ProcessingStageConfig } from '../types';
import { Check } from 'lucide-react';

interface ProcessingStageProps {
  stage: ProcessingStageConfig;
  isFinished: boolean;
  isCurrent: boolean;
  isUpcoming: boolean;
  isLast: boolean;
  currentSubTask?: string;
}

export const ProcessingStage: React.FC<ProcessingStageProps> = ({
  stage,
  isFinished,
  isCurrent,
  isUpcoming,
  isLast,
  currentSubTask,
}) => {
  return (
    <div
      className={`relative flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${
        isFinished
          ? 'border-emerald-800/40 bg-slate-900/40 text-slate-400'
          : isCurrent
          ? 'border-sky-500/70 bg-slate-900 ring-1 ring-sky-500/40 shadow-md shadow-sky-950/20'
          : 'border-slate-800/60 bg-slate-950/40 opacity-50 text-slate-500'
      }`}
    >
      {/* Vertical Connecting Spine Line */}
      {!isLast && (
        <div
          className={`absolute left-[27px] top-[48px] w-[2px] h-[calc(100%-20px)] transition-colors duration-300 ${
            isFinished ? 'bg-emerald-600' : 'bg-slate-800'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Stage Node Glyph */}
      <div className="relative z-10 shrink-0 mt-0.5">
        {isFinished ? (
          /* Completed state: Solid emerald circle with checkmark */
          <div
            className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-sm"
            title={`${stage.title} complete`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
        ) : isCurrent ? (
          /* Current active state: Calm harmonic breathing pulse ring */
          <div className="relative flex items-center justify-center w-7 h-7">
            <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-clinical-ring" />
            <div className="relative w-7 h-7 rounded-full bg-sky-600 border border-sky-400 flex items-center justify-center text-white shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-clinical-breathe" />
            </div>
          </div>
        ) : (
          /* Upcoming state: Subdued open circle glyph (○) */
          <div className="w-7 h-7 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full border border-slate-700 bg-transparent" />
          </div>
        )}
      </div>

      {/* Stage Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`text-sm font-semibold tracking-tight ${
              isCurrent
                ? 'text-white'
                : isFinished
                ? 'text-slate-300'
                : 'text-slate-500'
            }`}
          >
            {stage.title}
          </h3>

          {/* Status Indicator Badge */}
          {isFinished && (
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 shrink-0">
              ✓ Completed
            </span>
          )}
          {isCurrent && (
            <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800 shrink-0">
              Active Phase
            </span>
          )}
          {isUpcoming && (
            <span className="text-[11px] font-mono text-slate-500 shrink-0">
              Pending
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {stage.description}
        </p>

        {/* Live Active Sub-Task Ticker */}
        {isCurrent && currentSubTask && (
          <div
            className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2"
            aria-live="polite"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-clinical-breathe shrink-0" />
            <p className="text-xs font-mono text-sky-300 truncate">
              {currentSubTask}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
