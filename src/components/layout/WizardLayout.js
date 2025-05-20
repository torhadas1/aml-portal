  // --- File: src/components/layout/WizardLayout.js ---
  
  /**
   * @file WizardLayout.js
   * @description Provides the main layout and navigation for the multi-step wizard.
   */
  


import React from 'react';
  
  const WizardLayout = ({ currentStep, totalSteps, children, onNext, onPrev, onGenerate, showGenerateButton }) => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-10">
      {/* Progress Indicator (Optional but recommended for UX) */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-indigo-700">שלב {currentStep + 1} מתוך {totalSteps}</span>
          {/* Optionally add step titles here */}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
  
      {/* Step Content */}
      <div className="mb-8 min-h-[300px]"> {/* Added min-height */}
        {children}
      </div>
  
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-5">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md shadow-sm hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          הקודם
        </button>
  
        {!showGenerateButton ? (
            <button
              onClick={onNext}
              // Disable on last step if generate button isn't shown (shouldn't happen in normal flow)
              disabled={currentStep === totalSteps - 1}
              className="px-5 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              הבא
            </button>
        ) : (
             <button
               onClick={onGenerate}
               className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 transition-colors"
             >
               הפק דוח XML
             </button>
         )}
      </div>
    </div>
  );
  
  export default WizardLayout;
  