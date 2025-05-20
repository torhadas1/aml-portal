// --- File: src/components/steps/GeneralReportDetailsStep.js ---
  
  /**
   * @file GeneralReportDetailsStep.js
   * @description Component for Step 2: General Report Details.
   */
  
  import React, { useState } from 'react';
  import useReportStore from '../../store/useReportStore';
  import InputField from '../shared/InputField';
  import SelectField from '../shared/SelectField';
  import { REPORT_STATUS_CODES } from '../../constants';
  
  const GeneralReportDetailsStep = () => {
      const { reportData, updateField } = useReportStore((state) => ({
          reportData: state.reportData,
          updateField: state.updateField,
      }));
      const metaData = reportData.reportMetaData;
  
      const [errors, setErrors] = useState({});
  
      const handleChange = (e) => {
          const { name, value, type, required } = e.target;
          let processedValue = value;
  
          // Basic required validation
          if (required && value.trim() === '') {
              setErrors(prev => ({ ...prev, [name]: 'שדה חובה' }));
          } else {
              setErrors(prev => ({ ...prev, [name]: null })); // Clear error
          }
  
          // Handle specific type conversions if needed (e.g., date, number)
          if (type === 'date') {
              // Ensure date is in YYYY-MM-DD format if needed, input type="date" usually handles this
              processedValue = value;
          } else if (name === 'reportMetaData.reportStatus') {
              processedValue = value ? parseInt(value, 10) : null;
          }
  
  
          updateField(name, processedValue);
      };
  
      return (
          <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">2. פרטים כללים לדיווח (General Report Details)</h2>
              <p className="text-sm text-gray-600">מידע כללי אודות הדיווח.</p>
  
              {/* Section 3.2 in Guidelines */}
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                   <InputField
                      label="מספר דיווח"
                      id="reportNumber"
                      name="reportMetaData.reportNumber"
                      value={metaData.reportNumber}
                      onChange={handleChange}
                      required
                      placeholder="Unique report identifier"
                      error={errors['reportMetaData.reportNumber']}
                   />
                   <InputField
                      label="תאריך כתיבת הדיווח"
                      id="reportDate"
                      name="reportMetaData.reportDate"
                      type="date" // Use date picker
                      value={metaData.reportDate}
                      onChange={handleChange}
                      required
                      error={errors['reportMetaData.reportDate']}
                   />
                   <SelectField
                      label="סטאטוס דיווח"
                      id="reportStatus"
                      name="reportMetaData.reportStatus"
                      value={metaData.reportStatus}
                      onChange={handleChange}
                      options={REPORT_STATUS_CODES}
                      required
                      placeholder="בחר סטאטוס..."
                      error={errors['reportMetaData.reportStatus']}
                   />
                   <InputField
                      label="תיאור דיווח (אופציונלי)"
                      id="reportDescription"
                      name="reportMetaData.reportDescription"
                      value={metaData.reportDescription}
                      onChange={handleChange}
                      placeholder="Details of generating software, version, etc."
                      error={errors['reportMetaData.reportDescription']}
                   />
                   <InputField
                      label="סוג דיווח (Code 2)"
                      id="reportType"
                      value={metaData.reportType}
                      readOnly
                      className="bg-gray-100"
                   />
                    <InputField
                      label="סיווג דיווח (Code 10)"
                      id="reportClassification"
                      value={metaData.reportClassification}
                      readOnly
                      className="bg-gray-100"
                   />
              </div>
          </div>
      );
  };
  
  export default GeneralReportDetailsStep;