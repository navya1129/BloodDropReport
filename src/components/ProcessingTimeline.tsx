import React from 'react';
import { ProcessingStageConfig } from '../types';
import { ProcessingStage } from './ProcessingStage';
import { Check } from 'lucide-react';

interface ProcessingTimelineProps {
  stages: ProcessingStageConfig[];
  currentStageIndex: number;
  elapsedSeconds: number;
  isComplete: boolean;
  currentSubTask: string;
  onAbort?: () => void;
}

export const ProcessingTimeline: React.FC<ProcessingTimelineProps> = ({
  stages,
  currentStageIndex,
  elapsedSeconds,
  isComplete,
  currentSubTask,
  onAbort,
}) => {
  // Show the 4 pipeline stages during processing; reveal Stage 5 upon completion
  const displayedStages = isComplete ? stages : stages.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header of Timeline */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
              Diagnostic Processing Pipeline
            </h2>
            {!isComplete ? (
              <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded bg-sky-950 text-sky-400 border border-sky-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-clinical-breathe" />
                Processing • Stage {currentStageIndex} of 4
              </span>
            ) : (
              <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1.5 animate-in fade-in duration-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                Clinical Interpretation ready
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {!isComplete ? (
              <>
                <strong className="text-slate-300">Active status:</strong>{' '}
                {stages[currentStageIndex - 1]?.description || 'Processing clinical report...'}
              </>
            ) : (
              <>
                <strong className="text-emerald-400">Synthesis complete:</strong>{' '}
                All reported findings analyzed and prepared for clinical review.
              </>
            )}
          </p>
        </div>

        {/* Status Indicator without explicit timing */}
        <div className="flex items-center gap-2">
          <div className="text-right font-mono bg-slate-900 border border-slate-800 px-3 py-2 rounded-md shrink-0">
            <div className="text-xs text-slate-400">Analysis Status:</div>
            <div className="text-sm font-semibold text-slate-200">
              {!isComplete ? 'Active Pipeline' : 'Completed'}
            </div>
          </div>
          {onAbort && !isComplete && (
            <button
              onClick={onAbort}
              className="px-2.5 py-2 text-xs font-mono text-slate-400 hover:text-rose-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
              title="Cancel intake and return to file selection"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* The Visual Stage Stepper */}
      <div className="space-y-3 relative">
        {displayedStages.map((stage, idx) => {
          const isFinished = stage.id === 5 ? isComplete : elapsedSeconds >= stage.endSecond;
          const isCurrent = !isFinished && elapsedSeconds >= stage.startSecond && stage.id <= 4;
          const isUpcoming = elapsedSeconds < stage.startSecond;

          return (
            <ProcessingStage
              key={stage.id}
              stage={stage}
              isFinished={isFinished}
              isCurrent={isCurrent}
              isUpcoming={isUpcoming}
              isLast={idx === displayedStages.length - 1}
              currentSubTask={isCurrent ? currentSubTask : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};
