import React, { useState, useEffect, useMemo } from 'react';
import { ClinicalCase } from '../types';
import { PROCESSING_STAGES } from '../data/clinicalCases';
import { ProcessingTimeline } from './ProcessingTimeline';
import { ProcessingVisualization } from './ProcessingVisualization';
import { ReadyState } from './ReadyState';
import { ShieldCheck } from 'lucide-react';

interface ProcessingViewProps {
  activeCase: ClinicalCase;
  onProcessingComplete: () => void;
  onAbort?: () => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  activeCase,
  onProcessingComplete,
  onAbort,
}) => {
  // Processing duration is managed ENTIRELY in internal code — exactly 30 seconds
  const TOTAL_INTERNAL_DURATION = 30;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Internal automatic 30-second timer progression with proper cleanup
  useEffect(() => {
    const intervalMs = 250;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + intervalMs / 1000;
        if (next >= TOTAL_INTERNAL_DURATION) {
          clearInterval(timer);
          return TOTAL_INTERNAL_DURATION;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  // Determine active stage based on elapsed time:
  // 0–5s: Stage 1 (Report received)
  // 5–12s: Stage 2 (Extracting report information)
  // 12–22s: Stage 3 (Analyzing reported findings)
  // 22–30s: Stage 4 (Preparing clinical interpretation)
  // 30s+: Stage 5 (Clinical Interpretation ready)
  const currentStageConfig = useMemo(() => {
    if (elapsedSeconds >= 30) return PROCESSING_STAGES[4];
    if (elapsedSeconds >= 22) return PROCESSING_STAGES[3];
    if (elapsedSeconds >= 12) return PROCESSING_STAGES[2];
    if (elapsedSeconds >= 5) return PROCESSING_STAGES[1];
    return PROCESSING_STAGES[0];
  }, [elapsedSeconds]);

  const currentStageIndex = currentStageConfig.id; // 1 to 5
  const isComplete = elapsedSeconds >= TOTAL_INTERNAL_DURATION;

  // Cycle sub-task messages smoothly during the active stage
  const currentSubTask = useMemo(() => {
    const stageDuration = Math.max(1, currentStageConfig.endSecond - currentStageConfig.startSecond);
    const stageElapsed = Math.max(0, elapsedSeconds - currentStageConfig.startSecond);
    const subTasks = currentStageConfig.liveSubTasks;
    const stepInterval = Math.max(1, stageDuration / subTasks.length);
    const index = Math.min(
      subTasks.length - 1,
      Math.floor(stageElapsed / stepInterval)
    );
    return subTasks[index] || subTasks[0];
  }, [elapsedSeconds, currentStageConfig]);

  // Discovered biomarkers: 0 in Stage 1, progressively discovered during Stages 2 & 3, fully parsed by Stage 4
  const visibleBiomarkers = useMemo(() => {
    const total = activeCase.biomarkers.length;
    if (elapsedSeconds < 5) return [];
    if (elapsedSeconds >= 22) return activeCase.biomarkers;
    const progress = (elapsedSeconds - 5) / 17;
    const count = Math.min(total, Math.max(1, Math.floor(progress * total)));
    return activeCase.biomarkers.slice(0, count);
  }, [activeCase.biomarkers, elapsedSeconds]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Main Grid: Left = Visual Stage Timeline; Right = Telemetry & Document Scan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Stage Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ProcessingTimeline
            stages={PROCESSING_STAGES}
            currentStageIndex={currentStageIndex}
            elapsedSeconds={elapsedSeconds}
            isComplete={isComplete}
            currentSubTask={currentSubTask}
            onAbort={onAbort}
          />

          {/* Completion State Banner (Revealed when processing finishes) */}
          {isComplete && (
            <ReadyState
              activeCase={activeCase}
              onReviewClick={onProcessingComplete}
            />
          )}

          {/* Reassuring Clinical Protocol Box (No timing/seconds displayed) */}
          <div className="p-4 rounded-md bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standardized Laboratory Extraction Protocol Active</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              CLSI C28-A3 Compliant
            </div>
          </div>
        </div>

        {/* Right Column: Live Analyte Stream & Forensic Document Scanner (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ProcessingVisualization
            activeCase={activeCase}
            visibleBiomarkers={visibleBiomarkers}
            elapsedSeconds={elapsedSeconds}
            totalDuration={TOTAL_INTERNAL_DURATION}
            isComplete={isComplete}
          />
        </div>
      </div>
    </div>
  );
};
