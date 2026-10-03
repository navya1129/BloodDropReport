import React from 'react';
import { ClinicalCase, Biomarker } from '../types';
import { Search, Activity, Check, ShieldCheck } from 'lucide-react';

interface ProcessingVisualizationProps {
  activeCase: ClinicalCase;
  visibleBiomarkers: Biomarker[];
  elapsedSeconds: number;
  totalDuration: number;
  isComplete: boolean;
}

export const ProcessingVisualization: React.FC<ProcessingVisualizationProps> = ({
  activeCase,
  visibleBiomarkers,
  elapsedSeconds,
  totalDuration,
  isComplete,
}) => {
  const feedRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [visibleBiomarkers.length]);
  // Dynamic AI activity indicator matching the 30-second processing stages
  const activeAiOperation = React.useMemo(() => {
    if (isComplete) return 'Synthesis finalized • Ready for review';
    if (elapsedSeconds >= 22) return 'Organizing findings & compiling clinical review dossier...';
    if (elapsedSeconds >= 12) return 'Cross-referencing reported findings & biological intervals...';
    if (elapsedSeconds >= 5) return 'Extracting quantitative biomarker entities & LOINC codes...';
    return 'Preparing uploaded report & verifying document tokens...';
  }, [elapsedSeconds, isComplete]);

  return (
    <div className="space-y-6">
      {/* Forensic Document & Entity Scanner */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Document & Entity Scanner
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[160px]">
            {activeCase.fileName}
          </span>
        </div>

        {/* Document Vector Facsimile with Synchronized Laser Ray */}
        <div className="relative h-44 bg-slate-950 border border-slate-800 rounded overflow-hidden p-3 font-mono text-[10px]">
          {/* Animated Laser Beam */}
          {!isComplete ? (
            <div
              className="absolute left-0 right-0 h-[2px] bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)] z-20 transition-all duration-300 pointer-events-none"
              style={{
                top: `${Math.min(95, Math.max(5, (elapsedSeconds / totalDuration) * 100))}%`,
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-center z-20 backdrop-blur-[1px]">
              <span className="px-3 py-1 rounded bg-emerald-900/90 text-emerald-300 font-mono text-xs font-semibold border border-emerald-700 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Extraction & Analysis Complete
              </span>
            </div>
          )}

          {/* Fictional Lab Document Content Grid */}
          <div className="space-y-1.5 opacity-75 select-none pointer-events-none">
            <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400">
              <span>{activeCase.hospitalName}</span>
              <span>{activeCase.accessionNumber}</span>
            </div>
            <div className="text-slate-400">
              PATIENT: {activeCase.patientName} | {activeCase.patientAge}Y {activeCase.patientSex.toUpperCase()}
            </div>
            <div className="text-slate-400">ORDER: {activeCase.caseTitle}</div>
            <div className="pt-1 text-slate-400 border-t border-slate-800/60 flex justify-between">
              <span>ANALYTE</span>
              <span>RESULT</span>
              <span>REF. INTERVAL</span>
            </div>
            <div className="text-slate-300 space-y-0.5">
              <div className="flex justify-between">
                <span>HEMOGLOBIN (HGB)</span>
                <span className="text-rose-400">7.8 g/dL *L</span>
                <span>12.0 - 15.5</span>
              </div>
              <div className="flex justify-between">
                <span>HEMATOCRIT (HCT)</span>
                <span className="text-rose-400">24.2 % *L</span>
                <span>37.0 - 48.0</span>
              </div>
              <div className="flex justify-between">
                <span>MCV (CORPUSCULAR)</span>
                <span className="text-amber-400">66.4 fL *L</span>
                <span>80.0 - 100.0</span>
              </div>
              <div className="flex justify-between">
                <span>PLATELET COUNT</span>
                <span className="text-amber-400">448 x10^3 *H</span>
                <span>150 - 400</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Active Operation Ticker */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isComplete ? 'bg-emerald-400' : 'bg-sky-400 animate-clinical-breathe'}`} />
            <span className="truncate text-slate-300">{activeAiOperation}</span>
          </div>
          <span className="text-sky-400 font-semibold shrink-0">
            {visibleBiomarkers.length} / {activeCase.biomarkers.length} Identified
          </span>
        </div>
      </div>

      {/* Live Analyte Extraction Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Live Biomarker Telemetry Feed
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Real-Time Stream
          </span>
        </div>

        {/* Scrolling Feed Container */}
        <div ref={feedRef} className="h-60 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
          {visibleBiomarkers.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
              Ingesting optical character stream...
            </div>
          ) : (
            visibleBiomarkers.map((bio) => {
              const isCrit = bio.status.startsWith('CRITICAL');
              const isAbnormal = bio.status === 'LOW' || bio.status === 'HIGH';

              return (
                <div
                  key={bio.id}
                  className={`p-2 rounded border flex items-center justify-between transition-all ${
                    isCrit
                      ? 'border-rose-900/80 bg-rose-950/30 text-rose-200'
                      : isAbnormal
                      ? 'border-amber-900/60 bg-amber-950/20 text-amber-200'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="font-semibold text-[11px] truncate">
                      {bio.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {bio.code} • Ref: {bio.referenceRange}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-xs">
                      {bio.value} {bio.unit}
                    </div>
                    <span
                      className={`inline-block text-[9px] uppercase px-1 rounded ${
                        isCrit
                          ? 'bg-rose-900 text-rose-200'
                          : isAbnormal
                          ? 'bg-amber-900 text-amber-200'
                          : 'bg-slate-800 text-emerald-300'
                      }`}
                    >
                      {bio.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            LOINC Mapped
          </span>
          <span>Audit Hash: #0x9F41E</span>
        </div>
      </div>
    </div>
  );
};
