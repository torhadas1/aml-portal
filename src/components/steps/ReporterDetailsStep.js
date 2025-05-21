
// --- File: src/components/steps/ReporterDetailsStep.js ---

/**
 * @file ReporterDetailsStep.js
 * @description Component for Step 1: Entering Reporter Details.
 */

import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from '../shared/InputField';
import SelectField from '../shared/SelectField';
import { REPORTING_PERSON_ID_TYPES, PHONE_TYPES, EMAIL_TYPES, COUNTRY_CODES } from '../../constants';

const ReporterDetailsStep = () => {
   // Get state and actions from Zustand store

   const reportData = useReportStore((state) => state.reportData);
   const updateField = useReportStore((state) => state.updateField);
   const updateItemInArrayField = useReportStore((state) => state.updateItemInArrayField);
   const metaData = reportData.irregularSourceMetaData;
   const reportingPerson = metaData.reportingPerson;

   // Basic validation state (can be expanded)
   const [errors, setErrors] = useState({});

   // Define required fields for basic validation
   // These paths should exactly match the 'name' attribute used in InputField/SelectField
   const requiredFields = [
      'irregularSourceMetaData.sourceId',
      'irregularSourceMetaData.sourceName',
      'irregularSourceMetaData.branchId',
      'irregularSourceMetaData.reportingPerson.firstName',
      'irregularSourceMetaData.reportingPerson.lastName',
      'irregularSourceMetaData.reportingPerson.reportingPersonRole',
      'irregularSourceMetaData.reportingPerson.idNumber',
      'irregularSourceMetaData.reportingPerson.idType',
      'irregularSourceMetaData.reportingPerson.idCountry',
      // Assuming the first phone number is required
      'irregularSourceMetaData.reportingPerson.phones.0.number',
   ];
   // Add conditional required field check inside validation logic if needed


   // Handle simple input changes and update Zustand state
   const handleChange = (e) => {
      const { name, value, type, required } = e.target;
      let processedValue = value;

      // Basic required validation example
      if (required && value.trim() === '') {
         setErrors(prev => ({ ...prev, [name]: 'שדה חובה' }));
      } else {
         // Add more specific validations here (e.g., email format, number format)
         setErrors(prev => ({ ...prev, [name]: null })); // Clear error
      }
      // Convert value type if necessary (e.g., for number inputs, although not used here yet)
      if (type === 'number') {
         processedValue = value ? parseFloat(value) : null;
      }

      updateField(name, processedValue); // name corresponds to the path in the state
   };

   // Handle changes specifically for items within the phones array
   const handlePhoneChange = (index, field, value) => {
      const processedValue = field === 'phoneType' ? (value ? parseInt(value, 10) : null) : value;
      updateItemInArrayField('irregularSourceMetaData.reportingPerson.phones', index, field, processedValue);
   };

   // Handle changes specifically for items within the emails array
   const handleEmailChange = (index, field, value) => {
      const processedValue = field === 'emailType' ? (value ? parseInt(value, 10) : null) : value;
      updateItemInArrayField('irregularSourceMetaData.reportingPerson.emails', index, field, processedValue);
   };


   return (
      <div className="space-y-6">
         <h2 className="text-xl font-semibold text-gray-800">1. פרטי המדווח (Reporter Details)</h2>

         {/* Section 3.1 in Guidelines */}
         <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium text-gray-700 mb-3">פרטי הגורם המדווח (Reporting Entity)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
               <InputField
                  label="סוג הגורם המדווח (Code 7)"
                  id="sourceType"
                  value={metaData.sourceType}
                  readOnly // Fixed value
               />
               <InputField
                  label="מספר גורם מדווח"
                  id="sourceId" // Use simple ID for element
                  name="irregularSourceMetaData.sourceId" // Path for state update
                  value={metaData.sourceId}
                  onChange={handleChange}
                  required
                  error={errors['irregularSourceMetaData.sourceId']}
               />
               <InputField
                  label="שם הגורם המדווח"
                  id="sourceName"
                  name="irregularSourceMetaData.sourceName"
                  value={metaData.sourceName}
                  onChange={handleChange}
                  required
                  error={errors['irregularSourceMetaData.sourceName']}
               />
               <InputField
                  label="מספר סניף"
                  id="branchId"
                  name="irregularSourceMetaData.branchId"
                  value={metaData.branchId}
                  onChange={handleChange}
                  required
                  error={errors['irregularSourceMetaData.branchId']}
               />
            </div>
         </div>

         <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium text-gray-700 mb-3">פרטי עורך הדיווח (Reporting Person)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
               <InputField
                  label="שם פרטי"
                  id="firstName"
                  name="irregularSourceMetaData.reportingPerson.firstName"
                  value={reportingPerson.firstName}
                  onChange={handleChange}
                  required
                  error={errors['irregularSourceMetaData.reportingPerson.firstName']}
               />
               <InputField
                  label="שם משפחה"
                  id="lastName"
                  name="irregularSourceMetaData.reportingPerson.lastName"
                  value={reportingPerson.lastName}
                  onChange={handleChange}
                  required
                  error={errors['irregularSourceMetaData.reportingPerson.lastName']}
               />
               <InputField
                  label="תפקיד עורך הדיווח"
                  id="reportingPersonRole"
                  name="irregularSourceMetaData.reportingPerson.reportingPersonRole"
                  value={reportingPerson.reportingPersonRole}
                  onChange={handleChange}
                  required
                  error={errors['irregularSourceMetaData.reportingPerson.reportingPersonRole']}
               />
               <InputField
                  label="מספר זהות"
                  id="idNumber"
                  name="irregularSourceMetaData.reportingPerson.idNumber"
                  value={reportingPerson.idNumber}
                  onChange={handleChange}
                  required
                  error={errors['irregularSourceMetaData.reportingPerson.idNumber']}
               />
               <SelectField
                  label="סוג מספר זהות"
                  id="idType"
                  name="irregularSourceMetaData.reportingPerson.idType"
                  value={reportingPerson.idType}
                  // Need to parse value back to int for state, or handle in updateField
                  onChange={(e) => {
                     const value = e.target.value ? parseInt(e.target.value, 10) : null;
                     updateField('irregularSourceMetaData.reportingPerson.idType', value);
                     // Clear description if type is not 'Other'
                     if (value !== 99) {
                        updateField('irregularSourceMetaData.reportingPerson.idTypeDesc', '');
                     }
                     // Re-validate conditional required field
                     if (value === 99 && !reportingPerson.idTypeDesc) {
                        setErrors(prev => ({ ...prev, 'irregularSourceMetaData.reportingPerson.idTypeDesc': 'שדה חובה' }));
                     } else if (value !== 99) {
                        setErrors(prev => ({ ...prev, 'irregularSourceMetaData.reportingPerson.idTypeDesc': null }));
                     }
                  }}
                  options={REPORTING_PERSON_ID_TYPES}
                  required
                  placeholder="בחר סוג..."
                  error={errors['irregularSourceMetaData.reportingPerson.idType']}
               />
               {/* Conditional field for 'Other' ID Type */}
               {reportingPerson.idType === 99 && (
                  <InputField
                     label="פירוט סוג מספר זהות אחר"
                     id="idTypeDesc"
                     name="irregularSourceMetaData.reportingPerson.idTypeDesc"
                     value={reportingPerson.idTypeDesc}
                     onChange={handleChange}
                     required={reportingPerson.idType === 99} // Required only if parent is 99
                     error={errors['irregularSourceMetaData.reportingPerson.idTypeDesc']}
                  />
               )}
               <SelectField
                  label="מדינת דרכון או זהות"
                  id="idCountry"
                  name="irregularSourceMetaData.reportingPerson.idCountry"
                  value={reportingPerson.idCountry}
                  onChange={handleChange}
                  options={COUNTRY_CODES} // Use the country code list
                  required
                  placeholder="בחר מדינה..."
                  error={errors['irregularSourceMetaData.reportingPerson.idCountry']}
               />
            </div>
            {/* Phone Number - Assuming only one for now */}
            {reportingPerson.phones.map((phone, index) => (
               <div key={phone.reporterObjId || index} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-4 border-t pt-4">
                  <InputField
                     label={`מספר טלפון ${index + 1}`}
                     id={`phone_number_${index}`}
                     name={`irregularSourceMetaData.reportingPerson.phones.${index}.number`} // Set name for validation check
                     onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
                     value={phone.number}
                     required // Assuming phone is required
                     error={errors[`irregularSourceMetaData.reportingPerson.phones.${index}.number`]}
                  />
                  <SelectField
                     label={`סוג טלפון ${index + 1}`}
                     id={`phone_type_${index}`}
                     onChange={(e) => handlePhoneChange(index, 'phoneType', e.target.value)}
                     value={phone.phoneType}
                     options={PHONE_TYPES}
                     placeholder="בחר סוג..."
                  // This field might not be strictly required by law, check guidelines/XSD
                  // error={errors[`irregularSourceMetaData.reportingPerson.phones.${index}.phoneType`]}
                  />
               </div>
            ))}
            {/* Email Address - Assuming only one */}
            {reportingPerson.emails.map((email, index) => (
               <div key={email.reporterObjId || index} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-4 border-t pt-4">
                  <InputField
                     label={`דואר אלקטרוני ${index + 1}`}
                     id={`email_address_${index}`}
                     type="email"
                     onChange={(e) => handleEmailChange(index, 'emailAddress', e.target.value)}
                     value={email.emailAddress}
                  // Add validation/error handling
                  // error={errors[`irregularSourceMetaData.reportingPerson.emails.${index}.emailAddress`]}
                  />
                  <SelectField
                     label={`סוג דוא\"ל ${index + 1}`}
                     id={`email_type_${index}`}
                     onChange={(e) => handleEmailChange(index, 'emailType', e.target.value)}
                     value={email.emailType}
                     options={EMAIL_TYPES}
                     placeholder="בחר סוג..."
                  // Add error handling if needed
                  // error={errors[`irregularSourceMetaData.reportingPerson.emails.${index}.emailType`]}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReporterDetailsStep;
