// --- File: src/components/shared/BankAccountForm.js ---
/**
 * @file BankAccountForm.js
 * @description Sub-form for Bank/Post account details (IrRegularAccount).
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxGroupField from './CheckboxGroupField';
import {
    FINANCIAL_INSTITUTE_TYPES, // Only Bank (1) and Post (6)
    BANK_CODES,
    POST_BANK_CODE,
    COUNTRY_CODES,
    MONEY_TRANSFER_CODE_TYPES,
    ACCOUNT_EVENT_RELATIONS,
    ENTITY_ACCOUNT_RELATIONS_BANK, // Use appropriate relation list
    ENTITY_ACCOUNT_RELATIONS_POST_BANK
} from '../../constants';

const BankAccountForm = ({ accountData, accountIndex, onAccountChange, onRemoveAccount, basePath }) => {
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
        if (['financialInstituteType', 'financialInstituteID', 'accountType', 'moneyTransferCodeType'].includes(field)) {
            processedValue = value ? parseInt(value, 10) : null;
        }
        onAccountChange(accountIndex, field, processedValue);
    };

    const handleEventRelationChange = (groupNameIgnored, code, isChecked) => {
        // The 'name' from CheckboxGroupField corresponds to the last segment of the path
        // basePath is 'irregularReportEvent.irregularAccounts.[accountIndex]'
        // We want to update 'irregularReportEvent.irregularAccounts.[accountIndex].relationsToEvent'
        updateCheckboxGroup(`${basePath}.relationsToEvent`, 'relationTypeID', code, isChecked);
    };


    const handleAddEntityRelation = () => {
        if (!selectedEntityForRelation || !selectedRelationType) {
            alert("אנא בחר ישות וסוג קשר.");
            return;
        }
        const newRelation = {
            reporterObjId: `rel_acct_ent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, // More unique ID
            relatedObjID: selectedEntityForRelation,
            relationTypeID: parseInt(selectedRelationType, 10),
            relationTypeDesc: '' // Add if 'Other' is selected for relationTypeID
        };
        addItemToArray(`${basePath}.relatedEntities`, newRelation);
        setSelectedEntityForRelation('');
        setSelectedRelationType('');
    };

    const handleRemoveEntityRelation = (relationIndex) => {
        removeItemFromArray(`${basePath}.relatedEntities`, relationIndex);
    };

    const selectedEventRelations = relationsToEventList.map(r => r.relationTypeID);
    const financialInstituteOptions = FINANCIAL_INSTITUTE_TYPES.filter(type => type.code === 1 || type.code === 6);
    const currentBankCodes = safeAccountData.financialInstituteType === 6 ? [POST_BANK_CODE] : BANK_CODES;

    const getEntityAccountRelations = () => {
        if (safeAccountData.financialInstituteType === 1) return ENTITY_ACCOUNT_RELATIONS_BANK;
        if (safeAccountData.financialInstituteType === 6) return ENTITY_ACCOUNT_RELATIONS_POST_BANK;
        return [];
    };


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
                חשבון בנק/דואר #{accountIndex + 1} (ID: {safeAccountData.reporterObjId?.slice(-6)})
            </h3>

            <CheckboxGroupField
                label="קשר חשבון לידיעה"
                name="relationsToEvent" // This name is used by CheckboxGroupField's internal handleChange
                options={ACCOUNT_EVENT_RELATIONS}
                selectedCodes={selectedEventRelations}
                onChange={handleEventRelationChange} // Pass our specific handler
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
                        // This onAccountChange expects to update a field directly on the account object.
                        // For an array like relationsToEvent, it should be a direct update.
                        onAccountChange(accountIndex,'relationsToEvent', updatedRelations);
                    }}
                    required={selectedEventRelations.includes(6)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField label="סוג מוסד פיננסי" value={safeAccountData.financialInstituteType ?? ''} onChange={(e) => handleChange('financialInstituteType', e.target.value)} options={financialInstituteOptions} required placeholder="בחר סוג..." />
                <SelectField label="ארץ הבנק/המוסד" value={safeAccountData.financialInstituteCountry ?? ''} onChange={(e) => handleChange('financialInstituteCountry', e.target.value)} options={COUNTRY_CODES} required placeholder="בחר מדינה..." />
                {safeAccountData.financialInstituteType && (
                    <SelectField label="מספר בנק/מוסד" value={safeAccountData.financialInstituteID ?? ''} onChange={(e) => handleChange('financialInstituteID', e.target.value)} options={currentBankCodes} required placeholder="בחר בנק..." />
                )}
                <InputField label="שם בנק/מוסד (אופציונלי אם נבחר קוד)" value={safeAccountData.financialInstituteName ?? ''} onChange={(e) => handleChange('financialInstituteName', e.target.value)} />
                <InputField label="מספר סניף" value={safeAccountData.branchID ?? ''} onChange={(e) => handleChange('branchID', e.target.value)} required />
                <InputField label="מספר חשבון" value={safeAccountData.accountNum ?? ''} onChange={(e) => handleChange('accountNum', e.target.value)} required />
                <InputField label="שם חשבון (כפי שמופיע בבנק)" value={safeAccountData.accountName ?? ''} onChange={(e) => handleChange('accountName', e.target.value)} />
                <InputField label="סוג חשבון (קבוע 77)" value={safeAccountData.accountType ?? 77} readOnly />
                <InputField label="קוד העברת כספים (IBAN/BIC)" value={safeAccountData.moneyTransferCode ?? ''} onChange={(e) => handleChange('moneyTransferCode', e.target.value)} />
                <SelectField label="סוג קוד העברת כספים" value={safeAccountData.moneyTransferCodeType ?? ''} onChange={(e) => handleChange('moneyTransferCodeType', e.target.value)} options={MONEY_TRANSFER_CODE_TYPES} placeholder="בחר סוג קוד..." />
                {safeAccountData.moneyTransferCodeType === 3 && (
                    <InputField label="פירוט סוג קוד - אחר" value={safeAccountData.moneyTransferCodeTypeDesc ?? ''} onChange={(e) => handleChange('moneyTransferCodeTypeDesc', e.target.value)} required />
                )}
            </div>

             {/* Related Entities to Account */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">ישויות קשורות לחשבון</h4>
                {relatedEntitiesList.map((rel, relIdx) => (
                    <div key={rel.reporterObjId || relIdx} className="flex items-center justify-between p-2 border-b">
                        <span>
                            {allEntities.find(e => e.id === rel.relatedObjID)?.name || rel.relatedObjID}
                            {' - '}
                            {getEntityAccountRelations().find(r => r.code === rel.relationTypeID)?.description || rel.relationTypeID}
                            {rel.relationTypeDesc ? ` (${rel.relationTypeDesc})` : ''}
                        </span>
                        <button type="button" onClick={() => handleRemoveEntityRelation(relIdx)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <div className="flex items-end gap-2 mt-2">
                    <SelectField className="flex-grow mb-0" label="בחר ישות קיימת" value={selectedEntityForRelation} onChange={(e) => setSelectedEntityForRelation(e.target.value)} options={allEntities.map(e => ({ code: e.id, description: e.name }))} placeholder="בחר ישות..." />
                    <SelectField className="flex-grow mb-0" label="סוג קשר לחשבון" value={selectedRelationType} onChange={(e) => setSelectedRelationType(e.target.value)} options={getEntityAccountRelations()} placeholder="בחר קשר..." />
                    <button type="button" onClick={handleAddEntityRelation} className="px-3 py-2 bg-blue-500 text-white text-xs rounded-md whitespace-nowrap self-end mb-0">הוסף קשר ישות</button>
                </div>
                 {/* TODO: Add 'Other' description for entity-account relation if needed */}
            </div>
        </div>
    );
};
export default BankAccountForm;