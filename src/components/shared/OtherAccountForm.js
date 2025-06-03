// --- File: src/components/shared/OtherAccountForm.js ---
/**
 * @file OtherAccountForm.js
 * @description Sub-form for Foreign Financial Institute / Digital Wallet accounts (IrRegularOtherAccount).
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxGroupField from './CheckboxGroupField';
import {
    FINANCIAL_INSTITUTE_TYPES, // Filter for 33, 34
    COUNTRY_CODES,
    FOREIGN_ACCOUNT_TYPES,
    DIGITAL_WALLET_TYPES,
    MONEY_TRANSFER_CODE_TYPES,
    ACCOUNT_EVENT_RELATIONS,
    ENTITY_ACCOUNT_RELATIONS_FOREIGN_DIGITAL
} from '../../constants';

const OtherAccountForm = ({ accountData, accountIndex, onAccountChange, onRemoveAccount, basePath }) => {
    // Ensure accountData and its nested properties are defined before use
    const safeAccountData = accountData || {};
    const relatedEntitiesList = safeAccountData.relatedEntities || []; // Default to empty array
    const relationsToEventList = safeAccountData.relationsToEvent || []; // Default to empty array

    const { updateItemInArrayField, updateCheckboxGroup, addItemToArray, removeItemFromArray, getAllEntitiesForLinking } = useReportStore();
    const [selectedEntityForRelation, setSelectedEntityForRelation] = useState('');
    const [selectedRelationType, setSelectedRelationType] = useState('');

    const allEntities = getAllEntitiesForLinking();

    const handleChange = (field, value) => {
        let processedValue = value;
        if (['financialInstituteType', 'accountType', 'moneyTransferCodeType'].includes(field)) {
            processedValue = value ? parseInt(value, 10) : null;
        }
        // financialInstituteID is fixed to 1 for these types
        if (field === 'financialInstituteType') {
             onAccountChange(accountIndex, 'financialInstituteID', 1);
        }
        onAccountChange(accountIndex, field, processedValue);
    };

    const handleEventRelationChange = (groupNameIgnored, code, isChecked) => {
        updateCheckboxGroup(`${basePath}.relationsToEvent`, 'relationTypeID', code, isChecked);
    };
     const handleAddEntityRelation = () => {
        if (!selectedEntityForRelation || !selectedRelationType) {
            alert("אנא בחר ישות וסוג קשר.");
            return;
        }
        const newRelation = {
            reporterObjId: `rel_otheracct_ent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            relatedObjID: selectedEntityForRelation,
            relationTypeID: parseInt(selectedRelationType, 10),
            relationTypeDesc: '' // Add if 'Other' is selected
        };
        addItemToArray(`${basePath}.relatedEntities`, newRelation);
        setSelectedEntityForRelation('');
        setSelectedRelationType('');
    };
    const handleRemoveEntityRelation = (relationIndex) => {
        removeItemFromArray(`${basePath}.relatedEntities`, relationIndex);
    };


    const selectedEventRelations = relationsToEventList.map(r => r.relationTypeID);
    const financialInstituteOptions = FINANCIAL_INSTITUTE_TYPES.filter(type => type.code === 33 || type.code === 34);
    const currentAccountTypeOptions = safeAccountData.financialInstituteType === 33 ? FOREIGN_ACCOUNT_TYPES :
                                     safeAccountData.financialInstituteType === 34 ? DIGITAL_WALLET_TYPES : [];


    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
             <button
                type="button"
                onClick={onRemoveAccount}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="הסר חשבון"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                חשבון חו"ל / ארנק דיגיטלי #{accountIndex + 1} (ID: {safeAccountData.reporterObjId?.slice(-6)})
            </h3>

            <CheckboxGroupField
                label="קשר חשבון לידיעה"
                name="relationsToEvent" // Will be part of the path constructed by handleEventRelationChange
                options={ACCOUNT_EVENT_RELATIONS}
                selectedCodes={selectedEventRelations}
                onChange={handleEventRelationChange}
                required
            />
             {selectedEventRelations.includes(6) && ( // Assuming 6 is 'Other'
                <InputField
                    label="פירוט קשר חשבון לידיעה - אחר"
                    value={relationsToEventList.find(r => r.relationTypeID === 6)?.relationTypeDesc || ''}
                     onChange={(e) => {
                         const updatedRelations = relationsToEventList.map(r =>
                            r.relationTypeID === 6 ? { ...r, relationTypeDesc: e.target.value } : r
                        );
                        onAccountChange(accountIndex,'relationsToEvent', updatedRelations);
                    }}
                    required={selectedEventRelations.includes(6)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField label="סוג מוסד פיננסי" value={safeAccountData.financialInstituteType ?? ''} onChange={(e) => handleChange('financialInstituteType', e.target.value)} options={financialInstituteOptions} required placeholder="בחר סוג..." />
                <SelectField label="ארץ המוסד הפיננסי" value={safeAccountData.financialInstituteCountry ?? ''} onChange={(e) => handleChange('financialInstituteCountry', e.target.value)} options={COUNTRY_CODES} placeholder="בחר מדינה..." />
                {/* financialInstituteID is fixed to 1 for these types and set in handleChange */}
                <InputField label="מזהה מוסד פיננסי (BIC/SWIFT/LEI/ID)" value={safeAccountData.financialInstituteNum ?? ''} onChange={(e) => handleChange('financialInstituteNum', e.target.value)} required />
                <InputField label="שם מוסד פיננסי" value={safeAccountData.financialInstituteName ?? ''} onChange={(e) => handleChange('financialInstituteName', e.target.value)} required />

                <InputField label="שם סניף (אם רלוונטי)" value={safeAccountData.branchName ?? ''} onChange={(e) => handleChange('branchName', e.target.value)} />
                <InputField label="כתובת הסניף (אם רלוונטי)" value={safeAccountData.branchAddress ?? ''} onChange={(e) => handleChange('branchAddress', e.target.value)} />

                <InputField label="מספר חשבון / כתובת ארנק" value={safeAccountData.accountNum ?? ''} onChange={(e) => handleChange('accountNum', e.target.value)} required />
                <InputField label="שם חשבון / ארנק" value={safeAccountData.accountName ?? ''} onChange={(e) => handleChange('accountName', e.target.value)} />

                <SelectField
                    label="סוג חשבון / סוג ארנק דיגיטלי"
                    value={safeAccountData.accountType ?? ''}
                    onChange={(e) => handleChange('accountType', e.target.value)}
                    options={currentAccountTypeOptions}
                    required
                    placeholder="בחר סוג חשבון/ארנק..."
                />
                {safeAccountData.accountType === 99 && (
                     <InputField label="פירוט סוג חשבון/ארנק - אחר" value={safeAccountData.accountTypeDescription ?? ''} onChange={(e) => handleChange('accountTypeDescription', e.target.value)} required />
                )}

                <InputField label="קוד העברת כספים (IBAN/BIC)" value={safeAccountData.moneyTransferCode ?? ''} onChange={(e) => handleChange('moneyTransferCode', e.target.value)} />
                <SelectField label="סוג קוד העברת כספים" value={safeAccountData.moneyTransferCodeType ?? ''} onChange={(e) => handleChange('moneyTransferCodeType', e.target.value)} options={MONEY_TRANSFER_CODE_TYPES} placeholder="בחר סוג קוד..." />
                {safeAccountData.moneyTransferCodeType === 3 && (
                    <InputField label="פירוט סוג קוד - אחר" value={safeAccountData.moneyTransferCodeTypeDesc ?? ''} onChange={(e) => handleChange('moneyTransferCodeTypeDesc', e.target.value)} required />
                )}
                 <InputField label="הערות לחשבון" value={safeAccountData.accountComments ?? ''} onChange={(e) => handleChange('accountComments', e.target.value)} />
            </div>

             {/* Related Entities to Account */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">ישויות קשורות לחשבון</h4>
                {relatedEntitiesList.map((rel, relIdx) => (
                    <div key={rel.reporterObjId || relIdx} className="flex items-center justify-between p-2 border-b">
                        <span>
                            {allEntities.find(e => e.id === rel.relatedObjID)?.name || rel.relatedObjID}
                            {' - '}
                            {ENTITY_ACCOUNT_RELATIONS_FOREIGN_DIGITAL.find(r => r.code === rel.relationTypeID)?.description || rel.relationTypeID}
                             {rel.relationTypeDesc ? ` (${rel.relationTypeDesc})` : ''}
                        </span>
                        <button type="button" onClick={() => handleRemoveEntityRelation(relIdx)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <div className="flex items-end gap-2 mt-2">
                    <SelectField className="flex-grow mb-0" label="בחר ישות קיימת" value={selectedEntityForRelation} onChange={(e) => setSelectedEntityForRelation(e.target.value)} options={allEntities.map(e => ({ code: e.id, description: e.name }))} placeholder="בחר ישות..." />
                    <SelectField className="flex-grow mb-0" label="סוג קשר לחשבון" value={selectedRelationType} onChange={(e) => setSelectedRelationType(e.target.value)} options={ENTITY_ACCOUNT_RELATIONS_FOREIGN_DIGITAL} placeholder="בחר קשר..." />
                    <button type="button" onClick={handleAddEntityRelation} className="px-3 py-2 bg-blue-500 text-white text-xs rounded-md whitespace-nowrap self-end mb-0">הוסף קשר ישות</button>
                </div>
                 {/* TODO: Add 'Other' description for entity-account relation if relation type is 'Other' */}
            </div>
        </div>
    );
};
export default OtherAccountForm;