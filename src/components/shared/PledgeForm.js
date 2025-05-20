// --- File: src/components/shared/PledgeForm.js ---
/**
 * @file PledgeForm.js
 * @description Sub-form for individual Pledge details.
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from './InputField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField'; // Assuming you have this
import {
    PLEDGE_TYPES,
    SECONDARY_PLEDGE_TYPES_CHEQUE,
    SECONDARY_PLEDGE_TYPES_REAL_ESTATE,
    SECONDARY_PLEDGE_TYPES_VEHICLE,
    SECONDARY_PLEDGE_TYPES_OTHER,
    COUNTRY_CODES,
    REAL_ESTATE_RIGHT_TYPES,
    ENTITY_PLEDGE_RELATIONS
} from '../../constants';

const PledgeForm = ({ pledgeData, pledgeIndex, onPledgeChange, onRemovePledge, basePath }) => {
    const { updateItemInArrayField, addItemToArray, removeItemFromArray, getAllEntitiesForLinking, getAllAccountsForLinking } = useReportStore();

    const [selectedEntityForRelation, setSelectedEntityForRelation] = useState('');
    const [selectedRelationTypeToEntity, setSelectedRelationTypeToEntity] = useState('');
    const [selectedAccountForRelation, setSelectedAccountForRelation] = useState('');
    // TODO: Add state for selectedAttachmentForRelation and logic

    const allEntities = getAllEntitiesForLinking();
    const allAccounts = getAllAccountsForLinking();


    const handleChange = (field, value) => {
        let processedValue = value;
        if (['pledgeTypeID', 'secondaryPledgeTypeID', 'pledgeValue', 'year', 'rightTypeID', 'numOfBillTransfers'].includes(field)) {
            processedValue = value ? parseInt(value, 10) : (value === '' ? null : value); // Allow empty for optional numbers
        }
        onPledgeChange(pledgeIndex, field, processedValue);

        // Reset conditional fields if primary type changes
        if (field === 'pledgeTypeID') {
            onPledgeChange(pledgeIndex, 'secondaryPledgeTypeID', null);
            onPledgeChange(pledgeIndex, 'secondaryPledgeTypeDesc', '');
            onPledgeChange(pledgeIndex, 'chequeDetails', { chequePaymentDate: '', numOfBillTransfers: null });
            onPledgeChange(pledgeIndex, 'realEstateDetails', { countryID: '', cityID: '', cityName: '', streetID: '', streetName: '', houseNumber: '', block: '', parcel: '', surParcel: '', rightTypeID: null, rightTypeDesc: '' });
            onPledgeChange(pledgeIndex, 'carDetails', { manufacturer: '' });
        }
        if (field === 'secondaryPledgeTypeID' && value !== 99 && value !== 1) { // Code 1 for 'Other general' could still need desc
             onPledgeChange(pledgeIndex, 'secondaryPledgeTypeDesc', '');
        }
         if (field === 'rightTypeID' && value !== 99) {
             onPledgeChange(pledgeIndex, 'realEstateDetails.rightTypeDesc', '');
        }
    };

    const handleConditionalDetailChange = (detailType, field, value) => {
        onPledgeChange(pledgeIndex, `${detailType}.${field}`, value);
    };

     const handleAddEntityRelation = () => {
        if (!selectedEntityForRelation || !selectedRelationTypeToEntity) {
            alert("אנא בחר ישות וסוג קשר.");
            return;
        }
        const newRelation = {
            reporterObjId: `rel_ent_${Date.now()}`,
            relatedObjID: selectedEntityForRelation,
            relationTypeID: parseInt(selectedRelationTypeToEntity, 10),
            relationTypeDesc: '' // Handle if 'Other' is selected for relationType
        };
        addItemToArray(`${basePath}.relatedEntities`, newRelation);
        setSelectedEntityForRelation('');
        setSelectedRelationTypeToEntity('');
    };
    const handleRemoveEntityRelation = (relationIndex) => {
        removeItemFromArray(`${basePath}.relatedEntities`, relationIndex);
    };

    const handleAddAccountRelation = () => {
        if (!selectedAccountForRelation) {
            alert("אנא בחר חשבון.");
            return;
        }
        // Per spec 3.4.3.1, only one accountObjID can be linked.
        // We'll overwrite if it exists, or add if it doesn't.
        const newAccountRelation = { accountObjID: selectedAccountForRelation };
        onPledgeChange(pledgeIndex, 'relatedAccounts', [newAccountRelation]); // Store as an array with one item
        setSelectedAccountForRelation('');
    };
     const handleRemoveAccountRelation = (relationIndex) => { // Index will always be 0
        onPledgeChange(pledgeIndex, 'relatedAccounts', []);
    };


    const getSecondaryPledgeOptions = () => {
        switch (pledgeData.pledgeTypeID) {
            case 1: return SECONDARY_PLEDGE_TYPES_CHEQUE;
            case 2: return SECONDARY_PLEDGE_TYPES_REAL_ESTATE;
            case 3: return SECONDARY_PLEDGE_TYPES_VEHICLE;
            case 4: return SECONDARY_PLEDGE_TYPES_OTHER;
            default: return [];
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
            <button
                type="button"
                onClick={onRemovePledge}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="הסר בטוחה"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                בטוחה #{pledgeIndex + 1} (ID: {pledgeData.reporterObjId?.slice(-6)})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField label="סוג הבטוחה" value={pledgeData.pledgeTypeID} onChange={(e) => handleChange('pledgeTypeID', e.target.value)} options={PLEDGE_TYPES} required placeholder="בחר סוג בטוחה..." />
                {pledgeData.pledgeTypeID === 4 && (
                    <InputField label="פירוט סוג בטוחה - אחר" value={pledgeData.pledgeTypeDesc} onChange={(e) => handleChange('pledgeTypeDesc', e.target.value)} required />
                )}

                {pledgeData.pledgeTypeID && (
                    <SelectField label="תת סוג בטוחה" value={pledgeData.secondaryPledgeTypeID} onChange={(e) => handleChange('secondaryPledgeTypeID', e.target.value)} options={getSecondaryPledgeOptions()} placeholder="בחר תת סוג..." />
                )}
                {((pledgeData.secondaryPledgeTypeID === 99) || (pledgeData.pledgeTypeID === 4 && pledgeData.secondaryPledgeTypeID === 1)) && (
                     <InputField label="פירוט תת סוג בטוחה - אחר" value={pledgeData.secondaryPledgeTypeDesc} onChange={(e) => handleChange('secondaryPledgeTypeDesc', e.target.value)} required />
                )}

                <InputField label="שווי כספי/מוערך בשח של הבטוחה" type="number" value={pledgeData.pledgeValue} onChange={(e) => handleChange('pledgeValue', e.target.value)} />
                <InputField label="מספר בטוחה (מספר שיק/רישוי רכב)" value={pledgeData.pledgeNumber} onChange={(e) => handleChange('pledgeNumber', e.target.value)} />
                 {(pledgeData.pledgeTypeID === 2 || pledgeData.pledgeTypeID === 3) && ( // Year for Real Estate or Vehicle
                     <InputField label="שנה (רישום נכס/עלייה לכביש)" type="number" placeholder="YYYY" value={pledgeData.year} onChange={(e) => handleChange('year', e.target.value)} />
                 )}
            </div>

            {/* Conditional Cheque Details */}
            {pledgeData.pledgeTypeID === 1 && (
                <div className="mt-4 pt-3 border-t">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">פרטי שיק</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <InputField label="תאריך פירעון השיק/השטר" type="date" value={pledgeData.chequeDetails?.chequePaymentDate} onChange={(e) => handleConditionalDetailChange('chequeDetails', 'chequePaymentDate', e.target.value)} />
                        <InputField label="מספר הסבות בשיק/שטר" type="number" value={pledgeData.chequeDetails?.numOfBillTransfers} onChange={(e) => handleConditionalDetailChange('chequeDetails', 'numOfBillTransfers', e.target.value)} />
                    </div>
                </div>
            )}

            {/* Conditional Real Estate Details */}
            {pledgeData.pledgeTypeID === 2 && (
                <div className="mt-4 pt-3 border-t">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">פרטי נדל"ן</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <SelectField label="מדינה (מיקום הנדלן)" value={pledgeData.realEstateDetails?.countryID} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'countryID', e.target.value)} options={COUNTRY_CODES} placeholder="בחר מדינה..." />
                        <InputField label="ישוב - אחר (אם לא נמצא קוד)" value={pledgeData.realEstateDetails?.cityName} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'cityName', e.target.value)} placeholder="שם הישוב" />
                        <InputField label="רחוב - אחר (אם לא נמצא קוד)" value={pledgeData.realEstateDetails?.streetName} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'streetName', e.target.value)} placeholder="שם הרחוב" />
                        <InputField label="מספר בית" value={pledgeData.realEstateDetails?.houseNumber} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'houseNumber', e.target.value)} />
                        <InputField label="גוש" value={pledgeData.realEstateDetails?.block} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'block', e.target.value)} />
                        <InputField label="חלקה" value={pledgeData.realEstateDetails?.parcel} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'parcel', e.target.value)} />
                        <InputField label="תת חלקה" value={pledgeData.realEstateDetails?.surParcel} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'surParcel', e.target.value)} />
                        <SelectField label="סוג זכות בנכס" value={pledgeData.realEstateDetails?.rightTypeID} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'rightTypeID', e.target.value ? parseInt(e.target.value,10) : null)} options={REAL_ESTATE_RIGHT_TYPES} placeholder="בחר סוג זכות..." />
                        {pledgeData.realEstateDetails?.rightTypeID === 99 && (
                            <InputField label="פירוט סוג זכות - אחר" value={pledgeData.realEstateDetails?.rightTypeDesc} onChange={(e) => handleConditionalDetailChange('realEstateDetails', 'rightTypeDesc', e.target.value)} required />
                        )}
                    </div>
                </div>
            )}

            {/* Conditional Vehicle Details */}
            {pledgeData.pledgeTypeID === 3 && (
                 <div className="mt-4 pt-3 border-t">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">פרטי כלי תחבורה</h4>
                    <InputField label="שם יצרן" value={pledgeData.carDetails?.manufacturer} onChange={(e) => handleConditionalDetailChange('carDetails', 'manufacturer', e.target.value)} />
                    {/* Year is handled by the main pledgeData.year field */}
                </div>
            )}

            <TextAreaField label="הערות לבטוחה" value={pledgeData.remarks} onChange={(e) => handleChange('remarks', e.target.value)} rows={2} />

            {/* Related Account to Pledge (for Cheque) */}
            {pledgeData.pledgeTypeID === 1 && ( // Only for Cheque
                <div className="mt-4 pt-3 border-t">
                    <h4 className="text-md font-medium text-gray-700 mb-2">חשבון קשור לבטוחה (שיק)</h4>
                    {pledgeData.relatedAccounts && pledgeData.relatedAccounts.length > 0 ? (
                        <div className="flex items-center justify-between p-2 border-b">
                            <span>{allAccounts.find(a => a.id === pledgeData.relatedAccounts[0]?.accountObjID)?.name || pledgeData.relatedAccounts[0]?.accountObjID || 'לא נבחר חשבון'}</span>
                            <button type="button" onClick={() => handleRemoveAccountRelation(0)} className="text-red-500 hover:text-red-700">&times;</button>
                        </div>
                    ) : (
                        <div className="flex items-end gap-2 mt-2">
                            <SelectField className="flex-grow mb-0" label="בחר חשבון קיים" value={selectedAccountForRelation} onChange={(e) => setSelectedAccountForRelation(e.target.value)} options={allAccounts.map(e => ({ code: e.id, description: e.name }))} placeholder="בחר חשבון..." />
                            <button type="button" onClick={handleAddAccountRelation} className="px-3 py-2 bg-blue-500 text-white text-xs rounded-md whitespace-nowrap self-end mb-0">קשר חשבון</button>
                        </div>
                    )}
                </div>
            )}

             {/* Related Entities to Pledge */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">ישויות קשורות לבטוחה</h4>
                {pledgeData.relatedEntities?.map((rel, relIdx) => (
                    <div key={rel.reporterObjId || relIdx} className="flex items-center justify-between p-2 border-b">
                        <span>
                            {allEntities.find(e => e.id === rel.relatedObjID)?.name || rel.relatedObjID}
                            {' - '}
                            {ENTITY_PLEDGE_RELATIONS.find(r => r.code === rel.relationTypeID)?.description || rel.relationTypeID}
                            {rel.relationTypeDesc ? ` (${rel.relationTypeDesc})` : ''}
                        </span>
                        <button type="button" onClick={() => handleRemoveEntityRelation(relIdx)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <div className="flex items-end gap-2 mt-2">
                    <SelectField className="flex-grow mb-0" label="בחר ישות קיימת" value={selectedEntityForRelation} onChange={(e) => setSelectedEntityForRelation(e.target.value)} options={allEntities.map(e => ({ code: e.id, description: e.name }))} placeholder="בחר ישות..." />
                    <SelectField className="flex-grow mb-0" label="סוג קשר לבטוחה" value={selectedRelationTypeToEntity} onChange={(e) => setSelectedRelationTypeToEntity(e.target.value)} options={ENTITY_PLEDGE_RELATIONS} placeholder="בחר קשר..." />
                    <button type="button" onClick={handleAddEntityRelation} className="px-3 py-2 bg-blue-500 text-white text-xs rounded-md whitespace-nowrap self-end mb-0">הוסף קשר ישות</button>
                </div>
                 {/* TODO: Add 'Other' description for entity-pledge relation if relation type is 'Other' */}
            </div>
             {/* TODO: Related Attachments to Pledge */}
             <div className="mt-4 pt-3 border-t">
                <p className="text-sm text-gray-500">(מקטע 'צרופות קשורות לבטוחה' יפותח בהמשך - דורש שלב צרופות)</p>
            </div>
        </div>
    );
};

export default PledgeForm;