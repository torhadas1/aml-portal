// --- File: src/store/useReportStore.js ---

/**
 * @file useReportStore.js
 * @description Defines the Zustand store for managing the report form state.
 */

import { create } from 'zustand';
import { produce } from 'immer';

// Helper function for client-side IDs
function clientSideId() {
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
    relationsToEvent: [],
    idNumber: '', idType: null, idTypeDesc: '', idCountry: '',
    lastName: '', firstName: '', latinName: '', latinSurname: '',
    birthDate: '', entityGender: null, entityGenderDesc: '',
    residenceStatus: null, residenceStatusDesc: '',
    professionTypeCodes: [], profession: '',
    addresses: [emptyAddress()], phones: [emptyPhone()], emails: [emptyEmail()],
    entityComment: '', relatedEntities: [],
});

export const initialCorporateState = () => ({
    reporterObjId: clientSideId(),
    relationsToEvent: [],
    idNumber: '', idType: null, idTypeDesc: '', idCountry: '',
    name: '', latinName: '', foundationDate: '',
    residenceStatus: null, residenceStatusDesc: '', corporateFieldDesc: '',
    addresses: [emptyAddress()], phones: [emptyPhone()], emails: [emptyEmail()],
    entityComment: '', relatedEntities: [],
});

export const initialBankAccountState = () => ({
    reporterObjId: clientSideId(), relationsToEvent: [],
    financialInstituteType: null, financialInstituteCountry: '', financialInstituteID: null,
    financialInstituteName: '', branchID: '', accountNum: '', accountName: '',
    accountType: 77, moneyTransferCode: '', moneyTransferCodeType: null, moneyTransferCodeTypeDesc: '',
    relatedEntities: [],
});

export const initialOtherAccountState = () => ({
    reporterObjId: clientSideId(), relationsToEvent: [],
    financialInstituteType: null, financialInstituteCountry: '', financialInstituteID: 1,
    financialInstituteNum: '', financialInstituteName: '', branchName: '', branchAddress: '',
    accountNum: '', accountName: '', accountType: null, accountTypeDescription: '',
    moneyTransferCode: '', moneyTransferCodeType: null, moneyTransferCodeTypeDesc: '',
    accountComments: '', relatedEntities: [],
});

export const initialPledgeState = () => ({
    reporterObjId: clientSideId(), pledgeTypeID: null, pledgeTypeDesc: '',
    secondaryPledgeTypeID: null, secondaryPledgeTypeDesc: '',
    pledgeValue: null, pledgeNumber: '', year: null, remarks: '',
    relatedAccounts: [], relatedEntities: [], relatedAttachments: [],
    chequeDetails: { chequePaymentDate: '', numOfBillTransfers: null },
    realEstateDetails: {
        countryID: '', cityID: '', cityName: '', streetID: '', streetName: '', houseNumber: '',
        block: '', parcel: '', surParcel: '', rightTypeID: null, rightTypeDesc: ''
    },
    carDetails: { manufacturer: '' },
});

export const initialFinancialAssetState = () => ({
    reporterObjId: clientSideId(), financialAssetTypeID: null, financialAssetTypeDesc: '',
    financialAssetCountry: '', financialAssetStatus: null,
    financialAssetReference: '', financialAssetName: '',
    relatedAttachments: [], relatedEntities: [], relatedAccounts: [],
    chequeDetails: { chequePaymentDate: '', numOfBillTransfers: null },
    creditCardDetails: { creditCardBrandID: null, creditCardBrandDesc: '', creditCardCountryID: '', creditCardRemark: '' },
});

export const initialTransactionState = () => ({
    reporterObjId: clientSideId(), transactionCommitted: null, transactionReportedBefore: null,
    transactionIDSource: '', secondaryTransactionIDSource: null,
    transactionType: null, transactionTypeDesc: '', eventDateTime: '',
    sumInNis: { sum: null, currencyType: "ILS" },
    sumInOriginalCurrency: { sum: null, currencyType: "" },
    sumInVirtualCurrency: { virtualCurrencyUnits: null, virtualCurrencyExchangeRate: null, virtualCurrencySymbol: '' },
    ipAddress: '', imei: '', creditSerialNumber: '', creditNumOfPaymentLeft: null,
    estimatedCreditRefundDate: '', creditPurposeTypeID: null, creditPurposeTypeDesc: '',
    providerTransactionDate: '', providerTransactionType: null, defrayalCompanyLicenseID: null,
    txid: '', eventComment: '', entityCommittedTransaction: '',
    relatedPledges: [], relatedEntities: [],
    irregularFinancialAsset: initialFinancialAssetState(),
});

export const initialAttachmentState = () => ({
    reporterObjId: clientSideId(), fileName: '', documentType: null,
    documentTypeDesc: '', numberOfPages: null, comments: '',
});

// Function to generate a fresh initial state with new IDs
const generateInitialState = () => ({
    version: "1.0",
    reportMetaData: {
        reporterObjId: clientSideId(), reportNumber: "", reportType: 2, reportDate: "",
        reportDescription: "", reportStatus: 1, reportClassification: 10,
    },
    irregularSourceMetaData: {
        reporterObjId: clientSideId(), sourceType: 7, sourceId: "", sourceName: "", branchId: "",
        reportingPerson: {
            reporterObjId: clientSideId(), firstName: "", lastName: "",
            phones: [emptyPhone()], emails: [emptyEmail()],
            reportingPersonRole: "", idNumber: "", idType: null, idTypeDesc: "", idCountry: "",
        },
    },
    relatedReports: [],
    irregularReportEvent: {
        reporterObjId: clientSideId(), eventDateTime: "",
        reportingReasons: [], reportingReasonDesc: "",
        reportingBriefContent: "", reportKeyWordsCodes: [], reportKeyWordDesc: "",
        additionalAuthoritiesCodes: [], additionalAuthoritiesDesc: "", reportingContent: "",
        transactionCommitted: null,
        listOfInvolvedEntities: { reporterObjId: clientSideId(), persons: [], corporates: [] },
        irregularAccounts: [], irregularOtherAccounts: [], irregularPledges: [],
        irregularTransactions: [], attachments: [],
    },
    reporterObjId: clientSideId(),
});

// Create the Zustand store
const useReportStore = create((set, get) => ({
    reportData: generateInitialState(), // Use the function to generate initial state
    // --- Actions ---
    updateField: (path, value) => set(produce((draft) => {
        const keys = path.split('.');
        let current = draft.reportData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (current[keys[i]] === undefined || current[keys[i]] === null) {
                const nextKeyIsIndex = !isNaN(parseInt(keys[i + 1], 10));
                current[keys[i]] = nextKeyIsIndex ? [] : {};
            }
            current = current[keys[i]];
            if (current === null || current === undefined) {
                console.error(`updateField: Path segment ${keys[i]} leads to null/undefined at ${path}`);
                return;
            }
        }
        current[keys[keys.length - 1]] = value;
    })),

    addItemToArray: (path, itemTemplateOrFunction) => set(produce((draft) => {
        const keys = path.split('.');
        let current = draft.reportData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        const targetArrayPath = keys[keys.length - 1];
        const newItem = typeof itemTemplateOrFunction === 'function' ? itemTemplateOrFunction() : { ...itemTemplateOrFunction };

        if (!current[targetArrayPath] || !Array.isArray(current[targetArrayPath])) {
            current[targetArrayPath] = []; // Ensure the array exists
        }
        const targetArray = current[targetArrayPath];

        if (!newItem.reporterObjId) { // Ensure new item gets a unique ID
            newItem.reporterObjId = clientSideId();
        }
        targetArray.push(newItem);
    })),

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

    updateItemInArrayField: (pathToArray, index, field, value) => set(produce((draft) => {
        const keys = pathToArray.split('.');
        let current = draft.reportData;
        for (let i = 0; i < keys.length; i++) {
            if (current === null || typeof current !== 'object') {
                console.error(`updateItemInArrayField: Path ${pathToArray} is invalid at segment ${keys[i - 1]}`);
                return;
            }
            if (!current[keys[i]]) {
                const nextKeyIsIndex = (i + 1 < keys.length) && !isNaN(parseInt(keys[i + 1], 10));
                current[keys[i]] = nextKeyIsIndex ? [] : {};
            }
            current = current[keys[i]];
        }
        if (Array.isArray(current) && index >= 0 && index < current.length) {
            if (current[index]) {
                const fieldKeys = field.split('.');
                let nestedCurrent = current[index];
                for (let j = 0; j < fieldKeys.length - 1; j++) {
                    if (nestedCurrent[fieldKeys[j]] === undefined || nestedCurrent[fieldKeys[j]] === null) {
                        nestedCurrent[fieldKeys[j]] = {};
                    }
                    nestedCurrent = nestedCurrent[fieldKeys[j]];
                }
                nestedCurrent[fieldKeys[fieldKeys.length - 1]] = value;
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

    updateCheckboxGroup: (path, keyName, code, isChecked) => set(produce((draft) => {
        const keys = path.split('.');
        let current = draft.reportData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        const targetArrayPath = keys[keys.length - 1];
        if (!Array.isArray(current[targetArrayPath])) {
            current[targetArrayPath] = [];
        }
        const targetArray = current[targetArrayPath];
        const itemIndex = targetArray.findIndex(item => item[keyName] === code);

        if (isChecked) {
            if (itemIndex === -1) {
                targetArray.push({ [keyName]: code, reporterObjId: clientSideId() }); // Add ID to relation items
            }
        } else {
            if (itemIndex !== -1) {
                targetArray.splice(itemIndex, 1);
            }
        }
    })),

    resetReport: () => set({ reportData: generateInitialState() }), // Use the function here

    getReporterObjId: (path) => { /* ... same as before ... */ },
    getAllEntitiesForLinking: () => { /* ... same as before ... */ },
    getAllAccountsForLinking: () => { /* ... same as before ... */ },
    getAllAttachmentsForLinking: () => { /* ... same as before ... */ },
    getAllPledgesForLinking: () => { /* ... same as before ... */ }
}));

export default useReportStore;