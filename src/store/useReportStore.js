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
export const emptyEventRelation = () => ({ reporterObjId: clientSideId(), relationTypeID: null, relationTypeDesc: '' }); // Used for entity/account/pledge relation to event


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
    birthDate: '', //YYYY-MM-DD
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
    foundationDate: '', //YYYY-MM-DD
    residenceStatus: null,
    residenceStatusDesc: '',
    corporateFieldDesc: '',
    addresses: [emptyAddress()],
    phones: [emptyPhone()],
    emails: [emptyEmail()],
    entityComment: '',
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc }
});

// Initial State for BankAccount (IrRegularAccount)
export const initialBankAccountState = () => ({
    reporterObjId: clientSideId(),
    relationsToEvent: [], // Array of { relationTypeID, relationTypeDesc }
    financialInstituteType: null, // 1 (Bank) or 6 (Post)
    financialInstituteCountry: '', // ISO Code
    financialInstituteID: null, // Bank/Post Code
    financialInstituteName: '',
    branchID: '',
    accountNum: '',
    accountName: '',
    accountType: 77, // Fixed 77 for Bank/Post
    moneyTransferCode: '',
    moneyTransferCodeType: null,
    moneyTransferCodeTypeDesc: '',
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc }
});

// Initial State for OtherAccount (IrRegularOtherAccount - Foreign/Digital)
export const initialOtherAccountState = () => ({
    reporterObjId: clientSideId(),
    relationsToEvent: [], // Array of { relationTypeID, relationTypeDesc }
    financialInstituteType: null, // 33 (Foreign) or 34 (Digital Wallet)
    financialInstituteCountry: '', // ISO Code
    financialInstituteID: 1, // Fixed to 1 for these types
    financialInstituteNum: '', // Specific ID for the foreign/digital institute
    financialInstituteName: '',
    branchName: '',
    branchAddress: '',
    accountNum: '', // Account Num or Wallet Address
    accountName: '',
    accountType: null, // Varies based on institute type (Foreign/Digital)
    accountTypeDescription: '',
    moneyTransferCode: '',
    moneyTransferCodeType: null,
    moneyTransferCodeTypeDesc: '',
    accountComments: '',
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc }
});

// Initial State for Pledge (IrRegularPledge)
export const initialPledgeState = () => ({
    reporterObjId: clientSideId(),
    pledgeTypeID: null, // 1 (Cheque), 2 (RealEstate), 3 (Vehicle), 4 (Other)
    pledgeTypeDesc: '',
    secondaryPledgeTypeID: null,
    secondaryPledgeTypeDesc: '',
    pledgeValue: null, // Amount in NIS
    pledgeNumber: '', // Cheque/Vehicle No.
    year: null, // Property Reg / Vehicle Prod YYYY
    remarks: '',
    relatedAccounts: [], // Array of { accountObjID } - Max 1 for Cheque
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc }
    relatedAttachments: [], // Array of { attachmentObjID } - Link to attachment reporterObjId
    // Conditional details
    chequeDetails: { // if pledgeTypeID === 1
        chequePaymentDate: '', //YYYY-MM-DD
        numOfBillTransfers: null,
    },
    realEstateDetails: { // if pledgeTypeID === 2
        countryID: '',
        cityID: '', // Code
        cityName: '', // Other desc
        streetID: '', // Code
        streetName: '', // Other desc
        houseNumber: '',
        block: '',
        parcel: '',
        surParcel: '',
        rightTypeID: null,
        rightTypeDesc: '',
    },
    carDetails: { // if pledgeTypeID === 3
        manufacturer: '',
        // Year for car is in the main pledge object
    },
});

// Initial State for Financial Asset (IrRegularFinancialAsset)
export const initialFinancialAssetState = () => ({
    reporterObjId: clientSideId(),
    financialAssetTypeID: null,
    financialAssetTypeDesc: '',
    financialAssetCountry: '', // ISO Code
    financialAssetStatus: null, // 1 (Received), 2 (Delivered)
    financialAssetReference: '', // Cheque/Card/Securities No.
    financialAssetName: '', // Securities Name
    relatedAttachments: [], // Array of { attachmentObjID }
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc }
    relatedAccounts: [], // Array of { accountObjID } - Max 1
    chequeDetails: {
        chequePaymentDate: '', // YYYY-MM-DD
        numOfBillTransfers: null,
    },
    creditCardDetails: {
        creditCardBrandID: null,
        creditCardBrandDesc: '',
        creditCardCountryID: '', // ISO Code
        creditCardRemark: '',
    },
});


// Initial State for Transaction (IrRegularETransaction)
export const initialTransactionState = () => ({
    reporterObjId: clientSideId(),
    transactionCommitted: null, // Boolean 0/1 (Note: Name clash with IrregularReportEvent.transactionCommitted)
                                // This one is IrRegularETransaction.TransactionCommitted
    transactionReportedBefore: null, // Boolean 0/1
    transactionIDSource: '', // Main ID
    secondaryTransactionIDSource: null, // Secondary ID
    transactionType: null, // Appendix A
    transactionTypeDesc: '',
    eventDateTime: '', // YYYY-MM-DDThh:mm:ss
    sumInNis: { sum: null, currencyType: "ILS" },
    sumInOriginalCurrency: { sum: null, currencyType: "" },
    sumInVirtualCurrency: { // Only for virtual currency transactions
        virtualCurrencyUnits: null, // Decimal (15.18)
        virtualCurrencyExchangeRate: null, // Decimal (15.18)
        virtualCurrencySymbol: '', // e.g., BTC
    },
    ipAddress: '',
    imei: '',
    creditSerialNumber: '',
    creditNumOfPaymentLeft: null,
    estimatedCreditRefundDate: '', // YYYY-MM-DD
    creditPurposeTypeID: null,
    creditPurposeTypeDesc: '',
    providerTransactionDate: '', // YYYY-MM-DD (For Tx Type 7)
    providerTransactionType: null, // For Tx Type 7
    defrayalCompanyLicenseID: null, // For Tx Type 7
    txid: '', // Blockchain Tx ID
    eventComment: '',
    entityCommittedTransaction: '', // Link to Person/Corporate reporterObjId
    relatedPledges: [], // Array of { pledgeObjID }
    relatedEntities: [], // Array of { relatedObjID, relationTypeID, relationTypeDesc } - Entity to Transaction
    irregularFinancialAsset: initialFinancialAssetState(), // Nested financial asset
});

// Initial State for Attachment
export const initialAttachmentState = () => ({
    reporterObjId: clientSideId(),
    fileName: '',
    documentType: null,
    documentTypeDesc: '',
    numberOfPages: null,
    comments: '',
});


// Define the initial state structure based on the tech spec data model
const initialState = {
  version: "1.0",
  reportMetaData: {
    reporterObjId: clientSideId(), // Add ID
    reportNumber: "",
    reportType: 2,
    reportDate: "", //YYYY-MM-DD
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
    eventDateTime: "", //YYYY-MM-DD required by spec table, but XSD allows dateTime (YYYY-MM-DDThh:mm:ss). UseYYYY-MM-DD for input.
    reportingReasons: [], // Array of { reportingReason: code }
    reportingReasonDesc: "",
    reportingBriefContent: "",
    reportKeyWordsCodes: [], // Array of { reportKeyWordCode: code }
    reportKeyWordDesc: "",
    additionalAuthoritiesCodes: [], // Array of { additionalAuthorityCode: code }
    additionalAuthoritiesDesc: "",
    reportingContent: "",
    transactionCommitted: null, // Boolean 0/1 -> Mapped to TransactionCommitted under IrregularReportEvent in XSD. This indicates if ANY transaction is reported.
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
   addItemToArray: (path, itemTemplateOrFunction) => set(produce((draft) => {
     const keys = path.split('.');
     let current = draft.reportData;
     for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) { // Create path if it doesn't exist
            current[keys[i]] = {};
        }
       current = current[keys[i]];
     }
     const targetArray = current[keys[keys.length - 1]];
     const newItem = typeof itemTemplateOrFunction === 'function' ? itemTemplateOrFunction() : { ...itemTemplateOrFunction };

     if (Array.isArray(targetArray)) {
        // Add a unique ID to the new item if it doesn't have one
        if (!newItem.reporterObjId) {
            newItem.reporterObjId = clientSideId();
        }
        targetArray.push(newItem);
     } else {
        // If the array doesn't exist, create it with the new item
        if (!newItem.reporterObjId) {
            newItem.reporterObjId = clientSideId();
        }
        current[keys[keys.length - 1]] = [newItem];
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
                // If field is a path itself (e.g., "address.streetName")
                const fieldKeys = field.split('.');
                let nestedCurrent = current[index];
                for (let j = 0; j < fieldKeys.length -1; j++) {
                    if(!nestedCurrent[fieldKeys[j]]) nestedCurrent[fieldKeys[j]] = {};
                    nestedCurrent = nestedCurrent[fieldKeys[j]];
                }
                nestedCurrent[fieldKeys[fieldKeys.length -1]] = value;
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
   // Getter to get all persons and corporates for dropdowns
    getAllEntitiesForLinking: () => {
        const state = get().reportData.irregularReportEvent.listOfInvolvedEntities;
        const persons = (state.persons || []).map(p => ({
            id: p.reporterObjId,
            name: `${p.firstName || ''} ${p.lastName || ''} (אדם - ${p.idNumber || 'לא ידוע'})`
        }));
        const corporates = (state.corporates || []).map(c => ({
            id: c.reporterObjId,
            name: `${c.name || ''} (תאגיד - ${c.idNumber || 'לא ידוע'})`
        }));
        return [...persons, ...corporates].filter(e => e.id && e.name.trim() !== '(תאגיד - לא ידוע)' && e.name.trim() !== '(אדם - לא ידוע)');
    },
     // Getter to get all accounts for linking (for pledges, transactions)
    getAllAccountsForLinking: () => {
        const eventData = get().reportData.irregularReportEvent;
        const bankAccounts = (eventData.irregularAccounts || []).map(acc => ({
            id: acc.reporterObjId,
            name: `בנק: ${acc.financialInstituteName || acc.financialInstituteID}, חשבון: ${acc.accountNum || 'לא ידוע'}`
        }));
        const otherAccounts = (eventData.irregularOtherAccounts || []).map(acc => ({
            id: acc.reporterObjId,
            name: `אחר: ${acc.financialInstituteName || acc.financialInstituteType}, חשבון/ארנק: ${acc.accountNum || 'לא ידוע'}`
        }));
        return [...bankAccounts, ...otherAccounts].filter(e => e.id);
    },
    // Getter for Attachments (for linking)
    getAllAttachmentsForLinking: () => {
        const attachments = get().reportData.irregularReportEvent.attachments || [];
        return attachments.map(att => ({
            id: att.reporterObjId,
            name: `${att.fileName || 'קובץ ללא שם'} (סוג: ${att.documentType || 'לא ידוע'})`
        })).filter(e => e.id);
    },
    // Getter for Pledges (for linking to transactions)
    getAllPledgesForLinking: () => {
        const pledges = get().reportData.irregularReportEvent.irregularPledges || [];
        return pledges.map(p => ({
            id: p.reporterObjId,
            name: `בטוחה: ${p.pledgeTypeID ? (p.pledgeTypeID === 1 ? 'שיק' : p.pledgeTypeID === 2 ? 'נדל"ן' : p.pledgeTypeID === 3 ? 'רכב' : 'אחר') : 'לא ידוע'} - ${p.pledgeNumber || p.pledgeValue || 'ללא מספר/ערך'}`
        })).filter(e => e.id);
    }
}));

export default useReportStore;