 // --- File: src/App.js ---
  
  /**
   * @file App.js
   * @description Main application component, manages steps and renders layout.
   */
  
  import React, { useState } from 'react';
  import useReportStore from './store/useReportStore';
  
  import WizardLayout from './components/layout/WizardLayout';
  
  // Import Step Components
  import ReporterDetailsStep from './components/steps/ReporterDetailsStep';
  import GeneralReportDetailsStep from './components/steps/GeneralReportDetailsStep';
  import RelatedReportsStep from './components/steps/RelatedReportsStep';
  import EventDetailsStep from './components/steps/EventDetailsStep';
  import InvolvedEntitiesStep from './components/steps/InvolvedEntitiesStep';
  import RelatedAccountsStep from './components/steps/RelatedAccountsStep';
  import PledgesStep from './components/steps/PledgesStep';
  import TransactionsStep from './components/steps/TransactionsStep';
  import AttachmentsStep from './components/steps/AttachmentsStep';
  import ReviewAndGenerateStep from './components/steps/ReviewAndGenerateStep';
  
  // Import Utils
  import { generateXml } from './utils/xmlGenerator';
  import { downloadXml } from './utils/downloadUtils';
  
  
  function App() {
    const [currentStep, setCurrentStep] = useState(0);
    // const { reportData, resetReport } = useReportStore((state) => ({
    //     reportData: state.reportData,
    //     resetReport: state.resetReport,
    // }));
    const { reportData, resetReport } = useReportStore((state) => ({
      reportData: state.reportData,
      resetReport: state.resetReport,
  }));
  
    // Define the steps in order
    const steps = [
      <ReporterDetailsStep />,
      <GeneralReportDetailsStep />,
      <RelatedReportsStep />,
      <EventDetailsStep />,
      <InvolvedEntitiesStep />,
      <RelatedAccountsStep />,
      <PledgesStep />,
      <TransactionsStep />,
      <AttachmentsStep />,
      <ReviewAndGenerateStep />,
    ];
  
    const totalSteps = steps.length;
  
    // --- Navigation Handlers ---
    const handleNext = () => {
      // TODO: Implement validation logic for the current step before proceeding
      // Example: if (!validateStep(currentStep, reportData)) return;
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };
  
     // --- Reset Handler ---
     const handleReset = () => {
          if (window.confirm("האם אתה בטוח שברצונך להתחיל דוח חדש? כל המידע הנוכחי ימחק.")) {
              resetReport();
              setCurrentStep(0);
          }
     };
  
      // --- Generation Handler ---
      const handleGenerate = () => {
          // TODO: Add final validation across all steps if needed
          console.log("Generating report...");
          try {
              // Ensure reportNumber is set before generating/downloading
              const reportNumber = reportData.reportMetaData?.reportNumber;
              if (!reportNumber) {
                  alert("אנא הזן מספר דיווח בשלב 'פרטים כללים'.");
                  // Optionally navigate back to the relevant step
                  // setCurrentStep(1); // Assuming General Details is step 1 (index 1)
                  return;
              }
              const xmlOutput = generateXml(reportData);
              downloadXml(xmlOutput, reportNumber);
          } catch (error) {
              console.error("Error during XML generation or download:", error);
              alert("שגיאה ביצירת קובץ XML. אנא בדוק את הנתונים ונסה שוב.");
          }
      };
  
  
    return (
      // Using Tailwind CSS classes for basic layout and styling
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-md sticky top-0 z-10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center py-3">
                       <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 truncate">
                          פורטל הפקת דוח בלתי רגיל
                       </h1>
                       <button
                          onClick={handleReset}
                          className="ml-4 px-3 py-1.5 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors whitespace-nowrap"
                      >
                          התחל דוח חדש
                      </button>
                  </div>
              </div>
          </header>
  
          {/* Main Content Area */}
          <main className="flex-grow">
               <WizardLayout
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onGenerate={handleGenerate}
                  showGenerateButton={currentStep === totalSteps - 1} // Show generate button only on the last step
               >
                  {steps[currentStep]}
               </WizardLayout>
          </main>
  
         {/* Footer */}
         <footer className="text-center text-xs text-gray-500 py-4 mt-auto">
              Irregular Report Generation Portal v1.0
         </footer>
      </div>
    );
  }
  
  export default App;