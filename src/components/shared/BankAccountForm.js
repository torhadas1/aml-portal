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

    const handleEventRelationChange = (groupName, code, isChecked) => {
        const path = `${basePath}.relationsToEvent`; // This is the direct path to the array
        updateCheckboxGroup(path, 'relationTypeID', code, isChecked);
    };

    const handleAddEntityRelation = () => {
        if (!selectedEntityForRelation || !selectedRelationType) {
            alert("אנא בחר ישות וסוג קשר.");
            return;
        }
        const newRelation = {
            reporterObjId: `rel_${Date.now()}`, // Unique ID for the relation itself
            relatedObjID: selectedEntityForRelation, // ID of the Person/Corporate
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

    const selectedEventRelations = accountData.relationsToEvent?.map(r => r.relationTypeID) || [];
    const financialInstituteOptions = FINANCIAL_INSTITUTE_TYPES.filter(type => type.code === 1 || type.code === 6);
    const currentBankCodes = accountData.financialInstituteType === 6 ? [POST_BANK_CODE] : BANK_CODES;

    const getEntityAccountRelations = () => {
        if (accountData.financialInstituteType === 1) return ENTITY_ACCOUNT_RELATIONS_BANK;
        if (accountData.financialInstituteType === 6) return ENTITY_ACCOUNT_RELATIONS_POST_BANK;
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
                חשבון בנק/דואר #{accountIndex + 1} (ID: {accountData.reporterObjId?.slice(-6)})
            </h3>

            <CheckboxGroupField
                label="קשר חשבון לידיעה"
                name="relationsToEvent" // Path relative to this specific account
                options={ACCOUNT_EVENT_RELATIONS}
                selectedCodes={selectedEventRelations}
                onChange={(groupNameIgnored, code, isChecked) => handleEventRelationChange(`${basePath}.relationsToEvent`, code, isChecked)}
                required
            />
            {selectedEventRelations.includes(6) && ( // Assuming 6 is 'Other'
                <InputField
                    label="פירוט קשר חשבון לידיעה - אחר"
                    value={accountData.relationsToEvent?.find(r => r.relationTypeID === 6)?.relationTypeDesc || ''}
                    onChange={(e) => {
                         const updatedRelations = accountData.relationsToEvent.map(r =>
                            r.relationTypeID === 6 ? { ...r, relationTypeDesc: e.target.value } : r
                        );
                        onAccountChange(accountIndex,'relationsToEvent', updatedRelations);
                    }}
                    required={selectedEventRelations.includes(6)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField label="סוג מוסד פיננסי" value={accountData.financialInstituteType} onChange={(e) => handleChange('financialInstituteType', e.target.value)} options={financialInstituteOptions} required placeholder="בחר סוג..." />
                <SelectField label="ארץ הבנק/המוסד" value={accountData.financialInstituteCountry} onChange={(e) => handleChange('financialInstituteCountry', e.target.value)} options={COUNTRY_CODES} required placeholder="בחר מדינה..." />
                {accountData.financialInstituteType && (
                    <SelectField label="מספר בנק/מוסד" value={accountData.financialInstituteID} onChange={(e) => handleChange('financialInstituteID', e.target.value)} options={currentBankCodes} required placeholder="בחר בנק..." />
                )}
                <InputField label="שם בנק/מוסד (אופציונלי אם נבחר קוד)" value={accountData.financialInstituteName} onChange={(e) => handleChange('financialInstituteName', e.target.value)} />
                <InputField label="מספר סניף" value={accountData.branchID} onChange={(e) => handleChange('branchID', e.target.value)} required />
                <InputField label="מספר חשבון" value={accountData.accountNum} onChange={(e) => handleChange('accountNum', e.target.value)} required />
                <InputField label="שם חשבון (כפי שמופיע בבנק)" value={accountData.accountName} onChange={(e) => handleChange('accountName', e.target.value)} />
                <InputField label="סוג חשבון (קבוע 77)" value={accountData.accountType} readOnly />
                <InputField label="קוד העברת כספים (IBAN/BIC)" value={accountData.moneyTransferCode} onChange={(e) => handleChange('moneyTransferCode', e.target.value)} />
                <SelectField label="סוג קוד העברת כספים" value={accountData.moneyTransferCodeType} onChange={(e) => handleChange('moneyTransferCodeType', e.target.value)} options={MONEY_TRANSFER_CODE_TYPES} placeholder="בחר סוג קוד..." />
                {accountData.moneyTransferCodeType === 3 && (
                    <InputField label="פירוט סוג קוד - אחר" value={accountData.moneyTransferCodeTypeDesc} onChange={(e) => handleChange('moneyTransferCodeTypeDesc', e.target.value)} required />
                )}
            </div>

             {/* Related Entities to Account */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">ישויות קשורות לחשבון</h4>
                {accountData.relatedEntities?.map((rel, relIdx) => (
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