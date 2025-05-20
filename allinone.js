// --- File: src/constants.js ---

/**
 * @file constants.js
 * @description Defines constant values used throughout the application,
 * based on the official guidelines document.
 */

// Example ID Types for Reporting Person (FR-01 (11))
export const REPORTING_PERSON_ID_TYPES = [
  { code: 1, description: 'תעודת זהות' },
  { code: 2, description: 'דרכון' },
  { code: 3, description: 'תעודת מסע' },
  // Add other relevant codes from guidelines if needed (e.g., 21, 22, 23 from XSD section)
  { code: 99, description: 'אחר' },
];

// Example Phone Types (FR-01 (7) & FR-04.1 (27)) - Based on XSD 5.1.4
export const PHONE_TYPES = [
    { code: 1, description: 'נייח' },
    { code: 2, description: 'פקס' },
    { code: 3, description: 'נייד' },
];

// Example Email Types (FR-01 (8) & FR-04.1 (29)) - Based on XSD 5.1.3
export const EMAIL_TYPES = [
    { code: 1, description: 'פרטי' },
    { code: 2, description: 'עבודה' },
    { code: 3, description: 'לא ידוע' },
];

// Example ISO Country Codes (Simplified) - A full list would be needed
export const COUNTRY_CODES = [
    { code: 'IL', name: 'Israel' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    // Add more countries as needed
];

// Report Status Codes (FR-04 (20))
export const REPORT_STATUS_CODES = [
    { code: 1, description: 'דיווח חדש' },
    { code: 2, description: 'השלמה לדיווח שנשלח בעבר לרשות' },
    { code: 3, description: 'המשך לדיווח שנשלח בעבר לרשות' },
    { code: 4, description: 'קשור לדיווח שנשלח בעבר לרשות' },
];

// Related Report Relation Types (FR-03 (2))
export const RELATED_REPORT_RELATION_TYPES = [
    { code: 2, description: 'השלמה לדיווח שנשלח בעבר לרשות' },
    { code: 3, description: 'המשך לדיווח שנשלח בעבר לרשות' },
    { code: 7, description: 'קשור לדיווח שנשלח בעבר לרשות' }, // Note: Code 7 used in spec table, XSD shows 4? Verify. Using 7 based on spec table.
];

// Reporting Reason Codes (FR-04 (2))
export const REPORTING_REASONS = [
    { code: 1, description: 'ניסיון למנוע, או הימנעות מדיווח' },
    { code: 2, description: 'ניסיון להסתיר, או הסתרה של זהות המעורבים' },
    { code: 3, description: 'פעילות מול אזורים בסיכון' },
    { code: 4, description: 'פעילות שנראה כי הינה בעלת זיקה לפעילות פלילית' },
    { code: 5, description: 'פעילות שנראה כי הינה בעלת זיקה לפעילות מימון טרור' },
    { code: 6, description: 'פעילות שלא בהתאם לפרופיל לקוח, לרבות פעילות שאינה תואמת ל- KYC' },
    { code: 7, description: 'חוסר סבירות כלכלית של הפעולה ו/או היעדר הסבר סביר' },
    { code: 8, description: 'פעולות במזומן - תדירות גבוהה, או סכומים גבוהים' },
    { code: 9, description: 'נראה כי הפעילות מבוצעת עבור אחר' },
    { code: 10, description: 'פעילות הנחזית להיות פיקטיבית' },
    { code: 11, description: 'פעילות בלתי רגילה בנכסים וירטואליים' },
    { code: 99, description: 'פעילות בלתי רגילה אחרת' },
];

// Report Keyword Codes (FR-04 (5))
export const REPORT_KEYWORDS = [
    { code: 301, description: 'דחיפות מיוחדת' },
    { code: 302, description: 'דיווח לרשויות אכיפה' },
    { code: 303, description: 'ניסיון לביצוע פעולה' },
    { code: 304, description: 'עבירת מקור' },
    { code: 305, description: 'איש ציבור' },
    { code: 306, description: 'עבירות מס' },
    { code: 203, description: 'מימון טרור' },
    { code: 1, description: 'ארגון פשיעה' },
    { code: 31, description: 'סחר בסמים' },
    { code: 14, description: 'הימורים' },
    { code: 300, description: 'תחום בסיכון אחר' },
];

// Additional Authority Codes (FR-04 (7))
export const ADDITIONAL_AUTHORITIES = [
    { code: 1, description: 'משטרה' },
    { code: 2, description: 'משרד ביטחון' },
    { code: 3, description: 'שירות הביטחון הכללי' },
    { code: 4, description: 'גורם אכיפה אחר' },
];

// Transaction Committed Options (FR-04 (10))
export const TRANSACTION_COMMITTED_OPTIONS = [
    { code: 1, description: 'כן (הדיווח מכיל פעולות)' }, // Value '1' for true
    { code: 0, description: 'לא (הדיווח לא מכיל פעולות)' }, // Value '0' for false
];

// --- Constants for Involved Entities (Step 5) ---

// Entity Relation to Event Codes (Spec Table 3.4.1, Field 1)
export const ENTITY_EVENT_RELATIONS = [
    { code: 1, description: 'נשוא הידיעה' },
    { code: 2, description: 'קשור לנשוא הידיעה' },
    { code: 3, description: 'בן לוויה' },
    { code: 4, description: 'שותף עסקי' },
    { code: 5, description: 'בעלים' },
    { code: 8, description: 'מיופה כח' },
    { code: 9, description: 'נהנה' },
    { code: 10, description: 'ערב' },
    { code: 11, description: 'בעל שליטה בתאגיד' },
    { code: 13, description: 'מוטב' },
    { code: 15, description: 'נאמן' },
    { code: 19, description: 'קרוב משפחה' },
    { code: 21, description: 'צד לפעולה' },
    { code: 22, description: 'בעל עניין בחברה' },
    { code: 23, description: 'בעל מניות' },
    { code: 24, description: 'אחר' },
    { code: 33, description: 'ג. קשור' },
    { code: 34, description: 'נושה' },
    { code: 51, description: 'נש"פ באמצעותו בוצעה הפעולה' },
];

// Person ID Types (Spec Table 3.4.1, Field 4 - for Persons)
export const PERSON_ID_TYPES = [
    { code: 1, description: 'תעודת זהות' },
    { code: 2, description: 'דרכון לאומי' },
    { code: 3, description: 'תעודת מסע' },
    { code: 4, description: 'מספר כרטיס מגנטי שהנפיק המינהל האזרחי' },
    // Codes 21,22,23 from XSD are also relevant for "תעודת מסע" variants
    { code: 99, description: 'אחר' },
];

// Corporate ID Types (Spec Table 3.4.1, Field 4 - for Corporates)
export const CORPORATE_ID_TYPES = [
    { code: 10, description: 'חברה ישראלית (למעט חל"צ)' },
    { code: 11, description: 'חברה זרה רשומה בישראל' },
    { code: 12, description: 'חברה זרה' },
    { code: 13, description: 'חברה לתועלת הציבור (חל"צ)' },
    { code: 14, description: 'שותפות' },
    { code: 15, description: 'עמותה' },
    { code: 16, description: 'אגודה עותומנית' },
    { code: 17, description: 'אגודה שיתופית' },
    { code: 18, description: 'מפלגה' },
    { code: 19, description: 'הקדש' },
    { code: 20, description: 'חסר ישות (שע"מ)' }, // Should this be here or a separate category?
    { code: 99, description: 'אחר' },
];

// Gender Codes (Spec Table 3.4.1, Field 12)
export const GENDER_CODES = [
    { code: 1, description: 'זכר' },
    { code: 2, description: 'נקבה' },
    { code: 99, description: 'אחר' },
];

// Residence Status Codes (Spec Table 3.4.1, Field 14)
// Differentiated for Person/Corporate for clarity in forms
export const PERSON_RESIDENCE_STATUS_CODES = [
    { code: 1, description: 'תושב' },
    { code: 2, description: 'תושב חוץ' },
    { code: 6, description: 'תושב אזור' },
    { code: 5, description: 'אחר (למשל מבקש מקלט)' },
];
export const CORPORATE_RESIDENCE_STATUS_CODES = [
    { code: 3, description: 'תאגיד ישראלי' },
    { code: 4, description: 'תאגיד חוץ' },
    { code: 7, description: 'תאגיד אזור' },
    { code: 5, description: 'אחר (למשל ועד בית)' },
];


// Profession Type Codes (Spec Table 3.4.1, Field 17) - Placeholder
// This should be a comprehensive list from CBS.
export const PROFESSION_CODES_EXAMPLE = [
    { code: '1234', description: 'רואה חשבון (דוגמה)' },
    { code: '5678', description: 'עורך דין (דוגמה)' },
    { code: 'xxxx', description: 'לא ידוע/אחר (יש לפרט)' },
];

// Entity to Entity Relation Types (Spec Table 3.4.1.1, Field 2)
export const ENTITY_TO_ENTITY_RELATIONS = [
    { code: 1, description: 'בעלים/בעל מניות' },
    { code: 2, description: 'מורשה חתימה' },
    { code: 3, description: 'נהנה' },
    { code: 4, description: 'בעל שליטה' },
    { code: 6, description: 'יו"ר מועצת המנהלים' },
    { code: 8, description: 'נישואים' },
    { code: 10, description: 'דירקטור' },
    { code: 13, description: 'אח' },
    { code: 15, description: 'אחות' },
    { code: 16, description: 'בן / בת' },
    { code: 17, description: 'חברת בת' },
    { code: 18, description: 'מזכיר/ה' },
    { code: 24, description: 'בעל שליטה בתאגיד נהנה' },
    { code: 25, description: 'משעבד' },
    { code: 26, description: 'אב' },
    { code: 27, description: 'אם' },
    { code: 28, description: 'בן/בת זוג' },
    { code: 29, description: 'דירקטור לשעבר' },
    { code: 30, description: 'אחר' },
    { code: 32, description: 'בעל שליטה בתאגיד מיופה כח' },
    { code: 36, description: 'מיופה כח (כללי)' },
    { code: 37, description: 'שותף' },
    { code: 38, description: 'מייסד' },
    { code: 39, description: 'חברת אם' },
    { code: 40, description: 'אפוטרופוס' },
    { code: 41, description: 'נאמן' },
    { code: 42, description: 'חברה נכדה' },
    { code: 43, description: 'יוצר נאמנות' },
];

```javascript
// --- File: src/store/useReportStore.js ---

/**
 * @file useReportStore.js
 * @description Defines the Zustand store for managing the report form state.
 */

import { create } from 'zustand';
import { produce } from 'immer';

// Helper function for client-side IDs (can be moved to utils.js later)
// Ensure this is defined before use in initialState
function clientSideId() {
  // Simple unique ID generator for client-side linking
  return `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export const emptyAddress = () => ({
    reporterObjId: clientSideId(),
    countryID: '', cityCode: '', cityName: '', streetCode: '', streetName: '', houseNumber: '', newZIPCode: '', zipCode: ''
});

export const emptyPhone = () => ({ reporterObjId: clientSideId(), number: '', phoneType: null });
export const emptyEmail = () => ({ reporterObjId: clientSideId(), emailAddress: '', emailType: null });
export const emptyRelation = () => ({ reporterObjId: clientSideId(), relatedObjID: '', relationTypeID: null, relationTypeDesc: '' });
export const emptyEventRelation = () => ({ reporterObjId: clientSideId(), relationTypeID: null, relationTypeDesc: '' });


export const initialPersonState = () => ({
    reporterObjId: clientSideId(),
    relationsToEvent: [], // Array of { relationTypeID, relationTypeDesc } - Checkbox group
    idNumber: '',
    idType: null,
    idTypeDesc: '',
    idCountry: '',
    lastName: '',
    firstName: '',
    latinName: '',
    latinSurname: '',
    birthDate: '', // YYYY-MM-DD
    entityGender: null,
    entityGenderDesc: '',
    residenceStatus: null,
    residenceStatusDesc: '',
    professionTypeCodes: [], // Array of { professionTypeCode } - Checkbox group
    profession: '', // Other profession description
    addresses: [emptyAddress()],
    phones: [emptyPhone()],
    emails: [emptyEmail()],
    entityComment: '',
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc }
});

export const initialCorporateState = () => ({
    reporterObjId: clientSideId(),
    relationsToEvent: [], // Array of { relationTypeID, relationTypeDesc } - Checkbox group
    idNumber: '',
    idType: null,
    idTypeDesc: '',
    idCountry: '',
    name: '',
    latinName: '',
    foundationDate: '', // YYYY-MM-DD
    residenceStatus: null,
    residenceStatusDesc: '',
    corporateFieldDesc: '',
    addresses: [emptyAddress()],
    phones: [emptyPhone()],
    emails: [emptyEmail()],
    entityComment: '',
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc }
});


// Define the initial state structure based on the tech spec data model
const initialState = {
  version: "1.0",
  reportMetaData: {
    reporterObjId: clientSideId(), // Add ID
    reportNumber: "",
    reportType: 2,
    reportDate: "", // YYYY-MM-DD
    reportDescription: "",
    reportStatus: 1, // Default to 'New'
    reportClassification: 10,
  },
  irregularSourceMetaData: {
    reporterObjId: clientSideId(), // Add ID
    sourceType: 7,
    sourceId: "",
    sourceName: "",
    branchId: "",
    reportingPerson: {
      reporterObjId: clientSideId(), // Add ID
      firstName: "",
      lastName: "",
      phones: [{ reporterObjId: clientSideId(), number: "", phoneType: null }], // Initialize with one empty phone + ID
      emails: [{ reporterObjId: clientSideId(), emailAddress: "", emailType: null }], // Initialize with one empty email + ID
      reportingPersonRole: "",
      idNumber: "",
      idType: null,
      idTypeDesc: "",
      idCountry: "",
    },
  },
  relatedReports: [], // Array of { reporterObjId, reportNumber, relationsToEvent: [{relationTypeID}] }
  irregularReportEvent: {
    reporterObjId: clientSideId(), // Add ID for the main event
    eventDateTime: "", // YYYY-MM-DD required by spec table, but XSD allows dateTime (YYYY-MM-DDThh:mm:ss). Use YYYY-MM-DD for input.
    reportingReasons: [], // Array of { reportingReason: code }
    reportingReasonDesc: "",
    reportingBriefContent: "",
    reportKeyWordsCodes: [], // Array of { reportKeyWordCode: code }
    reportKeyWordDesc: "",
    additionalAuthoritiesCodes: [], // Array of { additionalAuthorityCode: code }
    additionalAuthoritiesDesc: "",
    reportingContent: "",
    transactionCommitted: null, // Boolean 0/1 -> Mapped to TransactionCommitted under IrregularReportEvent in XSD
    listOfInvolvedEntities: {
      reporterObjId: clientSideId(),
      persons: [], // Array of Person objects
      corporates: [], // Array of Corporate objects
    },
    irregularAccounts: [], // Array of BankAccount objects (mapped to IrRegularAccount)
    irregularOtherAccounts: [], // Array of OtherAccount objects (mapped to IrRegularOtherAccount)
    irregularPledges: [], // Array of Pledge objects (mapped to IrRegularPledge)
    irregularTransactions: [], // Array of Transaction (IrregularETransaction) objects
    attachments: [], // Array of Attachment objects { reporterObjId, fileName, documentType, documentTypeDesc, numberOfPages, comments }
  },
   reporterObjId: clientSideId(), // Add ID for the whole report root element
};


// Create the Zustand store
const useReportStore = create((set, get) => ({
  reportData: initialState,
  // --- Actions ---
  // Use Immer for easier nested updates
  updateField: (path, value) => set(produce((draft) => {
    const keys = path.split('.');
    let current = draft.reportData;
    for (let i = 0; i < keys.length - 1; i++) {
       if (current[keys[i]] === undefined || current[keys[i]] === null) {
         // Check next key to see if it's an array index
         const nextKeyIsIndex = !isNaN(parseInt(keys[i+1], 10));
         current[keys[i]] = nextKeyIsIndex ? [] : {};
       }
       current = current[keys[i]];
       if (current === null || current === undefined) {
            console.error(`updateField: Path segment ${keys[i]} leads to null/undefined at ${path}`);
            return; // Stop processing if path is broken
       }
    }
    current[keys[keys.length - 1]] = value;
  })),

   // Action to add an item to an array
   addItemToArray: (path, itemTemplate) => set(produce((draft) => {
     const keys = path.split('.');
     let current = draft.reportData;
     for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) { // Create path if it doesn't exist
            current[keys[i]] = {};
        }
       current = current[keys[i]];
     }
     const targetArray = current[keys[keys.length - 1]];
     if (Array.isArray(targetArray)) {
        // Add a unique ID to the new item
        targetArray.push({ ...itemTemplate, reporterObjId: clientSideId() });
     } else {
        // If the array doesn't exist, create it with the new item
        current[keys[keys.length - 1]] = [{ ...itemTemplate, reporterObjId: clientSideId() }];
        // console.error(`addItemToArray: Path ${path} does not point to an array.`);
     }
   })),

   // Action to remove an item from an array by index
   removeItemFromArray: (path, index) => set(produce((draft) => {
      const keys = path.split('.');
      let current = draft.reportData;
      for (let i = 0; i < keys.length - 1; i++) {
         if (!current[keys[i]]) {
              console.error(`removeItemFromArray: Path ${path} is invalid at segment ${keys[i]}`);
              return;
         }
        current = current[keys[i]];
      }
      const targetArray = current[keys[keys.length - 1]];
      if (Array.isArray(targetArray)) {
         if (index >= 0 && index < targetArray.length) {
            targetArray.splice(index, 1);
         } else {
             console.error(`removeItemFromArray: Invalid index ${index} for path ${path}`);
         }
      } else {
         console.error(`removeItemFromArray: Path ${path} does not point to an array.`);
      }
   })),

   // Action to update a specific field within an item in an array
   updateItemInArrayField: (pathToArray, index, field, value) => set(produce((draft) => {
        const keys = pathToArray.split('.');
        let current = draft.reportData;
        for (let i = 0; i < keys.length; i++) {
            // Check if current exists and is an object/array before proceeding
            if (current === null || typeof current !== 'object') {
                 console.error(`updateItemInArrayField: Path ${pathToArray} is invalid at segment ${keys[i-1]}`);
                 return;
            }
            if (!current[keys[i]]) {
                console.warn(`updateItemInArrayField: Creating missing path segment ${keys[i]} at ${pathToArray}`);
                // Determine if the next segment is an index to decide array/object creation
                const nextKeyIsIndex = (i + 1 < keys.length) && !isNaN(parseInt(keys[i+1], 10));
                 current[keys[i]] = nextKeyIsIndex ? [] : {};
            }
            current = current[keys[i]];
        }
        // Now 'current' should be the array
        if (Array.isArray(current) && index >= 0 && index < current.length) {
            if (current[index]) {
                current[index][field] = value;
            } else {
                 console.error(`updateItemInArrayField: Item at index ${index} not found in array at path ${pathToArray}`);
            }
        } else {
             if (!Array.isArray(current)) {
                 console.error(`updateItemInArrayField: Path ${pathToArray} does not point to an array. Found:`, typeof current);
             } else {
                 console.error(`updateItemInArrayField: Index ${index} is out of bounds for array at path ${pathToArray}. Length: ${current.length}`);
             }
        }
   })),

    // Specific action for handling checkbox groups / multi-select arrays
    // Stores data as [{ keyName: code1 }, { keyName: code2 }, ...]
    updateCheckboxGroup: (path, keyName, code, isChecked) => set(produce((draft) => {
        const keys = path.split('.');
        let current = draft.reportData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        const targetArrayPath = keys[keys.length - 1];
        if (!Array.isArray(current[targetArrayPath])) {
            current[targetArrayPath] = []; // Initialize if not an array
        }
        const targetArray = current[targetArrayPath];
        const index = targetArray.findIndex(item => item[keyName] === code);

        if (isChecked) {
            if (index === -1) { // Add if checked and not present
                targetArray.push({ [keyName]: code });
            }
        } else {
            if (index !== -1) { // Remove if unchecked and present
                targetArray.splice(index, 1);
            }
        }
    })),


  // Action to reset the state
  resetReport: () => set({ reportData: JSON.parse(JSON.stringify(initialState)) }), // Deep copy initial state

  // Getter to retrieve an item's reporterObjId (useful for linking)
  getReporterObjId: (path) => {
      const keys = path.split('.');
      let current = get().reportData;
      try {
          for (let i = 0; i < keys.length; i++) {
                if (current === null || typeof current !== 'object') return null; // Check if path is valid
              current = current[keys[i]];
          }
          return current?.reporterObjId;
      } catch (e) {
          console.error(`getReporterObjId: Could not find path ${path}`);
          return null;
      }
  },
}));

export default useReportStore;

```javascript
// --- File: src/components/shared/InputField.js ---

/**
 * @file InputField.js
 * @description Reusable input field component with label, validation, and styling.
 */

import React from 'react';

const InputField = ({ label, id, type = 'text', value, onChange, required = false, placeholder = '', error = null, className = '', readOnly = false, name }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name || id} // Use name prop if provided, otherwise fallback to id
      value={value ?? ''} // Ensure value is never undefined/null for controlled input
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'} ${readOnly ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'}`}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default InputField;

```javascript
// --- File: src/components/shared/SelectField.js ---

/**
 * @file SelectField.js
 * @description Reusable select dropdown component with label, validation, and styling.
 */

import React from 'react';

const SelectField = ({ label, id, value, onChange, options, required = false, placeholder = 'Select...', error = null, className = '', name }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      name={name || id} // Use name prop if provided, otherwise fallback to id
      value={value ?? ''} // Ensure value is never undefined/null for controlled select
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(option => (
        <option key={option.code} value={option.code}>
          {/* Display description or name, fallback to code */}
          {option.description || option.name || option.code}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default SelectField;

```javascript
// --- File: src/components/shared/TextAreaField.js ---

/**
 * @file TextAreaField.js
 * @description Reusable textarea field component.
 */
import React from 'react';

const TextAreaField = ({ label, id, value, onChange, required = false, placeholder = '', error = null, className = '', rows = 4, name }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      name={name || id}
      rows={rows}
      value={value ?? ''}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default TextAreaField;
```javascript
// --- File: src/components/shared/CheckboxGroupField.js ---

/**
 * @file CheckboxGroupField.js
 * @description Reusable component for a group of checkboxes.
 */
import React from 'react';

const CheckboxGroupField = ({ label, options, selectedCodes = [], onChange, name, error = null, required = false }) => {
    const handleChange = (e) => {
        const { value, checked } = e.target;
        // Value from checkbox is usually string, convert to number if codes are numbers
        const code = parseInt(value, 10);
        onChange(name, code, checked); // Pass name, code, and checked status up
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-2 space-y-2 p-3 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
                {options.map((option) => (
                    <div key={option.code} className="flex items-center">
                        <input
                            id={`${name}-${option.code}`}
                            name={`${name}-${option.code}`} // Unique name per checkbox might be better
                            type="checkbox"
                            value={option.code}
                            checked={selectedCodes.includes(option.code)}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={`${name}-${option.code}`} className="ml-2 block text-sm text-gray-900">
                            {option.description || option.name}
                        </label>
                    </div>
                ))}
            </div>
             {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default CheckboxGroupField;
```javascript
// --- File: src/components/shared/AddressForm.js ---

/**
 * @file AddressForm.js
 * @description Component for managing a single address.
 */
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { COUNTRY_CODES } from '../../constants'; // Assuming COUNTRY_CODES is in constants

const AddressForm = ({ address, basePath, index, onAddressChange, onRemoveAddress, isOnlyAddress }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onAddressChange(index, name, value);
    };

    return (
        <div className="p-3 border border-dashed border-gray-400 rounded-md mb-3 relative bg-gray-50">
            { !isOnlyAddress && (
                 <button
                    type="button"
                    onClick={() => onRemoveAddress(index)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg p-1"
                    title="Remove Address"
                >
                    &times;
                </button>
            )}
            <h4 className="text-sm font-medium text-gray-600 mb-2">כתובת {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField
                    label="מדינת כתובת"
                    id={`${basePath}.${index}.countryID`}
                    name="countryID" // Field name within the address object
                    value={address.countryID}
                    onChange={handleChange}
                    options={COUNTRY_CODES}
                    required
                    placeholder="בחר מדינה..."
                />
                <InputField
                    label="ישוב - אחר (אם לא נמצא קוד)"
                    id={`${basePath}.${index}.cityName`}
                    name="cityName"
                    value={address.cityName}
                    onChange={handleChange}
                    placeholder="שם הישוב"
                    // Required if cityCode is 777777 or not provided
                />
                 <InputField
                    label="רחוב - אחר (אם לא נמצא קוד)"
                    id={`${basePath}.${index}.streetName`}
                    name="streetName"
                    value={address.streetName}
                    onChange={handleChange}
                    required
                    placeholder="שם הרחוב"
                />
                <InputField
                    label="מספר בית"
                    id={`${basePath}.${index}.houseNumber`}
                    name="houseNumber"
                    value={address.houseNumber}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="מיקוד (7 ספרות)"
                    id={`${basePath}.${index}.newZIPCode`}
                    name="newZIPCode"
                    value={address.newZIPCode}
                    onChange={handleChange}
                    // Add validation for 7 digits
                />
                 <InputField
                    label="מיקוד (ישן, אם אין חדש)"
                    id={`${basePath}.${index}.zipCode`}
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleChange}
                />
                {/* Optional: City Code and Street Code if using official codes */}
                {/*
                <InputField label="סמל ישוב" id={`${basePath}.${index}.cityCode`} name="cityCode" value={address.cityCode} onChange={handleChange} />
                <InputField label="סמל רחוב" id={`${basePath}.${index}.streetCode`} name="streetCode" value={address.streetCode} onChange={handleChange} />
                */}
            </div>
        </div>
    );
};

export default AddressForm;
```javascript
// --- File: src/components/shared/PhoneList.js ---

/**
 * @file PhoneList.js
 * @description Component for managing a list of phone numbers.
 */
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { PHONE_TYPES } from '../../constants';
import useReportStore, { emptyPhone } from '../../store/useReportStore'; // Import emptyPhone

const PhoneList = ({ phones, basePath, onPhoneChange, onAddPhone, onRemovePhone }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">טלפונים</label>
            {phones.map((phone, index) => (
                <div key={phone.reporterObjId || index} className="p-3 border border-dashed border-gray-400 rounded-md mb-3 relative bg-gray-50">
                    <button
                        type="button"
                        onClick={() => onRemovePhone(index)}
                        disabled={phones.length <= 1} // Disable remove if only one phone
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove Phone"
                    >
                        &times;
                    </button>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">טלפון {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <InputField
                            label="מספר טלפון"
                            id={`${basePath}.${index}.number`}
                            name="number"
                            value={phone.number}
                            onChange={(e) => onPhoneChange(index, 'number', e.target.value)}
                            required
                        />
                        <SelectField
                            label="סוג טלפון"
                            id={`${basePath}.${index}.phoneType`}
                            name="phoneType"
                            value={phone.phoneType}
                            onChange={(e) => onPhoneChange(index, 'phoneType', e.target.value ? parseInt(e.target.value, 10) : null)}
                            options={PHONE_TYPES}
                            placeholder="בחר סוג..."
                        />
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={onAddPhone}
                className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
                + הוסף טלפון
            </button>
        </div>
    );
};
export default PhoneList;
```javascript
// --- File: src/components/shared/EmailList.js ---

/**
 * @file EmailList.js
 * @description Component for managing a list of email addresses.
 */
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { EMAIL_TYPES } from '../../constants';
import useReportStore, { emptyEmail } from '../../store/useReportStore'; // Import emptyEmail

const EmailList = ({ emails, basePath, onEmailChange, onAddEmail, onRemoveEmail }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">כתובות דוא"ל</label>
            {emails.map((email, index) => (
                <div key={email.reporterObjId || index} className="p-3 border border-dashed border-gray-400 rounded-md mb-3 relative bg-gray-50">
                     <button
                        type="button"
                        onClick={() => onRemoveEmail(index)}
                        disabled={emails.length <= 1} // Disable remove if only one email
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove Email"
                    >
                        &times;
                    </button>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">דוא"ל {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <InputField
                            label="כתובת דוא''ל"
                            id={`${basePath}.${index}.emailAddress`}
                            name="emailAddress"
                            type="email"
                            value={email.emailAddress}
                            onChange={(e) => onEmailChange(index, 'emailAddress', e.target.value)}
                            required
                        />
                        <SelectField
                            label="סוג דוא''ל"
                            id={`${basePath}.${index}.emailType`}
                            name="emailType"
                            value={email.emailType}
                            onChange={(e) => onEmailChange(index, 'emailType', e.target.value ? parseInt(e.target.value, 10) : null)}
                            options={EMAIL_TYPES}
                            placeholder="בחר סוג..."
                        />
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={onAddEmail}
                className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
                + הוסף דוא"ל
            </button>
        </div>
    );
};
export default EmailList;
```javascript
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
  const { reportData, updateField, updateItemInArrayField } = useReportStore((state) => ({
      reportData: state.reportData,
      updateField: state.updateField,
      updateItemInArrayField: state.updateItemInArrayField,
  }));
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

```javascript
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
```javascript
// --- File: src/components/steps/RelatedReportsStep.js ---

/**
 * @file RelatedReportsStep.js
 * @description Component for Step 3: Linking Related Reports.
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from '../shared/InputField';
import CheckboxGroupField from '../shared/CheckboxGroupField'; // Assuming CheckboxGroup is better here
import { RELATED_REPORT_RELATION_TYPES } from '../../constants';

const RelatedReportsStep = () => {
    const { reportData, addItemToArray, removeItemFromArray, updateItemInArrayField, updateCheckboxGroup } = useReportStore((state) => ({
        reportData: state.reportData,
        addItemToArray: state.addItemToArray,
        removeItemFromArray: state.removeItemFromArray,
        updateItemInArrayField: state.updateItemInArrayField,
        updateCheckboxGroup: state.updateCheckboxGroup, // Use the specific action
    }));
    const relatedReports = reportData.relatedReports || [];

    const [errors, setErrors] = useState({}); // Local errors for this step

    const handleAddReport = () => {
        // Add a new empty related report object to the state
        addItemToArray('relatedReports', { reportNumber: '', relationsToEvent: [] });
    };

    const handleRemoveReport = (index) => {
        // Remove the report at the specified index
        removeItemFromArray('relatedReports', index);
    };

    const handleInputChange = (index, field, value) => {
        // Update a specific field (like reportNumber) for a report at a given index
        updateItemInArrayField('relatedReports', index, field, value);
         // Basic validation
         if (field === 'reportNumber' && value.trim() === '') {
             setErrors(prev => ({ ...prev, [`relatedReports.${index}.reportNumber`]: 'שדה חובה' }));
         } else {
             setErrors(prev => ({ ...prev, [`relatedReports.${index}.reportNumber`]: null }));
         }
    };

     const handleRelationChange = (index, relationCode, isChecked) => {
        // This is complex because relationsToEvent is an array of objects [{ relationTypeID: code }]
        // We need to add or remove the object based on the checkbox state.
        const currentRelations = relatedReports[index]?.relationsToEvent || [];
        let newRelations;

        if (isChecked) {
            // Add { relationTypeID: code } if not already present
            if (!currentRelations.some(rel => rel.relationTypeID === relationCode)) {
                 newRelations = [...currentRelations, { relationTypeID: relationCode }];
            } else {
                newRelations = [...currentRelations]; // No change if already present
            }
        } else {
            // Remove { relationTypeID: code } if present
             newRelations = currentRelations.filter(rel => rel.relationTypeID !== relationCode);
        }
        updateItemInArrayField('relatedReports', index, 'relationsToEvent', newRelations);
    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">3. דיווחים קשורים (Related Reports)</h2>
            <p className="text-sm text-gray-600">קשר דיווח זה לדיווחים קודמים שנשלחו לרשות, אם רלוונטי.</p>

            {relatedReports.map((report, index) => (
                <div key={report.reporterObjId || index} className="p-4 border border-gray-300 rounded-md bg-gray-50 relative mb-4">
                    <button
                        onClick={() => handleRemoveReport(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl"
                        title="Remove Related Report"
                    >
                        &times; {/* Multiplication sign for X */}
                    </button>
                    <h3 className="text-md font-medium text-gray-700 mb-2">דיווח קשור #{index + 1}</h3>
                    <InputField
                        label="מספר דיווח קשור שנשלח בעבר לרשות"
                        id={`relatedReportNumber_${index}`}
                        value={report.reportNumber}
                        onChange={(e) => handleInputChange(index, 'reportNumber', e.target.value)}
                        required
                        error={errors[`relatedReports.${index}.reportNumber`]}
                        className="mb-3"
                    />
                    {/* Using Checkboxes for Relation Types */}
                    <div className="mb-2">
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                            סוג הקשר (ניתן לבחור יותר מאחד)
                            {/* Add required indicator if needed */}
                         </label>
                         <div className="mt-1 space-y-1 p-2 border border-gray-200 rounded-md">
                             {RELATED_REPORT_RELATION_TYPES.map((relationType) => (
                                 <div key={relationType.code} className="flex items-center">
                                     <input
                                         id={`relationType_${index}_${relationType.code}`}
                                         type="checkbox"
                                         value={relationType.code}
                                         checked={report.relationsToEvent?.some(r => r.relationTypeID === relationType.code) || false}
                                         onChange={(e) => handleRelationChange(index, relationType.code, e.target.checked)}
                                         className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                     />
                                     <label htmlFor={`relationType_${index}_${relationType.code}`} className="ml-2 block text-sm text-gray-900">
                                         {relationType.description}
                                     </label>
                                 </div>
                             ))}
                         </div>
                         {/* Add error display if needed */}
                    </div>
                </div>
            ))}

            <button
                onClick={handleAddReport}
                className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                + הוסף דיווח קשור
            </button>
        </div>
    );
};

export default RelatedReportsStep;
```javascript
// --- File: src/components/steps/EventDetailsStep.js ---

/**
 * @file EventDetailsStep.js
 * @description Component for Step 4: Event Details and Content.
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from '../shared/InputField';
import TextAreaField from '../shared/TextAreaField';
import CheckboxGroupField from '../shared/CheckboxGroupField';
import SelectField from '../shared/SelectField'; // For boolean toggle
import { REPORTING_REASONS, REPORT_KEYWORDS, ADDITIONAL_AUTHORITIES, TRANSACTION_COMMITTED_OPTIONS } from '../../constants';

const EventDetailsStep = () => {
    const { reportData, updateField, updateCheckboxGroup } = useReportStore((state) => ({
        reportData: state.reportData,
        updateField: state.updateField,
        updateCheckboxGroup: state.updateCheckboxGroup,
    }));
    const event = reportData.irregularReportEvent;

    const [errors, setErrors] = useState({});

    // Handle simple input changes
    const handleChange = (e) => {
        const { name, value, type, required } = e.target;
        let processedValue = value;
         // Basic required validation
         if (required && value.trim() === '') {
             setErrors(prev => ({ ...prev, [name]: 'שדה חובה' }));
         } else {
             setErrors(prev => ({ ...prev, [name]: null }));
         }
         // Handle boolean select
         if (name === 'irregularReportEvent.transactionCommitted') {
             processedValue = value === '' ? null : (value === '1'); // Convert '1'/'0' string to boolean/null
         }
        updateField(name, processedValue);
    };

    // Handle changes for checkbox groups
    const handleCheckboxChange = (groupName, code, isChecked) => {
        // groupName should be the path to the array in the state, e.g., 'irregularReportEvent.reportingReasons'
        // keyName should be the property name within the objects in the array, e.g., 'reportingReason'
        let keyName = '';
        if (groupName === 'irregularReportEvent.reportingReasons') keyName = 'reportingReason';
        else if (groupName === 'irregularReportEvent.reportKeyWordsCodes') keyName = 'reportKeyWordCode';
        else if (groupName === 'irregularReportEvent.additionalAuthoritiesCodes') keyName = 'additionalAuthorityCode';
        else {
            console.error("Unknown checkbox group:", groupName);
            return;
        }

        updateCheckboxGroup(groupName, keyName, code, isChecked);

        // Clear 'Other' description if the corresponding 'Other' checkbox is unchecked
        if (!isChecked) {
            if (keyName === 'reportingReason' && code === 99) updateField('irregularReportEvent.reportingReasonDesc', '');
            if (keyName === 'reportKeyWordCode' && code === 300) updateField('irregularReportEvent.reportKeyWordDesc', '');
            if (keyName === 'additionalAuthorityCode' && code === 4) updateField('irregularReportEvent.additionalAuthoritiesDesc', '');
        }
    };

    // Get selected codes for checkbox groups
    const selectedReasons = event.reportingReasons?.map(r => r.reportingReason) || [];
    const selectedKeywords = event.reportKeyWordsCodes?.map(k => k.reportKeyWordCode) || [];
    const selectedAuthorities = event.additionalAuthoritiesCodes?.map(a => a.additionalAuthorityCode) || [];

    // Determine if 'Other' options are selected
    const isReasonOtherSelected = selectedReasons.includes(99);
    const isKeywordOtherSelected = selectedKeywords.includes(300);
    const isAuthorityOtherSelected = selectedAuthorities.includes(4);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">4. פרטי הדיווח ותוכן הידיעה (Report Details & Event Content)</h2>
            <p className="text-sm text-gray-600">פרטי האירוע שהוביל לדיווח ותיאור מפורט.</p>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField
                    label="תאריך האירוע שחולל את הדיווח"
                    id="eventDateTime"
                    name="irregularReportEvent.eventDateTime"
                    type="date" // Using date only as per spec table 3.4 (1)
                    value={event.eventDateTime}
                    onChange={handleChange}
                    required
                    error={errors['irregularReportEvent.eventDateTime']}
                />
                 <SelectField
                    label="האם הדיווח מכיל פעולות?"
                    id="transactionCommitted"
                    name="irregularReportEvent.transactionCommitted"
                    value={event.transactionCommitted === null ? '' : (event.transactionCommitted ? '1' : '0')} // Map boolean/null to '1'/'0'/''
                    onChange={handleChange}
                    options={TRANSACTION_COMMITTED_OPTIONS}
                    required // Likely required
                    placeholder="בחר..."
                    error={errors['irregularReportEvent.transactionCommitted']}
                 />
            </div>

             <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <CheckboxGroupField
                    label="סיבת הדיווח (ניתן לבחור יותר מאחד)"
                    name="irregularReportEvent.reportingReasons" // Path to the array
                    options={REPORTING_REASONS}
                    selectedCodes={selectedReasons}
                    onChange={handleCheckboxChange} // Pass the specific handler
                    required
                    error={errors['irregularReportEvent.reportingReasons']}
                />
                {isReasonOtherSelected && (
                    <InputField
                        label="פירוט סיבת דיווח אחרת"
                        id="reportingReasonDesc"
                        name="irregularReportEvent.reportingReasonDesc"
                        value={event.reportingReasonDesc}
                        onChange={handleChange}
                        required={isReasonOtherSelected}
                        error={errors['irregularReportEvent.reportingReasonDesc']}
                        className="mt-2"
                    />
                )}
             </div>

             <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <TextAreaField
                    label="תמצית הידיעה"
                    id="reportingBriefContent"
                    name="irregularReportEvent.reportingBriefContent"
                    value={event.reportingBriefContent}
                    onChange={handleChange}
                    rows={3}
                    placeholder="תיאור תמציתי של נסיבות הדיווח..."
                    error={errors['irregularReportEvent.reportingBriefContent']}
                />
             </div>

             <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                 <CheckboxGroupField
                    label="ביטוי מפתח (ניתן לבחור יותר מאחד)"
                    name="irregularReportEvent.reportKeyWordsCodes"
                    options={REPORT_KEYWORDS}
                    selectedCodes={selectedKeywords}
                    onChange={handleCheckboxChange}
                    error={errors['irregularReportEvent.reportKeyWordsCodes']}
                 />
                 {isKeywordOtherSelected && (
                     <InputField
                        label="פירוט תחום בסיכון אחר"
                        id="reportKeyWordDesc"
                        name="irregularReportEvent.reportKeyWordDesc"
                        value={event.reportKeyWordDesc}
                        onChange={handleChange}
                        required={isKeywordOtherSelected}
                        error={errors['irregularReportEvent.reportKeyWordDesc']}
                        className="mt-2"
                     />
                 )}
             </div>

              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                 <CheckboxGroupField
                    label="דווח לרשות אכיפה (אם רלוונטי, ניתן לבחור יותר מאחד)"
                    name="irregularReportEvent.additionalAuthoritiesCodes"
                    options={ADDITIONAL_AUTHORITIES}
                    selectedCodes={selectedAuthorities}
                    onChange={handleCheckboxChange}
                    error={errors['irregularReportEvent.additionalAuthoritiesCodes']}
                 />
                 {isAuthorityOtherSelected && (
                     <InputField
                        label="פירוט גורם אכיפה אחר"
                        id="additionalAuthoritiesDesc"
                        name="irregularReportEvent.additionalAuthoritiesDesc"
                        value={event.additionalAuthoritiesDesc}
                        onChange={handleChange}
                        required={isAuthorityOtherSelected}
                        error={errors['irregularReportEvent.additionalAuthoritiesDesc']}
                        className="mt-2"
                     />
                 )}
             </div>

             <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <TextAreaField
                    label="תוכן הידיעה"
                    id="reportingContent"
                    name="irregularReportEvent.reportingContent"
                    value={event.reportingContent}
                    onChange={handleChange}
                    rows={8}
                    required
                    placeholder="תיאור מלא של המקרה ונסיבותיו..."
                    error={errors['irregularReportEvent.reportingContent']}
                />
             </div>

        </div>
    );
};

export default EventDetailsStep;
```javascript
// --- File: src/components/steps/InvolvedEntitiesStep.js ---
import React, { useState } from 'react';
import useReportStore, { initialPersonState, initialCorporateState } from '../../store/useReportStore';
import PersonForm from '../shared/PersonForm';
import CorporateForm from '../shared/CorporateForm';

const InvolvedEntitiesStep = () => {
    const { reportData, addItemToArray, removeItemFromArray, updateItemInArrayField, updateCheckboxGroup } = useReportStore((state) => ({
        reportData: state.reportData,
        addItemToArray: state.addItemToArray,
        removeItemFromArray: state.removeItemFromArray,
        updateItemInArrayField: state.updateItemInArrayField,
        updateCheckboxGroup: state.updateCheckboxGroup,
    }));

    const persons = reportData.irregularReportEvent.listOfInvolvedEntities.persons || [];
    const corporates = reportData.irregularReportEvent.listOfInvolvedEntities.corporates || [];

    const [showPersonForm, setShowPersonForm] = useState(false); // To toggle visibility of new person form
    const [showCorporateForm, setShowCorporateForm] = useState(false); // To toggle visibility of new corporate form


    const handleAddPerson = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.persons', initialPersonState());
        setShowPersonForm(true); // Keep form open or manage visibility per item
    };

    const handleRemovePerson = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.persons', index);
    };

    const handleAddCorporate = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.corporates', initialCorporateState());
        setShowCorporateForm(true); // Keep form open or manage visibility per item
    };

    const handleRemoveCorporate = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.corporates', index);
    };


    // Generic handler for updating fields within a person or corporate entity
    const handleEntityChange = (entityType, index, fieldPath, value) => {
        // entityType is 'persons' or 'corporates'
        // fieldPath is the nested path within the person/corporate object e.g., 'firstName' or 'addresses.0.streetName'
        // This might need to be more sophisticated if fieldPath is deeply nested itself.
        // For now, assuming fieldPath is a direct property or a simple nested one that updateItemInArrayField can handle.
        const fullPathToArray = `irregularReportEvent.listOfInvolvedEntities.${entityType}`;
        updateItemInArrayField(fullPathToArray, index, fieldPath, value);
    };

    // Handler for checkbox groups within an entity (e.g., relationsToEvent)
    const handleEntityCheckboxGroupChange = (entityType, index, groupPath, keyName, code, isChecked) => {
        const fullPathToGroupArray = `irregularReportEvent.listOfInvolvedEntities.${entityType}.${index}.${groupPath}`;
        // updateCheckboxGroup expects the full path to the array.
        // We need a way to update a nested array within an item of another array.
        // This might require a more specific action in Zustand or careful path construction.

        // For now, let's retrieve the current entity, modify it, and update it.
        const entityArray = reportData.irregularReportEvent.listOfInvolvedEntities[entityType];
        const entity = { ...entityArray[index] }; // Shallow copy

        if (!entity[groupPath]) {
            entity[groupPath] = [];
        }
        const targetArray = entity[groupPath];
        const itemIndex = targetArray.findIndex(item => item[keyName] === code);

        if (isChecked) {
            if (itemIndex === -1) targetArray.push({ [keyName]: code });
        } else {
            if (itemIndex !== -1) targetArray.splice(itemIndex, 1);
        }
        // Update the entire entity object in the persons/corporates array
        updateItemInArrayField(`irregularReportEvent.listOfInvolvedEntities.${entityType}`, index, groupPath, targetArray);
    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">5. גורמים מעורבים (Involved Entities)</h2>
            <p className="text-sm text-gray-600">פרטי הגורמים המעורבים באירוע, אנשים או תאגידים.</p>

            {/* Persons Section */}
            <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium text-indigo-700 mb-3">אנשים מעורבים (Persons)</h3>
                {persons.map((person, index) => (
                    <PersonForm
                        key={person.reporterObjId || index} // Use reporterObjId for stable key
                        personData={person}
                        personIndex={index}
                        onPersonChange={(fieldPath, value) => handleEntityChange('persons', index, fieldPath, value)}
                        onRemovePerson={() => handleRemovePerson(index)}
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) => handleEntityCheckboxGroupChange('persons', index, groupPath, keyName, code, isChecked)}
                        basePath={`irregularReportEvent.listOfInvolvedEntities.persons.${index}`}
                    />
                ))}
                <button
                    onClick={handleAddPerson}
                    className="mt-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    + הוסף אדם
                </button>
            </div>

            {/* Corporates Section */}
            <div className="p-4 border border-gray-200 rounded-md mt-6">
                <h3 className="text-lg font-medium text-indigo-700 mb-3">תאגידים מעורבים (Corporates)</h3>
                {corporates.map((corporate, index) => (
                     <CorporateForm
                        key={corporate.reporterObjId || index}
                        corporateData={corporate}
                        corporateIndex={index}
                        onCorporateChange={(fieldPath, value) => handleEntityChange('corporates', index, fieldPath, value)}
                        onRemoveCorporate={() => handleRemoveCorporate(index)}
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) => handleEntityCheckboxGroupChange('corporates', index, groupPath, keyName, code, isChecked)}
                        basePath={`irregularReportEvent.listOfInvolvedEntities.corporates.${index}`}
                    />
                ))}
                <button
                    onClick={handleAddCorporate}
                    className="mt-2 px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    + הוסף תאגיד
                </button>
            </div>
        </div>
    );
};

export default InvolvedEntitiesStep;
```javascript
// --- File: src/components/shared/PersonForm.js ---

/**
 * @file PersonForm.js
 * @description Sub-form for individual person entity details.
 */
import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxGroupField from './CheckboxGroupField';
import AddressForm from './AddressForm';
import PhoneList from './PhoneList';
import EmailList from './EmailList';
// import EntityRelationList from './EntityRelationList'; // TODO: Implement later
import useReportStore, { emptyAddress, emptyPhone, emptyEmail, emptyRelation } from '../../store/useReportStore';

import {
    ENTITY_EVENT_RELATIONS,
    PERSON_ID_TYPES,
    COUNTRY_CODES,
    GENDER_CODES,
    PERSON_RESIDENCE_STATUS_CODES,
    PROFESSION_CODES_EXAMPLE,
    ENTITY_TO_ENTITY_RELATIONS
} from '../../constants';

const PersonForm = ({ personData, personIndex, onPersonChange, onRemovePerson, onCheckboxGroupChange, basePath }) => {
    const { updateItemInArrayField, addItemToArray, removeItemFromArray } = useReportStore();

    // Handlers for nested arrays within Person
    const handleAddressChange = (addressIndex, field, value) => {
        updateItemInArrayField(`${basePath}.addresses`, addressIndex, field, value);
    };
    const handleAddAddress = () => {
        addItemToArray(`${basePath}.addresses`, emptyAddress());
    };
    const handleRemoveAddress = (addressIndex) => {
        // Prevent removing the last address if at least one is required
        if (personData.addresses.length > 1) {
            removeItemFromArray(`${basePath}.addresses`, addressIndex);
        } else {
            alert("חובה להשאיר לפחות כתובת אחת.");
        }
    };

    const handlePhoneChange = (phoneIndex, field, value) => {
        updateItemInArrayField(`${basePath}.phones`, phoneIndex, field, value);
    };
    const handleAddPhone = () => {
        addItemToArray(`${basePath}.phones`, emptyPhone());
    };
    const handleRemovePhone = (phoneIndex) => {
         if (personData.phones.length > 1) {
            removeItemFromArray(`${basePath}.phones`, phoneIndex);
        } else {
            // Optionally clear the fields of the last phone instead of erroring
            updateItemInArrayField(`${basePath}.phones`, 0, 'number', '');
            updateItemInArrayField(`${basePath}.phones`, 0, 'phoneType', null);
        }
    };

    const handleEmailChange = (emailIndex, field, value) => {
        updateItemInArrayField(`${basePath}.emails`, emailIndex, field, value);
    };
    const handleAddEmail = () => {
        addItemToArray(`${basePath}.emails`, emptyEmail());
    };
    const handleRemoveEmail = (emailIndex) => {
        if (personData.emails.length > 1) {
            removeItemFromArray(`${basePath}.emails`, emailIndex);
        } else {
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailAddress', '');
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailType', null);
        }
    };

    // TODO: Implement handleEntityRelationChange, handleAddEntityRelation, handleRemoveEntityRelation

    const selectedEventRelations = personData.relationsToEvent?.map(r => r.relationTypeID) || [];
    const selectedProfessionCodes = personData.professionTypeCodes?.map(p => p.professionTypeCode) || [];


    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
            <button
                type="button"
                onClick={onRemovePerson}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="Remove Person"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                אדם מעורב #{personIndex + 1} (ID: {personData.reporterObjId?.slice(-6)})
            </h3>

            <CheckboxGroupField
                label="קשר ישות לידיעה"
                name="relationsToEvent" // This name is used by onCheckboxGroupChange to build the path
                options={ENTITY_EVENT_RELATIONS}
                selectedCodes={selectedEventRelations}
                onChange={(groupName, code, isChecked) => onCheckboxGroupChange('relationsToEvent', 'relationTypeID', code, isChecked)}
                required
            />
            {selectedEventRelations.includes(24) && ( // Assuming 24 is 'Other'
                <InputField
                    label="פירוט קשר ישות לידיעה - אחר"
                    id={`person_${personIndex}_relationToEventDesc`}
                    value={personData.relationsToEvent?.find(r => r.relationTypeID === 24)?.relationTypeDesc || ''}
                    onChange={(e) => {
                        const updatedRelations = personData.relationsToEvent.map(r =>
                            r.relationTypeID === 24 ? { ...r, relationTypeDesc: e.target.value } : r
                        );
                        onPersonChange('relationsToEvent', updatedRelations);
                    }}
                    required={selectedEventRelations.includes(24)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="שם פרטי" value={personData.firstName} onChange={(e) => onPersonChange('firstName', e.target.value)} required />
                <InputField label="שם משפחה" value={personData.lastName} onChange={(e) => onPersonChange('lastName', e.target.value)} required />
                <InputField label="שם פרטי בלועזית" value={personData.latinName} onChange={(e) => onPersonChange('latinName', e.target.value)} />
                <InputField label="שם משפחה בלועזית" value={personData.latinSurname} onChange={(e) => onPersonChange('latinSurname', e.target.value)} />

                <SelectField
                    label="סוג מספר זהות"
                    value={personData.idType}
                    onChange={(e) => onPersonChange('idType', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={PERSON_ID_TYPES}
                    required
                    placeholder="בחר סוג..."
                />
                {personData.idType === 99 && (
                    <InputField label="פירוט סוג מספר זהות - אחר" value={personData.idTypeDesc} onChange={(e) => onPersonChange('idTypeDesc', e.target.value)} required />
                )}
                <InputField label="מספר זהות" value={personData.idNumber} onChange={(e) => onPersonChange('idNumber', e.target.value)} required />
                <SelectField label="מדינת דרכון/זהות" value={personData.idCountry} onChange={(e) => onPersonChange('idCountry', e.target.value)} options={COUNTRY_CODES} required placeholder="בחר מדינה..." />
                <InputField label="תאריך לידה" type="date" value={personData.birthDate} onChange={(e) => onPersonChange('birthDate', e.target.value)} required />

                <SelectField
                    label="מין"
                    value={personData.entityGender}
                    onChange={(e) => onPersonChange('entityGender', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={GENDER_CODES}
                    required
                    placeholder="בחר מין..."
                />
                {personData.entityGender === 99 && (
                    <InputField label="פירוט מין - אחר" value={personData.entityGenderDesc} onChange={(e) => onPersonChange('entityGenderDesc', e.target.value)} required />
                )}
                <SelectField
                    label="מעמד ישות (אדם)"
                    value={personData.residenceStatus}
                    onChange={(e) => onPersonChange('residenceStatus', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={PERSON_RESIDENCE_STATUS_CODES}
                    required
                    placeholder="בחר מעמד..."
                />
                {personData.residenceStatus === 5 && ( // Assuming 5 is 'Other' for person
                    <InputField label="פירוט מעמד ישות - אחר" value={personData.residenceStatusDesc} onChange={(e) => onPersonChange('residenceStatusDesc', e.target.value)} required />
                )}
            </div>

            {/* Profession - Assuming it's a multi-select for codes */}
             <CheckboxGroupField
                label="קוד תחום עיסוק/משלח יד (בחר מרשימה)"
                name="professionTypeCodes"
                options={PROFESSION_CODES_EXAMPLE} // Replace with actual CBS codes
                selectedCodes={selectedProfessionCodes}
                onChange={(groupName, code, isChecked) => onCheckboxGroupChange('professionTypeCodes', 'professionTypeCode', code, isChecked)}
            />
            {(selectedProfessionCodes.includes('xxxx') || !selectedProfessionCodes.length) && ( // Assuming 'xxxx' is the code for 'Other' or if no code is selected
                <InputField
                    label="תחום עיסוק/משלח יד - אחר/פירוט"
                    value={personData.profession}
                    onChange={(e) => onPersonChange('profession', e.target.value)}
                    placeholder="פרט אם 'לא ידוע' או שלא נמצא ברשימה"
                    required={selectedProfessionCodes.includes('xxxx')}
                />
            )}


            {/* Addresses */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">כתובות</h4>
                {personData.addresses.map((addr, idx) => (
                    <AddressForm
                        key={addr.reporterObjId || idx}
                        address={addr}
                        basePath={`${basePath}.addresses`}
                        index={idx}
                        onAddressChange={handleAddressChange}
                        onRemoveAddress={handleRemoveAddress}
                        isOnlyAddress={personData.addresses.length === 1}
                    />
                ))}
                <button type="button" onClick={handleAddAddress} className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600">
                    + הוסף כתובת
                </button>
            </div>

            {/* Phones */}
            <PhoneList
                phones={personData.phones}
                basePath={`${basePath}.phones`}
                onPhoneChange={handlePhoneChange}
                onAddPhone={handleAddPhone}
                onRemovePhone={handleRemovePhone}
            />

            {/* Emails */}
            <EmailList
                emails={personData.emails}
                basePath={`${basePath}.emails`}
                onEmailChange={handleEmailChange}
                onAddEmail={handleAddEmail}
                onRemoveEmail={handleRemoveEmail}
            />

            <TextAreaField
                label="הערות לישות"
                value={personData.entityComment}
                onChange={(e) => onPersonChange('entityComment', e.target.value)}
                rows={2}
            />

            {/* TODO: Entity to Entity Relations (Section 3.4.1.1) - Requires EntityRelationList component */}
            {/* <EntityRelationList basePath={`${basePath}.relatedEntities`} relations={personData.relatedEntities} entityType="person" /> */}
             <div className="mt-4 pt-3 border-t">
                 <p className="text-sm text-gray-500"> (מקטע 'קשר ישות לישויות אחרות' יפותח בהמשך)</p>
             </div>

        </div>
    );
};

export default PersonForm;
```javascript
// --- File: src/components/shared/CorporateForm.js ---

/**
 * @file CorporateForm.js
 * @description Sub-form for corporate entity details.
 */
import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxGroupField from './CheckboxGroupField';
import AddressForm from './AddressForm';
import PhoneList from './PhoneList';
import EmailList from './EmailList';
// import EntityRelationList from './EntityRelationList'; // TODO: Implement later
import useReportStore, { emptyAddress, emptyPhone, emptyEmail, emptyRelation } from '../../store/useReportStore';

import {
    ENTITY_EVENT_RELATIONS,
    CORPORATE_ID_TYPES,
    COUNTRY_CODES,
    CORPORATE_RESIDENCE_STATUS_CODES,
    ENTITY_TO_ENTITY_RELATIONS
} from '../../constants';

const CorporateForm = ({ corporateData, corporateIndex, onCorporateChange, onRemoveCorporate, onCheckboxGroupChange, basePath }) => {
     const { updateItemInArrayField, addItemToArray, removeItemFromArray } = useReportStore();

    // Handlers for nested arrays within Corporate
    const handleAddressChange = (addressIndex, field, value) => {
        updateItemInArrayField(`${basePath}.addresses`, addressIndex, field, value);
    };
    const handleAddAddress = () => {
        addItemToArray(`${basePath}.addresses`, emptyAddress());
    };
    const handleRemoveAddress = (addressIndex) => {
        if (corporateData.addresses.length > 1) {
            removeItemFromArray(`${basePath}.addresses`, addressIndex);
        } else {
            alert("חובה להשאיר לפחות כתובת אחת.");
        }
    };

    const handlePhoneChange = (phoneIndex, field, value) => {
        updateItemInArrayField(`${basePath}.phones`, phoneIndex, field, value);
    };
    const handleAddPhone = () => {
        addItemToArray(`${basePath}.phones`, emptyPhone());
    };
    const handleRemovePhone = (phoneIndex) => {
        if (corporateData.phones.length > 1) {
            removeItemFromArray(`${basePath}.phones`, phoneIndex);
        } else {
            updateItemInArrayField(`${basePath}.phones`, 0, 'number', '');
            updateItemInArrayField(`${basePath}.phones`, 0, 'phoneType', null);
        }
    };


    const handleEmailChange = (emailIndex, field, value) => {
        updateItemInArrayField(`${basePath}.emails`, emailIndex, field, value);
    };
    const handleAddEmail = () => {
        addItemToArray(`${basePath}.emails`, emptyEmail());
    };
    const handleRemoveEmail = (emailIndex) => {
         if (corporateData.emails.length > 1) {
            removeItemFromArray(`${basePath}.emails`, emailIndex);
        } else {
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailAddress', '');
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailType', null);
        }
    };

    // TODO: Implement handleEntityRelationChange, handleAddEntityRelation, handleRemoveEntityRelation

    const selectedEventRelations = corporateData.relationsToEvent?.map(r => r.relationTypeID) || [];

    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
            <button
                type="button"
                onClick={onRemoveCorporate}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="Remove Corporate"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                תאגיד מעורב #{corporateIndex + 1} (ID: {corporateData.reporterObjId?.slice(-6)})
            </h3>

            <CheckboxGroupField
                label="קשר ישות לידיעה"
                name="relationsToEvent"
                options={ENTITY_EVENT_RELATIONS}
                selectedCodes={selectedEventRelations}
                onChange={(groupName, code, isChecked) => onCheckboxGroupChange('relationsToEvent', 'relationTypeID', code, isChecked)}
                required
            />
            {selectedEventRelations.includes(24) && ( // Assuming 24 is 'Other'
                <InputField
                    label="פירוט קשר ישות לידיעה - אחר"
                    id={`corporate_${corporateIndex}_relationToEventDesc`}
                    value={corporateData.relationsToEvent?.find(r => r.relationTypeID === 24)?.relationTypeDesc || ''}
                     onChange={(e) => {
                        const updatedRelations = corporateData.relationsToEvent.map(r =>
                            r.relationTypeID === 24 ? { ...r, relationTypeDesc: e.target.value } : r
                        );
                        onCorporateChange('relationsToEvent', updatedRelations);
                    }}
                    required={selectedEventRelations.includes(24)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="שם תאגיד" value={corporateData.name} onChange={(e) => onCorporateChange('name', e.target.value)} required />
                <InputField label="שם תאגיד בלועזית" value={corporateData.latinName} onChange={(e) => onCorporateChange('latinName', e.target.value)} />

                <SelectField
                    label="סוג מספר זהות (תאגיד)"
                    value={corporateData.idType}
                    onChange={(e) => onCorporateChange('idType', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={CORPORATE_ID_TYPES}
                    required
                    placeholder="בחר סוג..."
                />
                 {corporateData.idType === 99 && (
                    <InputField label="פירוט סוג מספר זהות - אחר" value={corporateData.idTypeDesc} onChange={(e) => onCorporateChange('idTypeDesc', e.target.value)} required />
                )}
                <InputField label="מספר זהות (ח.פ / אחר)" value={corporateData.idNumber} onChange={(e) => onCorporateChange('idNumber', e.target.value)} required />
                <SelectField label="מדינת התאגדות" value={corporateData.idCountry} onChange={(e) => onCorporateChange('idCountry', e.target.value)} options={COUNTRY_CODES} required placeholder="בחר מדינה..." />
                <InputField label="תאריך התאגדות" type="date" value={corporateData.foundationDate} onChange={(e) => onCorporateChange('foundationDate', e.target.value)} required />

                <SelectField
                    label="מעמד ישות (תאגיד)"
                    value={corporateData.residenceStatus}
                    onChange={(e) => onCorporateChange('residenceStatus', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={CORPORATE_RESIDENCE_STATUS_CODES}
                    required
                    placeholder="בחר מעמד..."
                />
                 {corporateData.residenceStatus === 5 && ( // Assuming 5 is 'Other' for corporate
                    <InputField label="פירוט מעמד ישות - אחר" value={corporateData.residenceStatusDesc} onChange={(e) => onCorporateChange('residenceStatusDesc', e.target.value)} required />
                )}
                <InputField label="תיאור תחום עיסוק תאגיד" value={corporateData.corporateFieldDesc} onChange={(e) => onCorporateChange('corporateFieldDesc', e.target.value)} />
            </div>

            {/* Addresses */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">כתובות</h4>
                {corporateData.addresses.map((addr, idx) => (
                    <AddressForm
                        key={addr.reporterObjId || idx}
                        address={addr}
                        basePath={`${basePath}.addresses`}
                        index={idx}
                        onAddressChange={handleAddressChange}
                        onRemoveAddress={handleRemoveAddress}
                        isOnlyAddress={corporateData.addresses.length === 1}
                    />
                ))}
                 <button type="button" onClick={handleAddAddress} className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600">
                    + הוסף כתובת
                </button>
            </div>


            {/* Phones */}
             <PhoneList
                phones={corporateData.phones}
                basePath={`${basePath}.phones`}
                onPhoneChange={handlePhoneChange}
                onAddPhone={handleAddPhone}
                onRemovePhone={handleRemovePhone}
            />

            {/* Emails */}
            <EmailList
                emails={corporateData.emails}
                basePath={`${basePath}.emails`}
                onEmailChange={handleEmailChange}
                onAddEmail={handleAddEmail}
                onRemoveEmail={handleRemoveEmail}
            />


            <TextAreaField
                label="הערות לתאגיד"
                value={corporateData.entityComment}
                onChange={(e) => onCorporateChange('entityComment', e.target.value)}
                rows={2}
            />

            {/* TODO: Entity to Entity Relations (Section 3.4.1.1) - Requires EntityRelationList component */}
            <div className="mt-4 pt-3 border-t">
                 <p className="text-sm text-gray-500"> (מקטע 'קשר ישות לישויות אחרות' יפותח בהמשך)</p>
             </div>
        </div>
    );
};

export default CorporateForm;
```javascript
// --- File: src/components/steps/InvolvedEntitiesStep.js ---
import React, { useState } from 'react';
import useReportStore, { initialPersonState, initialCorporateState } from '../../store/useReportStore';
import PersonForm from '../shared/PersonForm';
import CorporateForm from '../shared/CorporateForm';

const InvolvedEntitiesStep = () => {
    const { reportData, addItemToArray, removeItemFromArray, updateItemInArrayField, updateCheckboxGroup } = useReportStore((state) => ({
        reportData: state.reportData,
        addItemToArray: state.addItemToArray,
        removeItemFromArray: state.removeItemFromArray,
        updateItemInArrayField: state.updateItemInArrayField,
        updateCheckboxGroup: state.updateCheckboxGroup,
    }));

    const persons = reportData.irregularReportEvent.listOfInvolvedEntities.persons || [];
    const corporates = reportData.irregularReportEvent.listOfInvolvedEntities.corporates || [];

    // const [showPersonForm, setShowPersonForm] = useState(false); // To toggle visibility of new person form
    // const [showCorporateForm, setShowCorporateForm] = useState(false); // To toggle visibility of new corporate form


    const handleAddPerson = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.persons', initialPersonState());
        // setShowPersonForm(true); // Keep form open or manage visibility per item
    };

    const handleRemovePerson = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.persons', index);
    };

    const handleAddCorporate = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.corporates', initialCorporateState());
        // setShowCorporateForm(true); // Keep form open or manage visibility per item
    };

    const handleRemoveCorporate = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.corporates', index);
    };


    // Generic handler for updating fields within a person or corporate entity
    const handleEntityChange = (entityType, index, fieldPath, value) => {
        const fullPathToArray = `irregularReportEvent.listOfInvolvedEntities.${entityType}`;
        updateItemInArrayField(fullPathToArray, index, fieldPath, value);
    };

    // Handler for checkbox groups within an entity (e.g., relationsToEvent)
    const handleEntityCheckboxGroupChange = (entityType, entityIndex, groupPathInEntity, keyNameInGroup, code, isChecked) => {
        // Path to the array of entities (e.g., 'irregularReportEvent.listOfInvolvedEntities.persons')
        const pathToArrayOfEntities = `irregularReportEvent.listOfInvolvedEntities.${entityType}`;
        // Get the current entity
        const currentEntity = reportData.irregularReportEvent.listOfInvolvedEntities[entityType][entityIndex];
        // Get the current group array from the entity
        const currentGroupArray = currentEntity[groupPathInEntity] || [];
        let newGroupArray;

        if (isChecked) {
            if (!currentGroupArray.some(item => item[keyNameInGroup] === code)) {
                newGroupArray = [...currentGroupArray, { [keyNameInGroup]: code, reporterObjId: `rel_${clientSideId()}` }]; // Add reporterObjId to relation
            } else {
                newGroupArray = [...currentGroupArray];
            }
        } else {
            newGroupArray = currentGroupArray.filter(item => item[keyNameInGroup] !== code);
        }
        // Update the specific group array within the specific entity
        updateItemInArrayField(pathToArrayOfEntities, entityIndex, groupPathInEntity, newGroupArray);
    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">5. גורמים מעורבים (Involved Entities)</h2>
            <p className="text-sm text-gray-600">פרטי הגורמים המעורבים באירוע, אנשים או תאגידים.</p>

            {/* Persons Section */}
            <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-indigo-700">אנשים מעורבים (Persons)</h3>
                    <button
                        onClick={handleAddPerson}
                        className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-green-600"
                    >
                        + הוסף אדם
                    </button>
                </div>
                {persons.map((person, index) => (
                    <PersonForm
                        key={person.reporterObjId || index} // Use reporterObjId for stable key
                        personData={person}
                        personIndex={index}
                        onPersonChange={(fieldPath, value) => handleEntityChange('persons', index, fieldPath, value)}
                        onRemovePerson={() => handleRemovePerson(index)}
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) => handleEntityCheckboxGroupChange('persons', index, groupPath, keyName, code, isChecked)}
                        basePath={`irregularReportEvent.listOfInvolvedEntities.persons.${index}`}
                    />
                ))}
                {persons.length === 0 && <p className="text-xs text-gray-500">לא נוספו אנשים מעורבים.</p>}
            </div>

            {/* Corporates Section */}
            <div className="p-4 border border-gray-200 rounded-md mt-6">
                 <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-indigo-700">תאגידים מעורבים (Corporates)</h3>
                    <button
                        onClick={handleAddCorporate}
                        className="px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-purple-600"
                    >
                        + הוסף תאגיד
                    </button>
                </div>
                {corporates.map((corporate, index) => (
                     <CorporateForm
                        key={corporate.reporterObjId || index}
                        corporateData={corporate}
                        corporateIndex={index}
                        onCorporateChange={(fieldPath, value) => handleEntityChange('corporates', index, fieldPath, value)}
                        onRemoveCorporate={() => handleRemoveCorporate(index)}
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) => handleEntityCheckboxGroupChange('corporates', index, groupPath, keyName, code, isChecked)}
                        basePath={`irregularReportEvent.listOfInvolvedEntities.corporates.${index}`}
                    />
                ))}
                {corporates.length === 0 && <p className="text-xs text-gray-500">לא נוספו תאגידים מעורבים.</p>}

            </div>
        </div>
    );
};

export default InvolvedEntitiesStep;
```javascript
// --- File: src/components/steps/RelatedAccountsStep.js ---
import React from 'react';
const RelatedAccountsStep = () => <div><h2 className="text-xl font-semibold text-gray-800">6. חשבונות קשורים</h2><p className="text-gray-600 mt-4">Implementation needed for Section 3.4.2</p></div>;
export default RelatedAccountsStep;
```javascript
// --- File: src/components/steps/PledgesStep.js ---
import React from 'react';
const PledgesStep = () => <div><h2 className="text-xl font-semibold text-gray-800">7. בטוחות</h2><p className="text-gray-600 mt-4">Implementation needed for Section 3.4.3</p></div>;
export default PledgesStep;
```javascript
// --- File: src/components/steps/TransactionsStep.js ---
import React from 'react';
const TransactionsStep = () => <div><h2 className="text-xl font-semibold text-gray-800">8. פעולות ונכסים</h2><p className="text-gray-600 mt-4">Implementation needed for Section 3.4.4</p></div>;
export default TransactionsStep;
```javascript
// --- File: src/components/steps/AttachmentsStep.js ---
import React from 'react';
const AttachmentsStep = () => <div><h2 className="text-xl font-semibold text-gray-800">9. צרופות</h2><p className="text-gray-600 mt-4">Implementation needed for Section 3.4.5</p></div>;
export default AttachmentsStep;
```javascript
// --- File: src/components/steps/ReviewAndGenerateStep.js ---
import React from 'react';
const ReviewAndGenerateStep = () => <div><h2 className="text-xl font-semibold text-gray-800">10. סקירה והפקה</h2><p className="text-gray-600 mt-4">Display summary and add Generate button</p></div>;
export default ReviewAndGenerateStep;
```javascript
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

```javascript
// --- File: src/utils/xmlGenerator.js ---

/**
 * @file xmlGenerator.js
 * @description Contains logic to generate the XML string from report data,
 * aligned with irregularReport.xsd structure.
 */

// --- XML Generation Helpers ---

/**
 * Escapes special XML characters.
 * @param {*} unsafe - The value to escape. Converts non-strings to strings.
 * @returns {string} The escaped string.
 */
const escapeXml = (unsafe) => {
    if (unsafe === null || unsafe === undefined) return '';
    const str = String(unsafe);
    return str.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

/**
 * Creates an XML element string. Omits the element if the value is null, undefined, or an empty string.
 * Handles boolean conversion to '0' or '1'.
 * @param {string} name - The element name (including namespace prefix if needed).
 * @param {*} value - The value for the element.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML element string or an empty string.
 */
const createElement = (name, value, indent = '') => {
    let processedValue = value;
    // Handle boolean specifically for relevant fields based on XSD type xs:boolean
    if (typeof value === 'boolean') {
        processedValue = value ? '1' : '0';
    }

    if (processedValue === null || processedValue === undefined || processedValue === '') {
        return ''; // Omit empty/null elements
    }
    if (typeof processedValue === 'number' && !Number.isFinite(processedValue)) {
        return ''; // Omit NaN, Infinity
    }

    return `\n${indent}<${name}>${escapeXml(processedValue)}</${name}>`;
};

/**
 * Creates an XML element for linking using reporterObjId.
 * @param {string} name - The element name (e.g., 'AccountObjID', 'EntityObjID').
 * @param {string} relatedId - The reporterObjId of the linked item.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML element string or an empty string.
 */
const createLinkElement = (name, relatedId, indent = '') => {
    if (!relatedId) return '';
    // XSD uses cns:nonWhitespacesNorBlank, implying value inside tag is correct
    return createElement(name, relatedId, indent);
};


/**
 * Creates a standard Relation block (cns:Relation).
 * @param {object} relation - The relation object { relationTypeID, relatedObjID, relationTypeDesc }.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createRelationBlock = (relation, indent = '') => {
    // relatedObjID is mandatory within cns:Relation according to common.xsd (likely)
    if (!relation || !relation.relationTypeID || !relation.relatedObjID) return '';
    let block = `\n${indent}<cns:Relation>`;
    block += createElement('cns:RelationTypeID', relation.relationTypeID, indent + '  ');
    block += createElement('cns:RelatedObjID', relation.relatedObjID, indent + '  '); // Link via reporterObjId
    // Only include description if it exists (assuming 'Other' types require it)
    if (relation.relationTypeDesc) {
         block += createElement('cns:RelationTypeDesc', relation.relationTypeDesc, indent + '  ');
    }
    block += `\n${indent}</cns:Relation>`;
    return block;
};

/**
 * Creates an Address block (cns:Address).
 * @param {object} address - The address object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createAddressBlock = (address, indent = '') => {
    if (!address) return '';
    // Check for minimal required fields based on common sense/potential XSD rules
    if (!address.countryID && !address.streetName && !address.cityName && !address.houseNumber) return '';

    let block = `\n${indent}<cns:Address>`;
    // Add reporterObjId if needed by XSD linking mechanisms (unlikely for address?)
    // block += createElement('cns:ReporterObjID', address.reporterObjId, indent + '  ');
    block += createElement('cns:CountryID', address.countryID, indent + '  '); // ens:ISOCountryIDSimp
    block += createElement('cns:CityCode', address.cityCode, indent + '  ');
    block += createElement('cns:CityName', address.cityName, indent + '  ');
    block += createElement('cns:StreetCode', address.streetCode, indent + '  ');
    block += createElement('cns:StreetName', address.streetName, indent + '  ');
    block += createElement('cns:HouseNumber', address.houseNumber, indent + '  ');
    block += createElement('cns:NewZIPCode', address.newZIPCode, indent + '  ');
    block += createElement('cns:ZIPCode', address.zipCode, indent + '  ');
    // Add other fields if present in state/XSD: POBox, AppartmentNumber, StateCode, StateName, RegionCode, RegionName, AddressType
    block += `\n${indent}</cns:Address>`;
    return block;
};

/**
 * Creates a Phone block (cns:Phone).
 * @param {object} phone - The phone object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createPhoneBlock = (phone, indent = '') => {
    if (!phone || !phone.number) return ''; // Phone number is mandatory
    let block = `\n${indent}<cns:Phone>`;
    // block += createElement('cns:ReporterObjID', phone.reporterObjId, indent + '  ');
    block += createElement('cns:PhoneType', phone.phoneType, indent + '  ');
    block += createElement('cns:Number', phone.number, indent + '  ');
    block += `\n${indent}</cns:Phone>`;
    return block;
};

/**
 * Creates an Email block (cns:Email).
 * @param {object} email - The email object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createEmailBlock = (email, indent = '') => {
     if (!email || !email.emailAddress) return ''; // Email address is mandatory
    let block = `\n${indent}<cns:Email>`;
    // block += createElement('cns:ReporterObjID', email.reporterObjId, indent + '  ');
    block += createElement('cns:EmailType', email.emailType, indent + '  ');
    block += createElement('cns:EmailAddress', email.emailAddress, indent + '  ');
    block += `\n${indent}</cns:Email>`;
    return block;
};

/**
 * Creates a CurrencyInfo block (cns:CurrencyInfo).
 * @param {object} currencyInfo - The currency info object { sum, currencyType }.
 * @param {string} blockName - The name of the parent block (e.g., 'SumInNis'). NO PREFIX NEEDED HERE.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createCurrencyInfoBlock = (currencyInfo, blockName, indent = '') => {
    // SumInNis, SumInOriginalCurrency etc. are defined in targetNamespace within IrRegularTransaction
    if (!currencyInfo || currencyInfo.sum === null || currencyInfo.sum === undefined || !currencyInfo.currencyType) return '';
    let block = `\n${indent}<${blockName}>`; // No prefix for the wrapper (SumInNis, etc.)
    // Inside, the elements are from cns:CurrencyInfo type
    block += createElement('cns:CurrencyType', currencyInfo.currencyType, indent + '  '); // ens:ISOCurrencyIDSimp
    block += createElement('cns:Sum', currencyInfo.sum, indent + '  '); // Assuming integer sum based on doc
    block += `\n${indent}</${blockName}>`;
    return block;
};

/**
 * Creates a ChequeDetails block (cns:ChequeDetails).
 * @param {object} details - The cheque details object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createChequeDetailsBlock = (details, indent = '') => {
    if (!details) return '';
    // Check if any relevant field exists
    if (details.chequePaymentDate === null && details.numOfBillTransfers === null) return '';

    let block = `\n${indent}<cns:ChequeDetails>`;
    block += createElement('cns:ChequePaymentDate', details.chequePaymentDate, indent + '  '); // xs:date
    block += createElement('cns:NumOfBillTransfers', details.numOfBillTransfers, indent + '  '); // xs:integer
    block += `\n${indent}</cns:ChequeDetails>`;
    return block;
};

/**
 * Creates a CreditCardDetails block (cns:CreditCardDetails).
 * @param {object} details - The credit card details object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createCreditCardDetailsBlock = (details, indent = '') => {
    if (!details) return '';
     // Check if any relevant field exists
     if (details.creditCardBrandID === null && !details.creditCardCountryID && !details.creditCardRemark) return '';

    let block = `\n${indent}<cns:CreditCardDetails>`;
    block += createElement('cns:CreditCardBrandID', details.creditCardBrandID, indent + '  ');
    if (details.creditCardBrandID === 99 && details.creditCardBrandDesc) { // Assuming 99 is 'Other' code
        block += createElement('cns:CreditCardBrandDesc', details.creditCardBrandDesc, indent + '  ');
    }
    block += createElement('cns:CreditCardCountryID', details.creditCardCountryID, indent + '  '); // ens:ISOCountryIDSimp
    block += createElement('cns:CreditCardRemark', details.creditCardRemark, indent + '  ');
    block += `\n${indent}</cns:CreditCardDetails>`;
    return block;
};

// --- Main XML Generation Function ---

export function generateXml(reportData) {
  console.log("Generating XML for:", reportData);
  const indentStep = '  '; // 2 spaces for indentation
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;

  // Define namespaces based on the provided XSD
  const namespaces = `
    xmlns="[http://impa.lego.generic.irr.gov.il](http://impa.lego.generic.irr.gov.il)"
    xmlns:cns="[http://impa.lego.common.simple.gov.il](http://impa.lego.common.simple.gov.il)"
    xmlns:ens="[http://impa.lego.enum.simple.gov.il](http://impa.lego.enum.simple.gov.il)"
    xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"`;

  xml += `<IrRegularReport ${namespaces} Version="${escapeXml(reportData.version)}">\n`;

  // 1. ReportMetaData (cns:ReportMetaData)
  const meta = reportData.reportMetaData;
  xml += `${indentStep}<cns:ReportMetaData>`; // Element itself is cns:
  // Elements inside ReportMetaData are likely defined in common.xsd without prefix *within that type*
  // xml += createElement('cns:ReporterObjID', meta.reporterObjId, indentStep.repeat(2));
  xml += createElement('cns:ReportNumber', meta.reportNumber, indentStep.repeat(2));
  xml += createElement('cns:ReportType', meta.reportType, indentStep.repeat(2));
  xml += createElement('cns:ReportDate', meta.reportDate, indentStep.repeat(2)); // xs:date
  xml += createElement('cns:ReportDescription', meta.reportDescription, indentStep.repeat(2));
  xml += createElement('cns:ReportStatus', meta.reportStatus, indentStep.repeat(2));
  xml += createElement('cns:ReportClassification', meta.reportClassification, indentStep.repeat(2));
  xml += `\n${indentStep}</cns:ReportMetaData>\n`;

  // 2. IrRegularSourceMetaData (targetNamespace)
  const sourceMeta = reportData.irregularSourceMetaData;
  xml += `${indentStep}<IrRegularSourceMetaData>`; // No prefix
  // xml += createElement('cns:ReporterObjID', sourceMeta.reporterObjId, indentStep.repeat(2)); // Inherited from cns:BaseClass via cns:SourceMetaData
  // Elements inherited from cns:SourceMetaData (check common.xsd)
  xml += createElement('cns:SourceType', sourceMeta.sourceType, indentStep.repeat(2));
  xml += createElement('cns:SourceId', sourceMeta.sourceId, indentStep.repeat(2));
  xml += createElement('cns:BranchId', sourceMeta.branchId, indentStep.repeat(2));
  xml += createElement('cns:SourceName', sourceMeta.sourceName, indentStep.repeat(2));
  // ReportingPerson (targetNamespace)
  const rp = sourceMeta.reportingPerson;
  if (rp) {
      xml += `\n${indentStep.repeat(2)}<ReportingPerson>`; // No prefix
      // xml += createElement('cns:ReporterObjID', rp.reporterObjId, indentStep.repeat(3)); // Inherited from cns:Person via cns:BaseClass
      // Elements inherited from cns:Person
      xml += createElement('cns:IDType', rp.idType, indentStep.repeat(3));
      xml += createElement('cns:IDNumber', rp.idNumber, indentStep.repeat(3));
      xml += createElement('cns:IDCountry', rp.idCountry, indentStep.repeat(3)); // ens:ISOCountryIDSimp
      if (rp.idType === 99 && rp.idTypeDesc) {
          xml += createElement('cns:IDTypeDesc', rp.idTypeDesc, indentStep.repeat(3));
      }
      xml += createElement('cns:FirstName', rp.firstName, indentStep.repeat(3));
      xml += createElement('cns:LastName', rp.lastName, indentStep.repeat(3));
      // Phones (cns:Phones containing cns:Phone)
      if (rp.phones && rp.phones.length > 0 && rp.phones.some(p => p.number)) {
          xml += `\n${indentStep.repeat(3)}<cns:Phones>`;
          rp.phones.forEach(phone => { xml += createPhoneBlock(phone, indentStep.repeat(4)); });
          xml += `\n${indentStep.repeat(3)}</cns:Phones>`;
      }
       // Emails (cns:Emails containing cns:Email)
      if (rp.emails && rp.emails.length > 0 && rp.emails.some(e => e.emailAddress)) {
          xml += `\n${indentStep.repeat(3)}<cns:Emails>`;
           rp.emails.forEach(email => { xml += createEmailBlock(email, indentStep.repeat(4)); });
          xml += `\n${indentStep.repeat(3)}</cns:Emails>`;
      }
      // Element defined specifically in ReportingPerson type (targetNamespace)
      xml += createElement('ReportingPersonRole', rp.reportingPersonRole, indentStep.repeat(3)); // No prefix
      xml += `\n${indentStep.repeat(2)}</ReportingPerson>`;
  }
   // ManagementCompanyID is defined in IrRegularSourceMetaData (targetNamespace)
   // xml += createElement('ManagementCompanyID', sourceMeta.managementCompanyID, indentStep.repeat(2)); // Add if needed
  xml += `\n${indentStep}</IrRegularSourceMetaData>\n`;

  // 3. RelatedReports (targetNamespace)
  if (reportData.relatedReports && reportData.relatedReports.length > 0) {
      xml += `${indentStep}<RelatedReports>`; // No prefix
      reportData.relatedReports.forEach(related => {
          xml += `\n${indentStep.repeat(2)}<RelatedReport>`; // No prefix
          // xml += createElement('cns:ReporterObjID', related.reporterObjId, indentStep.repeat(3)); // Inherited from cns:BaseClass
          xml += createElement('ReportNumber', related.reportNumber, indentStep.repeat(3)); // No prefix
          // RelationsToEvent (cns:ListOfRelations)
          if (related.relationsToEvent && related.relationsToEvent.length > 0) {
              xml += `\n${indentStep.repeat(3)}<RelationsToEvent>`; // No prefix, type is cns:ListOfRelations
              related.relationsToEvent.forEach(rel => {
                   const mainEventId = reportData.irregularReportEvent?.reporterObjId;
                   if(mainEventId) {
                       // createRelationBlock handles cns:Relation structure
                       xml += createRelationBlock({ ...rel, relatedObjID: mainEventId }, indentStep.repeat(4));
                   }
              });
              xml += `\n${indentStep.repeat(3)}</RelationsToEvent>`;
          }
          xml += `\n${indentStep.repeat(2)}</RelatedReport>`;
      });
      xml += `\n${indentStep}</RelatedReports>\n`;
  }

  // 4. IrregularReportEvent (targetNamespace)
  const event = reportData.irregularReportEvent;
  xml += `${indentStep}<IrregularReportEvent>`; // No prefix
  // xml += createElement('cns:ReporterObjID', event.reporterObjId, indentStep.repeat(2)); // Inherited from cns:Event -> cns:BaseClass
  // Elements inherited from cns:Event
  xml += createElement('cns:EventDateTime', event.eventDateTime, indentStep.repeat(2)); // xs:dateTime
  // Elements defined in IrregularReportEvent
  xml += createElement('ReportingBriefContent', event.reportingBriefContent, indentStep.repeat(2)); // No prefix
  xml += createElement('ReportingContent', event.reportingContent, indentStep.repeat(2)); // No prefix, required by XSD

  // ReportingReasons (targetNamespace)
  if (event.reportingReasons && event.reportingReasons.length > 0) {
      xml += `\n${indentStep.repeat(2)}<ReportingReasons>`; // No prefix
      event.reportingReasons.forEach(reason => {
          xml += createElement('ReportingReason', reason.reportingReason, indentStep.repeat(3)); // No prefix
      });
      xml += `\n${indentStep.repeat(2)}</ReportingReasons>`;
  } else {
      // XSD requires ReportingReasons block -> sequence -> ReportingReason maxOccurs="unbounded"
      // It seems the wrapper is required, but the inner element is not if the array is empty.
       xml += `\n${indentStep.repeat(2)}<ReportingReasons />`; // Add empty if required by validation tool
  }
   if (event.reportingReasons?.some(r => r.reportingReason === 99) && event.reportingReasonDesc) {
       xml += createElement('ReportingReasonDesc', event.reportingReasonDesc, indentStep.repeat(2)); // No prefix
   }

  xml += createElement('TransactionCommitted', event.transactionCommitted, indentStep.repeat(2)); // No prefix, xs:boolean

  // AdditionalAuthoritiesCodes (targetNamespace)
  if (event.additionalAuthoritiesCodes && event.additionalAuthoritiesCodes.length > 0) {
       xml += `\n${indentStep.repeat(2)}<AdditionalAuthoritiesCodes>`; // No prefix
       event.additionalAuthoritiesCodes.forEach(auth => {
           xml += createElement('AdditionalAuthorityCode', auth.additionalAuthorityCode, indentStep.repeat(3)); // No prefix
       });
       xml += `\n${indentStep.repeat(2)}</AdditionalAuthoritiesCodes>`;
   }
    if (event.additionalAuthoritiesCodes?.some(a => a.additionalAuthorityCode === 4) && event.additionalAuthoritiesDesc) { // Assuming 4 is 'Other'
        xml += createElement('AdditionalAuthoritiesDesc', event.additionalAuthoritiesDesc, indentStep.repeat(2)); // No prefix
    }

  // IrRegularAccounts (targetNamespace, contains IrRegularAccount)
  if (event.irregularAccounts && event.irregularAccounts.length > 0) {
      xml += `\n${indentStep.repeat(2)}<IrRegularAccounts>`; // No prefix
      event.irregularAccounts.forEach(acc => {
          xml += `\n${indentStep.repeat(3)}<IrRegularAccount>`; // No prefix
          // Elements inherited from cns:Account
          // xml += createElement('cns:ReporterObjID', acc.reporterObjId, indentStep.repeat(4));
          xml += createElement('cns:FinancialInstituteType', acc.financialInstituteType, indentStep.repeat(4));
          xml += createElement('cns:FinancialInstituteCountry', acc.financialInstituteCountry, indentStep.repeat(4)); // ens:ISOCountryIDSimp
          xml += createElement('cns:FinancialInstituteID', acc.financialInstituteID, indentStep.repeat(4));
          xml += createElement('cns:FinancialInstituteName', acc.financialInstituteName, indentStep.repeat(4));
          xml += createElement('cns:BranchID', acc.branchID, indentStep.repeat(4));
          xml += createElement('cns:AccountNum', acc.accountNum, indentStep.repeat(4));
          xml += createElement('cns:AccountName', acc.accountName, indentStep.repeat(4));
          xml += createElement('cns:AccountType', acc.accountType, indentStep.repeat(4)); // Should be 77
          xml += createElement('cns:MoneyTransferCode', acc.moneyTransferCode, indentStep.repeat(4));
          xml += createElement('cns:MoneyTransferCodeType', acc.moneyTransferCodeType, indentStep.repeat(4));
          if (acc.moneyTransferCodeType === 3 && acc.moneyTransferCodeTypeDesc) { // Assuming 3 is 'Other'
               xml += createElement('cns:MoneyTransferCodeTypeDesc', acc.moneyTransferCodeTypeDesc, indentStep.repeat(4));
          }
          // RelationsToEvent (cns:ListOfRelations)
           if (acc.relationsToEvent && acc.relationsToEvent.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelationsToEvent>`; // cns prefix based on common.xsd likely type def
               acc.relationsToEvent.forEach(rel => {
                   if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(5)); }
               });
               xml += `\n${indentStep.repeat(4)}</cns:RelationsToEvent>`;
           }
           // RelatedEntities (cns:ListOfRelations)
            if (acc.relatedEntities && acc.relatedEntities.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`; // cns prefix based on common.xsd likely type def
               acc.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
               xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
           }
           // Elements specific to IrRegularAccount (targetNamespace)
           // xml += ... Loans, RelatedAccounts (check XSD/common.xsd) ...
          xml += `\n${indentStep.repeat(3)}</IrRegularAccount>`;
      });
      xml += `\n${indentStep.repeat(2)}</IrRegularAccounts>`;
  }

   // IrRegularOtherAccounts (targetNamespace, contains IrRegularOtherAccount)
   if (event.irregularOtherAccounts && event.irregularOtherAccounts.length > 0) {
       xml += `\n${indentStep.repeat(2)}<IrRegularOtherAccounts>`; // No prefix
       event.irregularOtherAccounts.forEach(acc => {
           xml += `\n${indentStep.repeat(3)}<IrRegularOtherAccount>`; // No prefix
           // Elements inherited from cns:OtherAccount
           // xml += createElement('cns:ReporterObjID', acc.reporterObjId, indentStep.repeat(4));
           xml += createElement('cns:FinancialInstituteType', acc.financialInstituteType, indentStep.repeat(4));
           xml += createElement('cns:FinancialInstituteCountry', acc.financialInstituteCountry, indentStep.repeat(4)); // ens:ISOCountryIDSimp
           xml += createElement('cns:FinancialInstituteID', acc.financialInstituteID, indentStep.repeat(4)); // Should be 1
           xml += createElement('cns:FinancialInstituteNum', acc.financialInstituteNum, indentStep.repeat(4));
           xml += createElement('cns:FinancialInstituteName', acc.financialInstituteName, indentStep.repeat(4));
           xml += createElement('cns:BranchName', acc.branchName, indentStep.repeat(4));
           xml += createElement('cns:BranchAddress', acc.branchAddress, indentStep.repeat(4));
           xml += createElement('cns:AccountNum', acc.accountNum, indentStep.repeat(4)); // Wallet Address or Account Num
           xml += createElement('cns:AccountName', acc.accountName, indentStep.repeat(4));
           xml += createElement('cns:AccountType', acc.accountType, indentStep.repeat(4));
            if (acc.accountType === 99 && acc.accountTypeDescription) { // Assuming 99 is 'Other'
               xml += createElement('cns:AccountTypeDescription', acc.accountTypeDescription, indentStep.repeat(4));
           }
           xml += createElement('cns:MoneyTransferCode', acc.moneyTransferCode, indentStep.repeat(4));
           xml += createElement('cns:MoneyTransferCodeType', acc.moneyTransferCodeType, indentStep.repeat(4));
            if (acc.moneyTransferCodeType === 3 && acc.moneyTransferCodeTypeDesc) { // Assuming 3 is 'Other'
               xml += createElement('cns:MoneyTransferCodeTypeDesc', acc.moneyTransferCodeTypeDesc, indentStep.repeat(4));
           }
            xml += createElement('cns:AccountComments', acc.accountComments, indentStep.repeat(4));
            // RelationsToEvent (cns:ListOfRelations)
            if (acc.relationsToEvent && acc.relationsToEvent.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelationsToEvent>`;
               acc.relationsToEvent.forEach(rel => {
                   if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(5)); }
               });
               xml += `\n${indentStep.repeat(4)}</cns:RelationsToEvent>`;
           }
           // RelatedEntities (cns:ListOfRelations)
            if (acc.relatedEntities && acc.relatedEntities.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`;
               acc.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
               xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
           }
           xml += `\n${indentStep.repeat(3)}</IrRegularOtherAccount>`;
       });
       xml += `\n${indentStep.repeat(2)}</IrRegularOtherAccounts>`;
   }

   // IrRegularTransactions (targetNamespace, contains IrRegularTransaction)
   if (event.irregularTransactions && event.irregularTransactions.length > 0) {
       xml += `\n${indentStep.repeat(2)}<IrRegularTransactions>`; // No prefix
       event.irregularTransactions.forEach(tx => {
           // Use IrRegularEtransaction type for NSHP sector
           xml += `\n${indentStep.repeat(3)}<IrRegularTransaction xsi:type="IrRegularEtransaction">`; // No prefix + xsi:type
           // Elements inherited from cns:Transaction -> cns:Event -> cns:BaseClass
           // xml += createElement('cns:ReporterObjID', tx.reporterObjId, indentStep.repeat(4));
           xml += createElement('cns:EventDateTime', tx.eventDateTime, indentStep.repeat(4)); // xs:dateTime
           xml += createCurrencyInfoBlock(tx.sumInNis, 'cns:SumInNis', indentStep.repeat(4)); // Wrapper has cns prefix? Check common.xsd Transaction type
           xml += createCurrencyInfoBlock(tx.sumInOriginalCurrency, 'cns:SumInOriginalCurrency', indentStep.repeat(4)); // Wrapper has cns prefix?
           xml += createCurrencyInfoBlock(tx.sumInDestinationCurrency, 'SumInDestinationCurrency', indentStep.repeat(4)); // Defined in IrRegularTransaction (no prefix)
           xml += createElement('cns:EventComment', tx.eventComment, indentStep.repeat(4));
           // RelatedEntities (cns:ListOfRelations) - Inherited from cns:Transaction? Check common.xsd
           if (tx.relatedEntities && tx.relatedEntities.length > 0) {
              xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`;
              tx.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
              xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
          }
           // Elements defined in IrRegularTransaction (targetNamespace)
           xml += createElement('TransactionIDSource', tx.transactionIDSource, indentStep.repeat(4)); // No prefix
           xml += createElement('TransactionTypeDesc', tx.transactionTypeDesc, indentStep.repeat(4)); // No prefix
           xml += createElement('TransactionReportedBefore', tx.transactionReportedBefore, indentStep.repeat(4)); // No prefix, xs:boolean
           // GrantedEventID, GrantedEventIdDesc, CourtFile are in IrRegularTransaction but maybe not for NSHP? Check guidelines.
           xml += createElement('EntityCommittedTransaction', tx.entityCommittedTransaction, indentStep.repeat(4)); // No prefix, link to Person/Corp ID
           xml += createElement('TransactionCommitted', tx.transactionCommitted, indentStep.repeat(4)); // No prefix, xs:boolean
           xml += createElement('IpAddress', tx.ipAddress, indentStep.repeat(4)); // No prefix
           xml += createElement('IMEI', tx.imei, indentStep.repeat(4)); // No prefix
           xml += createElement('TXID', tx.txid, indentStep.repeat(4)); // No prefix, Blockchain TXID
           xml += createElement('DefrayalCompanyLicenseID', tx.defrayalCompanyLicenseID, indentStep.repeat(4)); // No prefix

           // Elements specific to IrRegularEtransaction (targetNamespace)
           xml += createElement('SecondaryTransactionIDSource', tx.secondaryTransactionIDSource, indentStep.repeat(4)); // No prefix
           xml += createElement('ProviderTransactionDate', tx.providerTransactionDate, indentStep.repeat(4)); // No prefix, xs:date
           xml += createElement('ProviderTransactionType', tx.providerTransactionType, indentStep.repeat(4)); // No prefix
           xml += createElement('CreditSerialNumber', tx.creditSerialNumber, indentStep.repeat(4)); // No prefix
           xml += createElement('CreditPurposeTypeID', tx.creditPurposeTypeID, indentStep.repeat(4)); // No prefix
            if (tx.creditPurposeTypeID === 99 && tx.creditPurposeTypeDesc) { // Assuming 99 is 'Other'
               xml += createElement('CreditPurposeTypeDesc', tx.creditPurposeTypeDesc, indentStep.repeat(4)); // No prefix
           }
           xml += createElement('CreditNumOfPaymentLeft', tx.creditNumOfPaymentLeft, indentStep.repeat(4)); // No prefix
           xml += createElement('EstimatedCreditRefundDate', tx.estimatedCreditRefundDate, indentStep.repeat(4)); // No prefix, xs:date

            // IrRegularFinancialAsset (targetNamespace)
            const asset = tx.irregularFinancialAsset;
            if (asset) {
                 xml += `\n${indentStep.repeat(4)}<IrRegularFinancialAsset>`; // No prefix
                 // xml += createElement('cns:ReporterObjID', asset.reporterObjId, indentStep.repeat(5)); // Inherited from cns:BaseClass
                 xml += createElement('FinancialAssetTypeID', asset.financialAssetTypeID, indentStep.repeat(5)); // No prefix
                 if (asset.financialAssetTypeID === 13 && asset.financialAssetTypeDesc) { // Assuming 13 is 'Other'
                      xml += createElement('FinancialAssetTypeDesc', asset.financialAssetTypeDesc, indentStep.repeat(5)); // No prefix
                 }
                 xml += createElement('FinancialAssetCountry', asset.financialAssetCountry, indentStep.repeat(5)); // No prefix, type ens:ISOCountryIDSimp
                 xml += createElement('FinancialAssetStatus', asset.financialAssetStatus, indentStep.repeat(5)); // No prefix, 1 or 2
                 xml += createElement('FinancialAssetReference', asset.financialAssetReference, indentStep.repeat(5)); // No prefix
                 xml += createElement('FinancialAssetName', asset.financialAssetName, indentStep.repeat(5)); // No prefix

                 // RelatedAttachments (targetNamespace)
                 if (asset.relatedAttachments && asset.relatedAttachments.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<RelatedAttachments>`; // No prefix
                     asset.relatedAttachments.forEach(attLink => {
                          xml += createLinkElement('AttachmentObjID', attLink.attachmentObjID, indentStep.repeat(6)); // No prefix
                     });
                     xml += `\n${indentStep.repeat(5)}</RelatedAttachments>`;
                 }
                  // RelatedEntities (cns:ListOfRelations)
                 if (asset.relatedEntities && asset.relatedEntities.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<RelatedEntities>`; // No prefix, type cns:ListOfRelations
                     asset.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(6)); }); // createRelationBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</RelatedEntities>`;
                 }
                 // RelatedAccounts (targetNamespace) - Max 1
                 if (asset.relatedAccounts && asset.relatedAccounts.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<RelatedAccounts>`; // No prefix
                     xml += createLinkElement('AccountObjID', asset.relatedAccounts[0]?.accountObjID, indentStep.repeat(6)); // No prefix
                     xml += `\n${indentStep.repeat(5)}</RelatedAccounts>`;
                 }

                 // Conditional Detail Blocks (cns types)
                 if ([1, 2, 3].includes(asset.financialAssetTypeID)) { // Cheque/Bill
                     xml += createChequeDetailsBlock(asset.chequeDetails, indentStep.repeat(5)); // createChequeDetailsBlock uses cns:
                 }
                 if ([14, 16].includes(asset.financialAssetTypeID)) { // Card/Plate
                      xml += createCreditCardDetailsBlock(asset.creditCardDetails, indentStep.repeat(5)); // createCreditCardDetailsBlock uses cns:
                 }

                 xml += `\n${indentStep.repeat(4)}</IrRegularFinancialAsset>`;
            }

            // RelatedPledges (targetNamespace)
            if (tx.relatedPledges && tx.relatedPledges.length > 0) {
                 xml += `\n${indentStep.repeat(4)}<RelatedPledges>`; // No prefix
                 tx.relatedPledges.forEach(plLink => {
                      xml += createLinkElement('PledgeObjID', plLink.pledgeObjID, indentStep.repeat(5)); // No prefix
                 });
                 xml += `\n${indentStep.repeat(4)}</RelatedPledges>`;
            }


           xml += `\n${indentStep.repeat(3)}</IrRegularTransaction>`; // Close IrRegularTransaction
       });
       xml += `\n${indentStep.repeat(2)}</IrRegularTransactions>`;
   }

    // ListOfInvolvedEntities (cns:ListOfInvolvedEntities) - Appears here in XSD sequence for IrregularReportEvent
    const entities = event.listOfInvolvedEntities;
    if (entities && (entities.persons?.length > 0 || entities.corporates?.length > 0)) {
        xml += `\n${indentStep.repeat(2)}<cns:ListOfInvolvedEntities>`; // cns prefix
        // xml += createElement('cns:ReporterObjID', entities.reporterObjId, indentStep.repeat(3));

        // Persons (cns:Person)
        if (entities.persons && entities.persons.length > 0) {
            xml += `\n${indentStep.repeat(3)}<cns:Persons>`; // cns prefix
            entities.persons.forEach(person => {
                xml += `\n${indentStep.repeat(4)}<cns:Person>`; // cns prefix
                // xml += createElement('cns:ReporterObjID', person.reporterObjId, indentStep.repeat(5));
                xml += createElement('cns:IDType', person.idType, indentStep.repeat(5));
                xml += createElement('cns:IDNumber', person.idNumber, indentStep.repeat(5));
                xml += createElement('cns:IDCountry', person.idCountry, indentStep.repeat(5)); // ens:ISOCountryIDSimp
                if (person.idType === 99 && person.idTypeDesc) {
                    xml += createElement('cns:IDTypeDesc', person.idTypeDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:LastName', person.lastName, indentStep.repeat(5));
                xml += createElement('cns:FirstName', person.firstName, indentStep.repeat(5));
                xml += createElement('cns:LatinName', person.latinName, indentStep.repeat(5));
                xml += createElement('cns:LatinSurname', person.latinSurname, indentStep.repeat(5));
                xml += createElement('cns:BirthDate', person.birthDate, indentStep.repeat(5)); // xs:date
                xml += createElement('cns:EntityGender', person.entityGender, indentStep.repeat(5));
                 if (person.entityGender === 99 && person.entityGenderDesc) {
                    xml += createElement('cns:EntityGenderDesc', person.entityGenderDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:ResidenceStatus', person.residenceStatus, indentStep.repeat(5));
                 if (person.residenceStatus === 5 && person.residenceStatusDesc) { // Assuming 5 is 'Other'
                    xml += createElement('cns:ResidenceStatusDesc', person.residenceStatusDesc, indentStep.repeat(5));
                }
                 // Profession
                 if (person.professionTypeCodes && person.professionTypeCodes.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<cns:ProfessionTypeCodes>`;
                     person.professionTypeCodes.forEach(prof => {
                          xml += createElement('cns:ProfessionTypeCode', prof.professionTypeCode, indentStep.repeat(6));
                     });
                     xml += `\n${indentStep.repeat(5)}</cns:ProfessionTypeCodes>`;
                 }
                 if (person.professionTypeCodes?.some(p => p.professionTypeCode === 'xxxx') && person.profession) { // Assuming xxxx requires description
                     xml += createElement('cns:Profession', person.profession, indentStep.repeat(5));
                 }
                 // Addresses (cns:Addresses)
                 if (person.addresses && person.addresses.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<cns:Addresses>`;
                     person.addresses.forEach(addr => { xml += createAddressBlock(addr, indentStep.repeat(6)); }); // createAddressBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</cns:Addresses>`;
                 }
                 // Phones (cns:Phones)
                 if (person.phones && person.phones.length > 0 && person.phones.some(p => p.number)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Phones>`;
                     person.phones.forEach(phone => { xml += createPhoneBlock(phone, indentStep.repeat(6)); }); // createPhoneBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</cns:Phones>`;
                 }
                  // Emails (cns:Emails)
                 if (person.emails && person.emails.length > 0 && person.emails.some(e => e.emailAddress)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Emails>`;
                     person.emails.forEach(email => { xml += createEmailBlock(email, indentStep.repeat(6)); }); // createEmailBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</cns:Emails>`;
                 }
                xml += createElement('cns:EntityComment', person.entityComment, indentStep.repeat(5));
                 // RelationsToEvent (cns:ListOfRelations)
                  if (person.relationsToEvent && person.relationsToEvent.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelationsToEvent>`;
                      person.relationsToEvent.forEach(rel => {
                           if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(6)); }
                      });
                      xml += `\n${indentStep.repeat(5)}</cns:RelationsToEvent>`;
                  }
                  // RelatedEntities (cns:ListOfRelations)
                  if (person.relatedEntities && person.relatedEntities.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelatedEntities>`;
                      person.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(6)); });
                      xml += `\n${indentStep.repeat(5)}</cns:RelatedEntities>`;
                  }

                xml += `\n${indentStep.repeat(4)}</cns:Person>`;
            });
            xml += `\n${indentStep.repeat(3)}</cns:Persons>`;
        }

        // Corporates (cns:Corporate)
        if (entities.corporates && entities.corporates.length > 0) {
            xml += `\n${indentStep.repeat(3)}<cns:Corporates>`; // cns prefix
             entities.corporates.forEach(corp => {
                xml += `\n${indentStep.repeat(4)}<cns:Corporate>`; // cns prefix
                // xml += createElement('cns:ReporterObjID', corp.reporterObjId, indentStep.repeat(5));
                xml += createElement('cns:IDType', corp.idType, indentStep.repeat(5));
                xml += createElement('cns:IDNumber', corp.idNumber, indentStep.repeat(5));
                xml += createElement('cns:IDCountry', corp.idCountry, indentStep.repeat(5)); // ens:ISOCountryIDSimp
                if (corp.idType === 99 && corp.idTypeDesc) {
                    xml += createElement('cns:IDTypeDesc', corp.idTypeDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:Name', corp.name, indentStep.repeat(5));
                xml += createElement('cns:LatinName', corp.latinName, indentStep.repeat(5));
                xml += createElement('cns:FoundationDate', corp.foundationDate, indentStep.repeat(5)); // xs:date
                xml += createElement('cns:ResidenceStatus', corp.residenceStatus, indentStep.repeat(5));
                 if (corp.residenceStatus === 5 && corp.residenceStatusDesc) { // Assuming 5 is 'Other'
                    xml += createElement('cns:ResidenceStatusDesc', corp.residenceStatusDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:CorporateFieldDesc', corp.corporateFieldDesc, indentStep.repeat(5));
                // Addresses, Phones, Emails, EntityComment, RelationsToEvent, RelatedEntities (similar structure to Person, using cns:)
                 if (corp.addresses && corp.addresses.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<cns:Addresses>`;
                     corp.addresses.forEach(addr => { xml += createAddressBlock(addr, indentStep.repeat(6)); });
                     xml += `\n${indentStep.repeat(5)}</cns:Addresses>`;
                 }
                 if (corp.phones && corp.phones.length > 0 && corp.phones.some(p => p.number)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Phones>`;
                     corp.phones.forEach(phone => { xml += createPhoneBlock(phone, indentStep.repeat(6)); });
                     xml += `\n${indentStep.repeat(5)}</cns:Phones>`;
                 }
                 if (corp.emails && corp.emails.length > 0 && corp.emails.some(e => e.emailAddress)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Emails>`;
                     corp.emails.forEach(email => { xml += createEmailBlock(email, indentStep.repeat(6)); });
                     xml += `\n${indentStep.repeat(5)}</cns:Emails>`;
                 }
                xml += createElement('cns:EntityComment', corp.entityComment, indentStep.repeat(5));
                 if (corp.relationsToEvent && corp.relationsToEvent.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelationsToEvent>`;
                      corp.relationsToEvent.forEach(rel => {
                          if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(6)); }
                      });
                      xml += `\n${indentStep.repeat(5)}</cns:RelationsToEvent>`;
                  }
                  if (corp.relatedEntities && corp.relatedEntities.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelatedEntities>`;
                      corp.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(6)); });
                      xml += `\n${indentStep.repeat(5)}</cns:RelatedEntities>`;
                  }

                xml += `\n${indentStep.repeat(4)}</cns:Corporate>`;
            });
            xml += `\n${indentStep.repeat(3)}</cns:Corporates>`;
        }

        xml += `\n${indentStep.repeat(2)}</cns:ListOfInvolvedEntities>`;
    }

    // CreditCards (targetNamespace, contains cns:CreditCard) - Check if needed for NSHP sector
    // if (event.creditCards && event.creditCards.length > 0) { ... }

    // ReportKeyWordsCodes (targetNamespace)
    if (event.reportKeyWordsCodes && event.reportKeyWordsCodes.length > 0) {
        xml += `\n${indentStep.repeat(2)}<ReportKeyWordsCodes>`; // No prefix
        event.reportKeyWordsCodes.forEach(kw => {
            xml += createElement('ReportKeyWordCode', kw.reportKeyWordCode, indentStep.repeat(3)); // No prefix
        });
        xml += `\n${indentStep.repeat(2)}</ReportKeyWordsCodes>`;
    }
     if (event.reportKeyWordsCodes?.some(k => k.reportKeyWordCode === 300) && event.reportKeyWordDesc) { // Assuming 300 is 'Other'
         xml += createElement('ReportKeyWordDesc', event.reportKeyWordDesc, indentStep.repeat(2)); // No prefix
     }

    // IrRegularPledges (targetNamespace, contains IrRegularPledge)
    if (event.irregularPledges && event.irregularPledges.length > 0) {
        xml += `\n${indentStep.repeat(2)}<IrRegularPledges>`; // No prefix
        event.irregularPledges.forEach(pledge => {
            xml += `\n${indentStep.repeat(3)}<IrRegularPledge>`; // No prefix
            // Elements inherited from cns:Pledge -> cns:BaseClass
            // xml += createElement('cns:ReporterObjID', pledge.reporterObjId, indentStep.repeat(4));
            xml += createElement('cns:PledgeTypeID', pledge.pledgeTypeID, indentStep.repeat(4));
            if (pledge.pledgeTypeID === 4 && pledge.pledgeTypeDesc) { // Assuming 4 is 'Other'
                 xml += createElement('cns:PledgeTypeDesc', pledge.pledgeTypeDesc, indentStep.repeat(4));
            }
            xml += createElement('cns:SecondaryPledgeTypeID', pledge.secondaryPledgeTypeID, indentStep.repeat(4));
             if ((pledge.secondaryPledgeTypeID === 99 || pledge.secondaryPledgeTypeID === 1) && pledge.secondaryPledgeTypeDesc) { // Check 'Other' codes
                 xml += createElement('cns:SecondaryPledgeTypeDesc', pledge.secondaryPledgeTypeDesc, indentStep.repeat(4));
             }
            xml += createElement('cns:PledgeValue', pledge.pledgeValue, indentStep.repeat(4)); // NIS Amount
            xml += createElement('cns:PledgeNumber', pledge.pledgeNumber, indentStep.repeat(4)); // Cheque/Vehicle No.
            xml += createElement('cns:Year', pledge.year, indentStep.repeat(4)); // YYYY
            xml += createElement('cns:Remarks', pledge.remarks, indentStep.repeat(4));

             // Related Accounts (targetNamespace) - Max 1
             if (pledge.relatedAccounts && pledge.relatedAccounts.length > 0) {
                  xml += `\n${indentStep.repeat(4)}<RelatedAccounts>`; // No prefix
                  xml += createLinkElement('AccountObjID', pledge.relatedAccounts[0]?.accountObjID, indentStep.repeat(5)); // No prefix
                  xml += `\n${indentStep.repeat(4)}</RelatedAccounts>`;
             }
             // Related Entities (cns:ListOfRelations)
             if (pledge.relatedEntities && pledge.relatedEntities.length > 0) {
                xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`;
                pledge.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
                xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
            }
             // Related Attachments (targetNamespace)
             if (pledge.relatedAttachments && pledge.relatedAttachments.length > 0) {
                  xml += `\n${indentStep.repeat(4)}<RelatedAttachments>`; // No prefix
                  pledge.relatedAttachments.forEach(attLink => {
                       xml += createLinkElement('AttachmentObjID', attLink.attachmentObjID, indentStep.repeat(5)); // No prefix
                  });
                  xml += `\n${indentStep.repeat(4)}</RelatedAttachments>`;
             }

             // Conditional Detail Blocks (cns types)
             if (pledge.pledgeTypeID === 1) { // Cheque
                  xml += createChequeDetailsBlock(pledge.chequeDetails, indentStep.repeat(4)); // Uses cns:
             } else if (pledge.pledgeTypeID === 2) { // Real Estate
                  const rd = pledge.realEstateDetails;
                  if (rd) {
                      xml += `\n${indentStep.repeat(4)}<cns:RealEstateDetails>`; // cns:
                      xml += createElement('cns:CountryID', rd.countryID, indentStep.repeat(5)); // ens:
                      xml += createElement('cns:CityID', rd.cityID, indentStep.repeat(5));
                      xml += createElement('cns:CityName', rd.cityName, indentStep.repeat(5));
                      xml += createElement('cns:StreetID', rd.streetID, indentStep.repeat(5));
                      xml += createElement('cns:StreetName', rd.streetName, indentStep.repeat(5));
                      xml += createElement('cns:HouseNumber', rd.houseNumber, indentStep.repeat(5));
                      xml += createElement('cns:Block', rd.block, indentStep.repeat(5));
                      xml += createElement('cns:Parcel', rd.parcel, indentStep.repeat(5));
                      xml += createElement('cns:SurParcel', rd.surParcel, indentStep.repeat(5));
                      xml += createElement('cns:RightTypeID', rd.rightTypeID, indentStep.repeat(5));
                       if (rd.rightTypeID === 99 && rd.rightTypeDesc) { // Assuming 99 is 'Other'
                          xml += createElement('cns:RightTypeDesc', rd.rightTypeDesc, indentStep.repeat(5));
                      }
                      xml += `\n${indentStep.repeat(4)}</cns:RealEstateDetails>`;
                  }
             } else if (pledge.pledgeTypeID === 3) { // Vehicle
                  const cd = pledge.carDetails;
                  if (cd) {
                      xml += `\n${indentStep.repeat(4)}<cns:CarDetails>`; // cns:
                      xml += createElement('cns:Manufacturer', cd.manufacturer, indentStep.repeat(5));
                      xml += `\n${indentStep.repeat(4)}</cns:CarDetails>`;
                  }
             }

            xml += `\n${indentStep.repeat(3)}</IrRegularPledge>`;
        });
        xml += `\n${indentStep.repeat(2)}</IrRegularPledges>`;
    }

    // Attachments (targetNamespace, contains cns:Attachment) - Appears here in XSD sequence for IrregularReportEvent
    if (event.attachments && event.attachments.length > 0) {
        xml += `\n${indentStep.repeat(2)}<Attachments>`; // No prefix
        event.attachments.forEach(att => {
            xml += `\n${indentStep.repeat(3)}<cns:Attachment>`; // cns:
            // xml += createElement('cns:ReporterObjID', att.reporterObjId, indentStep.repeat(4));
            xml += createElement('cns:FileName', att.fileName, indentStep.repeat(4));
            xml += createElement('cns:DocumentType', att.documentType, indentStep.repeat(4));
             if (att.documentType === 99 && att.documentTypeDesc) { // Assuming 99 is 'Other'
                 xml += createElement('cns:DocumentTypeDesc', att.documentTypeDesc, indentStep.repeat(4));
             }
            xml += createElement('cns:NumberOfPages', att.numberOfPages, indentStep.repeat(4));
            xml += createElement('cns:Comments', att.comments, indentStep.repeat(4));
            // Add Classification if needed from XSD
            xml += `\n${indentStep.repeat(3)}</cns:Attachment>`;
        });
        xml += `\n${indentStep.repeat(2)}</Attachments>`;
    }


  xml += `\n${indentStep}</IrregularReportEvent>`;
  xml += `\n</IrRegularReport>`;

  // console.log("Generated XML String:", xml); // For debugging
  return xml;
}

```javascript
// --- File: src/utils/downloadUtils.js ---

/**
 * @file downloadUtils.js
 * @description Contains utility function for triggering file downloads.
 */

export function downloadXml(xmlString, reportNumber) {
  console.log("Attempting to download XML for report:", reportNumber);
  const filename = `IrregularReport-${reportNumber || 'UNKNOWN'}.xml`;
  try {
      const blob = new Blob([xmlString], { type: 'application/xml;charset=utf-8' }); // Specify charset
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none'; // Hide the anchor
      a.href = url;
      a.download = filename;
      document.body.appendChild(a); // Append anchor to body
      a.click(); // Programmatically click the anchor
      // Clean up: remove anchor and revoke object URL after a short delay
      window.setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          console.log("Download initiated for:", filename);
      }, 100);
  } catch (error) {
      console.error("Error generating download link:", error);
      // Provide feedback to the user if possible
      alert("An error occurred while preparing the download.");
  }
}

```javascript
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
