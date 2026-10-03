import React, { useRef } from 'react';
import { ClinicalCase } from '../types';
import { CLINICAL_CASES } from '../data/clinicalCases';
import {
  UploadCloud,
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ReportUploadProps {
  onFileSelected: (fileName: string, fileSize: string) => void;
  onCaseSelected: (clinicalCase: ClinicalCase) => void;
}

export const ReportUpload: React.FC<ReportUploadProps> = ({
  onFileSelected,
  onCaseSelected,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      onFileSelected(file.name, sizeStr);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      onFileSelected(file.name, sizeStr);
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/60 text-sky-400 text-xs font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CAP / CLSI C28-A3 Standardized Laboratory Ingestion</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
          Clinical Laboratory Report Intake
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
          Upload raw clinical laboratory reports (CBC with differential, CMP, iron kinetics, or coagulation panels).
          The engine extracts biomarkers, standardizes reference intervals, and constructs a preliminary diagnostic interpretation for pathologist review.
        </p>
      </div>

      {/* Large Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-10 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? 'border-sky-400 bg-sky-950/30'
            : 'border-slate-700 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-900/80'
        }`}
        role="button"
        tabIndex={0}
        aria-label="Upload laboratory report by dragging and dropping or browsing files"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.tif,.tiff,.dcm"
          className="hidden"
          onChange={handleFileInputChange}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-sky-400 transition-colors">
            <UploadCloud className="w-7 h-7 text-sky-400" />
          </div>

          <div>
            <p className="text-base font-medium text-slate-200">
              Drag and drop your clinical report here, or{' '}
              <span className="text-sky-400 hover:underline">browse files</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supported formats: Medical PDF, DICOM-SR, TIFF, PNG, or JPG (up to 25 MB)
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-colors focus:ring-2 focus:ring-sky-400 focus:outline-none"
            >
              Select Report from Computer
            </button>
          </div>
        </div>
      </div>

      {/* Pre-Loaded Quick Clinical Test Cases */}
      <div className="pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Quick-Load Clinical Test Panels (Fictional Prototype Data)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an accredited sample report to begin the clinical interpretation pipeline:
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            3 Sample Cases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLINICAL_CASES.map((clinicalCase, idx) => (
            <div
              key={clinicalCase.id}
              onClick={() => onCaseSelected(clinicalCase)}
              className="p-4 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-left cursor-pointer transition-all duration-150 group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onCaseSelected(clinicalCase);
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Case 0{idx + 1}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {clinicalCase.accessionNumber}
                </span>
              </div>
              <h3 className="text-xs font-semibold text-slate-100 line-clamp-1 group-hover:text-sky-300 transition-colors">
                {clinicalCase.caseTitle}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {clinicalCase.shortDescription}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{clinicalCase.hospitalName.split(' ')[0]} Facility</span>
                <span className="text-sky-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Load Panel
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
