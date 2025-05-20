// --- File: src/store/useReportStore.js ---

/**
 * @file useReportStore.js
 * @description Defines the Zustand store for managing the report form state.
 */

import { create } from 'zustand';
import { produce } from 'immer';

// Helper function for client-side IDs
function clientSideId() {
  // Simple unique ID generator for client-side linking
  return `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Define the initial state structure as a function to ensure fresh IDs on reset
const getInitialState = () => ({
  version: "1.0",
  reportMetaData: {
    reporterObjId: clientSideId(),
    reportNumber: "",
    reportType: 2,
    reportDate: "", // YYYY-MM-DD
    reportDescription: "",
    reportStatus: 1, // Default to 'New'
    reportClassification: 10,
  },
  irregularSourceMetaData: {
    reporterObjId: clientSideId(),
    sourceType: 7,
    sourceId: "",
    sourceName: "",
    branchId: "",
    reportingPerson: {
      reporterObjId: clientSideId(),
      firstName: "",
      lastName: "",
      phones: [{ reporterObjId: clientSideId(), number: "", phoneType: null }],
      emails: [{ reporterObjId: clientSideId(), emailAddress: "", emailType: null }],
      reportingPersonRole: "",
      idNumber: "",
      idType: null,
      idTypeDesc: "",
      idCountry: "",
    },
  },
  relatedReports: [], // Array of { reporterObjId, reportNumber, relationsToEvent: [{relationTypeID}] }
  irregularReportEvent: {
    reporterObjId: clientSideId(),
    eventDateTime: "", // YYYY-MM-DD or YYYY-MM-DDThh:mm:ss
    reportingReasons: [], // Array of { reportingReason: code }
    reportingReasonDesc: "",
    reportingBriefContent: "",
    reportKeyWordsCodes: [], // Array of { reportKeyWordCode: code }
    reportKeyWordDesc: "",
    additionalAuthoritiesCodes: [], // Array of { additionalAuthorityCode: code }
    additionalAuthoritiesDesc: "",
    reportingContent: "",
    transactionCommitted: null, // Boolean 0/1
    listOfInvolvedEntities: {
      reporterObjId: clientSideId(),
      persons: [],
      corporates: [],
    },
    irregularAccounts: [],
    irregularOtherAccounts: [],
    irregularPledges: [],
    irregularTransactions: [],
    attachments: [], // Array of { reporterObjId, fileName, documentType, documentTypeDesc, numberOfPages, comments }
  },
  reporterObjId: clientSideId(), // ID for the whole reportData root object
});


// Create the Zustand store
const useReportStore = create((set, get) => ({
  reportData: getInitialState(),

  // --- Actions ---
  updateField: (path, value) => set(produce((draft) => {
    const keys = path.split('.');
    let traverser = draft.reportData;

    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];
      const nextKey = keys[i + 1];

      if (traverser[currentKey] === undefined || traverser[currentKey] === null) {
        const nextKeyIsPotentialIndex = nextKey !== undefined && /^\d+$/.test(nextKey);
        traverser[currentKey] = nextKeyIsPotentialIndex ? [] : {};
        // console.warn(`updateField: Initialized path segment ${currentKey} as ${nextKeyIsPotentialIndex ? 'array' : 'object'} at path ${path}`);
      }
      
      traverser = traverser[currentKey];

      if (typeof traverser !== 'object' || traverser === null) {
        console.error(`updateField: Path segment '${currentKey}' in path '${path}' leads to non-traversable value. Found:`, traverser);
        return; 
      }
    }
    traverser[keys[keys.length - 1]] = value;
  })),

  addItemToArray: (path, itemTemplate) => set(produce((draft) => {
    const keys = path.split('.');
    let current = draft.reportData;
    // Traverse to the parent of the target array
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
        // Initialize as an object if path segment doesn't exist or isn't an object
        // This assumes intermediate paths for addItemToArray are objects.
        // If more complex path creation is needed here, adapt updateField's logic.
        current[keys[i]] = {};
        // console.warn(`addItemToArray: Initialized object path segment ${keys[i]} at ${path}`);
      }
      current = current[keys[i]];
      if (typeof current !== 'object' || current === null) {
          console.error(`addItemToArray: Path segment ${keys[i]} in ${path} is not an object. Found:`, current);
          return;
      }
    }

    const arrayName = keys[keys.length - 1];
    // Ensure the target is an array, initialize if not
    if (!Array.isArray(current[arrayName])) {
      current[arrayName] = [];
    }
    const targetArray = current[arrayName];
    targetArray.push({ ...itemTemplate, reporterObjId: clientSideId() });
  })),

  removeItemFromArray: (path, index) => set(produce((draft) => {
    const keys = path.split('.');
    let current = draft.reportData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
        console.error(`removeItemFromArray: Path ${path} is invalid at segment ${keys[i]}. Not an object.`);
        return;
      }
      current = current[keys[i]];
    }
    const targetArray = current[keys[keys.length - 1]];
    if (Array.isArray(targetArray)) {
      if (index >= 0 && index < targetArray.length) {
        targetArray.splice(index, 1);
      } else {
        console.error(`removeItemFromArray: Invalid index ${index} for path ${path}. Array length: ${targetArray.length}`);
      }
    } else {
      console.error(`removeItemFromArray: Path ${path} does not point to an array. Found:`, targetArray);
    }
  })),
  
  updateItemInArrayField: (pathToArray, index, field, value) => set(produce((draft) => {
    const keys = pathToArray.split('.');
    let current = draft.reportData;

    for (let i = 0; i < keys.length; i++) { // Iterate to make 'current' become the array itself
        const currentKey = keys[i];
        
        if (i < keys.length -1) { 
            const nextKey = keys[i+1];
             if (current[currentKey] === undefined || current[currentKey] === null) {
                const nextKeyIsPotentialIndex = nextKey !== undefined && /^\d+$/.test(nextKey);
                current[currentKey] = nextKeyIsPotentialIndex ? [] : {};
                // console.warn(`updateItemInArrayField: Initialized path segment ${currentKey} as ${nextKeyIsPotentialIndex ? 'array' : 'object'} at ${pathToArray}`);
            }
        } else { 
            if (current[currentKey] === undefined || current[currentKey] === null) {
                 current[currentKey] = []; 
                // console.warn(`updateItemInArrayField: Initialized array ${currentKey} at ${pathToArray}`);
            }
        }

        current = current[currentKey];

        if (typeof current !== 'object' || current === null) { 
            console.error(`updateItemInArrayField: Path ${pathToArray} is invalid at segment '${keys[i]}'. Found:`, current);
            return; 
        }
    }

    if (Array.isArray(current)) {
        if (index >= 0 && index < current.length) {
            if (current[index] !== null && typeof current[index] === 'object') {
                current[index][field] = value;
            } else {
                 console.error(`updateItemInArrayField: Item at index ${index} in array at path ${pathToArray} is null or not an object. Item:`, current[index]);
            }
        } else {
             console.error(`updateItemInArrayField: Index ${index} is out of bounds for array at path ${pathToArray}. Length: ${current.length}`);
        }
    } else {
        console.error(`updateItemInArrayField: Path ${pathToArray} does not point to an array. Found type:`, typeof current);
    }
  })),

  updateCheckboxGroup: (path, keyName, code, isChecked) => set(produce((draft) => {
    const keys = path.split('.');
    let current = draft.reportData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {}; // Initialize as object if path segment doesn't exist
      }
      current = current[keys[i]];
       if (typeof current !== 'object' || current === null) {
          console.error(`updateCheckboxGroup: Path segment ${keys[i]} in ${path} is not an object. Found:`, current);
          return;
      }
    }
    
    const targetArrayPath = keys[keys.length - 1];
    if (!Array.isArray(current[targetArrayPath])) {
      current[targetArrayPath] = [];
    }
    const targetArray = current[targetArrayPath];
    const itemIndex = targetArray.findIndex(item => item && typeof item === 'object' && item[keyName] === code);

    if (isChecked) {
      if (itemIndex === -1) {
        targetArray.push({ [keyName]: code });
      }
    } else {
      if (itemIndex !== -1) {
        targetArray.splice(itemIndex, 1);
      }
    }
  })),

  resetReport: () => set({ reportData: getInitialState() }),

  getReporterObjId: (path) => {
    const keys = path.split('.');
    let current = get().reportData;
    try {
      for (let i = 0; i < keys.length; i++) {
        if (current === null || typeof current !== 'object') {
            // console.warn(`getReporterObjId: Path segment ${keys[i-1]} in ${path} is not an object or is null.`);
            return null;
        }
        current = current[keys[i]];
      }
      return current?.reporterObjId; // Access reporterObjId if current is an object, otherwise undefined (then null)
    } catch (e) {
      console.error(`getReporterObjId: Error accessing path ${path}`, e);
      return null;
    }
  },
}));

export default useReportStore;