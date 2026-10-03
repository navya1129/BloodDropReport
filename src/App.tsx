/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicalCase, AppJourneyStage } from './types';
import { CLINICAL_CASES } from './data/clinicalCases';
import { Header } from './components/Header';
import { ReportUpload } from './components/ReportUpload';
import { UploadConfirmation } from './components/UploadConfirmation';
import { ProcessingView } from './components/ProcessingView';
import { ClinicalInterpretation } from './components/ClinicalInterpretation';

export default function App() {
  const [currentStage, setCurrentStage] = useState<AppJourneyStage>('UPLOAD');
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [isUploadConfirmed, setIsUploadConfirmed] = useState(false);

  // When a user selects a file from their computer
  const handleFileSelected = (fileName: string, fileSize: string) => {
    const baseCase = CLINICAL_CASES[0];
    const customizedCase: ClinicalCase = {
      ...baseCase,
      fileName,
      fileSize,
    };
    setSelectedCase(customizedCase);
    setIsUploadConfirmed(true);
  };

  // When a user selects a pre-loaded clinical sample case
  const handleCaseSelected = (clinicalCase: ClinicalCase) => {
    setSelectedCase(clinicalCase);
    setIsUploadConfirmed(true);
  };

  // When replacing / choosing a different file
  const handleReplaceFile = () => {
    setSelectedCase(null);
    setIsUploadConfirmed(false);
  };

  // Start processing after confirmation
  const handleStartProcessing = () => {
    if (selectedCase) {
      setCurrentStage('PROCESSING');
    }
  };

  // When the 45s staged processing finishes and user clicks "Review Clinical Interpretation"
  const handleProcessingComplete = () => {
    setCurrentStage('REVIEW');
  };

  // Reset journey to intake a new report
  const handleReset = () => {
    setSelectedCase(null);
    setIsUploadConfirmed(false);
    setCurrentStage('UPLOAD');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-sky-500 selection:text-white">
      {/* Persistent Clinical Navigation Header */}
      <Header
        currentStage={currentStage}
        activeCase={selectedCase}
        onReset={handleReset}
      />

      {/* Main Clinical Workstation Viewport */}
      <main className="flex-1 pb-16">
        {currentStage === 'UPLOAD' && (
          <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
            {!isUploadConfirmed || !selectedCase ? (
              <ReportUpload
                onFileSelected={handleFileSelected}
                onCaseSelected={handleCaseSelected}
              />
            ) : (
              <UploadConfirmation
                selectedCase={selectedCase}
                onConfirm={handleStartProcessing}
                onReplaceFile={handleReplaceFile}
              />
            )}
          </div>
        )}

        {currentStage === 'PROCESSING' && selectedCase && (
          <ProcessingView
            activeCase={selectedCase}
            onProcessingComplete={handleProcessingComplete}
            onAbort={handleReset}
          />
        )}

        {currentStage === 'REVIEW' && selectedCase && (
          <ClinicalInterpretation
            clinicalCase={selectedCase}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Laboratory System Audit Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-600 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BloodDrop™ Clinical Pathology Software • High-Fidelity Diagnostic Prototype</span>
          <span>Simulation Session ID: #BD-2026-98104 • 256-Bit TLS • CLSI C28-A3 Standard</span>
        </div>
      </footer>
    </div>
  );
}
