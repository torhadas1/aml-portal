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

const useReportStore = create((set, get) => ({
  reportData: generateInitialState(),
  updateField: (path, value) => set(produce((draft) => {
    const keys = path.split('.');
    let current = draft.reportData;
    for (let i = 0; i < keys.length - 1; i++) {
       if (current[keys[i]] === undefined || current[keys[i]] === null) {
         const nextKeyIsIndex = !isNaN(parseInt(keys[i+1], 10));
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
        current[targetArrayPath] = [];
     }
     const targetArray = current[targetArrayPath];

    if (!newItem.reporterObjId) {
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
                 console.error(`updateItemInArrayField: Path ${pathToArray} is invalid at segment ${keys[i-1]}`);
                 return;
            }
            if (!current[keys[i]]) {
                const nextKeyIsIndex = (i + 1 < keys.length) && !isNaN(parseInt(keys[i+1], 10));
                 current[keys[i]] = nextKeyIsIndex ? [] : {};
            }
            current = current[keys[i]];
        }
        if (Array.isArray(current) && index >= 0 && index < current.length) {
            if (current[index]) {
                const fieldKeys = field.split('.');
                let nestedCurrent = current[index];
                for (let j = 0; j < fieldKeys.length -1; j++) {
                    if(nestedCurrent[fieldKeys[j]] === undefined || nestedCurrent[fieldKeys[j]] === null) {
                        nestedCurrent[fieldKeys[j]] = {};
                    }
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

    updateCheckboxGroup: (path, keyName, code, isChecked) => set(produce((draft) => {
        const keys = path.split('.');
        let current = draft.reportData;
        for (let i = 0; i < keys.length - 1; i++) {
            const keySegment = keys[i];
            const nextKeySegmentIsIndex = !isNaN(parseInt(keys[i+1], 10));

            if (current[keySegment] === undefined || current[keySegment] === null) {
                current[keySegment] = nextKeySegmentIsIndex ? [] : {};
            } else if (nextKeySegmentIsIndex && !Array.isArray(current[keySegment])) {
                current[keySegment] = [];
            } else if (!nextKeySegmentIsIndex && typeof current[keySegment] !== 'object') {
                 current[keySegment] = {};
            }
            current = current[keySegment];
            if (current === null || typeof current !== 'object') {
                 console.error(`Error traversing draft for updateCheckboxGroup at ${keySegment} in path ${path}. Current became non-object.`);
                 return;
            }
        }

        const targetArrayName = keys[keys.length - 1];

        if (!Array.isArray(current[targetArrayName])) {
            current[targetArrayName] = [];
        }
        
        const targetArray = current[targetArrayName];
        const itemIndex = targetArray.findIndex(item => item[keyName] === code);

        if (isChecked) {
            if (itemIndex === -1) {
                targetArray.push({ [keyName]: code, reporterObjId: clientSideId() });
            }
        } else {
            if (itemIndex !== -1) {
                targetArray.splice(itemIndex, 1);
            }
        }
    })),

  resetReport: () => set({ reportData: generateInitialState() }),

  getReporterObjId: (path) => {
      const keys = path.split('.');
      let current = get().reportData;
      try {
          for (let i = 0; i < keys.length; i++) {
                if (current === null || typeof current !== 'object') return null;
              current = current[keys[i]];
          }
          return current?.reporterObjId;
      } catch (e) {
          // console.error(`getReporterObjId: Could not find path ${path}`);
          return null;
      }
  },
    getAllEntitiesForLinking: () => {
        const reportData = get().reportData;
        // Add guards for all levels of nesting
        const entitiesList = reportData?.irregularReportEvent?.listOfInvolvedEntities;
        if (!entitiesList) {
            return [];
        }
        const persons = (entitiesList.persons || []).map(p => ({
            id: p.reporterObjId,
            name: `${p.firstName || ''} ${p.lastName || ''} (אדם - ${p.idNumber || 'לא ידוע'})`
        }));
        const corporates = (entitiesList.corporates || []).map(c => ({
            id: c.reporterObjId,
            name: `${c.name || ''} (תאגיד - ${c.idNumber || 'לא ידוע'})`
        }));
        return [...persons, ...corporates].filter(e => e.id && e.name.trim() !== '(תאגיד - לא ידוע)' && e.name.trim() !== '(אדם - לא ידוע)');
    },
    getAllAccountsForLinking: () => {
        const eventData = get().reportData.irregularReportEvent;
        if (!eventData) return [];
        const bankAccounts = (eventData.irregularAccounts || []).map(acc => ({
            id: acc.reporterObjId,
            name: `בנק: ${acc.financialInstituteName || acc.financialInstituteID || 'לא ידוע'}, חשבון: ${acc.accountNum || 'לא ידוע'}`
        }));
        const otherAccounts = (eventData.irregularOtherAccounts || []).map(acc => ({
            id: acc.reporterObjId,
            name: `אחר: ${acc.financialInstituteName || acc.financialInstituteType || 'לא ידוע'}, חשבון/ארנק: ${acc.accountNum || 'לא ידוע'}`
        }));
        return [...bankAccounts, ...otherAccounts].filter(e => e.id);
    },
    getAllAttachmentsForLinking: () => {
        const attachments = get().reportData.irregularReportEvent?.attachments;
        if (!attachments) return [];
        return attachments.map(att => ({
            id: att.reporterObjId,
            name: `${att.fileName || 'קובץ ללא שם'} (סוג: ${att.documentType || 'לא ידוע'})`
        })).filter(e => e.id);
    },
    getAllPledgesForLinking: () => {
        const pledges = get().reportData.irregularReportEvent?.irregularPledges;
        if(!pledges) return [];
        return pledges.map(p => ({
            id: p.reporterObjId,
            name: `בטוחה: ${p.pledgeTypeID ? (p.pledgeTypeID === 1 ? 'שיק' : p.pledgeTypeID === 2 ? 'נדל"ן' : p.pledgeTypeID === 3 ? 'רכב' : 'אחר') : 'לא ידוע'} - ${p.pledgeNumber || p.pledgeValue || 'ללא מספר/ערך'}`
        })).filter(e => e.id);
    }
}));

export default useReportStore;