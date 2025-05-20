// --- File: src/components/shared/FinancialAssetForm.js ---
/**
 * @file FinancialAssetForm.js
 * @description Sub-form for IrRegularFinancialAsset details.
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from './InputField';
import SelectField from './SelectField';
import {
    FINANCIAL_ASSET_TYPES,
    FINANCIAL_ASSET_STATUS_OPTIONS,
    CREDIT_CARD_BRANDS,
    COUNTRY_CODES,
    ENTITY_ASSET_RELATIONS_GENERAL
} from '../../constants';

const FinancialAssetForm = ({ assetData, basePath, onAssetChange, onEntityRelationChange, onAccountRelationChange, onAttachmentRelationChange }) => {
    const { getAllEntitiesForLinking, getAllAccountsForLinking, getAllAttachmentsForLinking, addItemToArray, removeItemFromArray } = useReportStore();

    const [selectedEntityForRelation, setSelectedEntityForRelation] = useState('');
    const [selectedRelationTypeToEntity, setSelectedRelationTypeToEntity] = useState('');
    const [selectedAccountForRelation, setSelectedAccountForRelation] = useState('');
    const [selectedAttachmentForRelation, setSelectedAttachmentForRelation] = useState('');


    const allEntities = getAllEntitiesForLinking();
    const allAccounts = getAllAccountsForLinking();
    const allAttachments = getAllAttachmentsForLinking(); // Assuming attachments step will populate this

    const handleChange = (field, value) => {
        let processedValue = value;
        if (['financialAssetTypeID', 'financialAssetStatus', 'creditCardDetails.creditCardBrandID', 'numOfBillTransfers'].includes(field) || field.endsWith('ID')) {
            processedValue = value ? parseInt(value, 10) : null;
        }
        onAssetChange(field, processedValue);

        // Reset conditional fields if asset type changes
        if (field === 'financialAssetTypeID') {
            onAssetChange('financialAssetTypeDesc', '');
            onAssetChange('chequeDetails', { chequePaymentDate: '', numOfBillTransfers: null });
            onAssetChange('creditCardDetails', { creditCardBrandID: null, creditCardBrandDesc: '', creditCardCountryID: '', creditCardRemark: '' });
        }
        if (field === 'creditCardDetails.creditCardBrandID' && value !== 99) {
            onAssetChange('creditCardDetails.creditCardBrandDesc', '');
        }
    };

    const handleAddEntityRelation = () => {
        if (!selectedEntityForRelation || !selectedRelationTypeToEntity) return;
        const newRelation = {
            reporterObjId: `rel_asset_ent_${Date.now()}`,
            relatedObjID: selectedEntityForRelation,
            relationTypeID: parseInt(selectedRelationTypeToEntity, 10),
            relationTypeDesc: '' // Handle 'Other'
        };
        // The path to the relatedEntities array within the asset object
        const currentRelations = assetData.relatedEntities || [];
        onAssetChange('relatedEntities', [...currentRelations, newRelation]);
        setSelectedEntityForRelation(''); setSelectedRelationTypeToEntity('');
    };
    const handleRemoveEntityRelation = (index) => {
        const currentRelations = assetData.relatedEntities || [];
        onAssetChange('relatedEntities', currentRelations.filter((_, i) => i !== index));
    };

    const handleAddAccountRelation = () => {
        if (!selectedAccountForRelation) return;
        // Asset can be related to at most one account
        onAssetChange('relatedAccounts', [{ accountObjID: selectedAccountForRelation, reporterObjId: `rel_asset_acc_${Date.now()}` }]);
        setSelectedAccountForRelation('');
    };
    const handleRemoveAccountRelation = () => {
        onAssetChange('relatedAccounts', []);
    };

    const handleAddAttachmentRelation = () => {
        if (!selectedAttachmentForRelation) return;
        const currentAttachments = assetData.relatedAttachments || [];
        if (!currentAttachments.some(att => att.attachmentObjID === selectedAttachmentForRelation)) {
             onAssetChange('relatedAttachments', [...currentAttachments, { attachmentObjID: selectedAttachmentForRelation, reporterObjId: `rel_asset_att_${Date.now()}` }]);
        }
        setSelectedAttachmentForRelation('');
    };
    const handleRemoveAttachmentRelation = (index) => {
        const currentAttachments = assetData.relatedAttachments || [];
        onAssetChange('relatedAttachments', currentAttachments.filter((_, i) => i !== index));
    };


    return (
        <div className="p-3 border border-dashed border-gray-300 rounded-md mt-3 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">פרטי נכס פיננסי / אמצעי תשלום</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField label="קוד נכס פיננסי / אמצעי תשלום" value={assetData.financialAssetTypeID} onChange={(e) => handleChange('financialAssetTypeID', e.target.value)} options={FINANCIAL_ASSET_TYPES} required placeholder="בחר סוג נכס..." />
                {assetData.financialAssetTypeID === 13 && ( // 13 is 'Other'
                    <InputField label="פירוט נכס פיננסי - אחר" value={assetData.financialAssetTypeDesc} onChange={(e) => handleChange('financialAssetTypeDesc', e.target.value)} required />
                )}
                <SelectField label="ארץ הנכס הפיננסי" value={assetData.financialAssetCountry} onChange={(e) => handleChange('financialAssetCountry', e.target.value)} options={COUNTRY_CODES} placeholder="בחר מדינה..." />
                <SelectField label="סטטוס נכס" value={assetData.financialAssetStatus} onChange={(e) => handleChange('financialAssetStatus', e.target.value)} options={FINANCIAL_ASSET_STATUS_OPTIONS} required placeholder="בחר סטטוס..." />
                <InputField label="מספר נכס פיננסי (שיק/כרטיס/ניע וכו')" value={assetData.financialAssetReference} onChange={(e) => handleChange('financialAssetReference', e.target.value)} />
                <InputField label="שם נכס פיננסי (לניירות ערך)" value={assetData.financialAssetName} onChange={(e) => handleChange('financialAssetName', e.target.value)} />
            </div>

            {/* Conditional Cheque Details */}
            {(assetData.financialAssetTypeID === 1 || assetData.financialAssetTypeID === 2 || assetData.financialAssetTypeID === 3) && (
                <div className="mt-3 pt-2 border-t">
                    <h5 className="text-xs font-medium text-gray-500 mb-1">פרטי שיק/שטר</h5>
                    <InputField label="תאריך פירעון השיק/השטר" type="date" value={assetData.chequeDetails?.chequePaymentDate} onChange={(e) => handleChange('chequeDetails.chequePaymentDate', e.target.value)} required />
                    <InputField label="מספר הסבות בשיק/שטר" type="number" value={assetData.chequeDetails?.numOfBillTransfers} onChange={(e) => handleChange('chequeDetails.numOfBillTransfers', e.target.value)} />
                </div>
            )}

            {/* Conditional Credit Card Details */}
            {(assetData.financialAssetTypeID === 14 || assetData.financialAssetTypeID === 16) && (
                <div className="mt-3 pt-2 border-t">
                    <h5 className="text-xs font-medium text-gray-500 mb-1">פרטי כרטיס חיוב</h5>
                    <SelectField label="שם מותג כרטיס החיוב" value={assetData.creditCardDetails?.creditCardBrandID} onChange={(e) => handleChange('creditCardDetails.creditCardBrandID', e.target.value)} options={CREDIT_CARD_BRANDS} placeholder="בחר מותג..." required />
                    {assetData.creditCardDetails?.creditCardBrandID === 99 && (
                        <InputField label="פירוט שם מותג - אחר" value={assetData.creditCardDetails?.creditCardBrandDesc} onChange={(e) => handleChange('creditCardDetails.creditCardBrandDesc', e.target.value)} required />
                    )}
                    <SelectField label="מדינה שהנפיקה את כרטיס החיוב" value={assetData.creditCardDetails?.creditCardCountryID} onChange={(e) => handleChange('creditCardDetails.creditCardCountryID', e.target.value)} options={COUNTRY_CODES} placeholder="בחר מדינה..." />
                    <InputField label="הערות לכרטיס החיוב" value={assetData.creditCardDetails?.creditCardRemark} onChange={(e) => handleChange('creditCardDetails.creditCardRemark', e.target.value)} />
                </div>
            )}

            {/* Related Entities to Financial Asset */}
            <div className="mt-3 pt-2 border-t">
                <h5 className="text-xs font-medium text-gray-500 mb-1">ישויות קשורות לנכס</h5>
                {assetData.relatedEntities?.map((rel, idx) => (
                    <div key={rel.reporterObjId || idx} className="flex items-center justify-between p-1 border-b text-xs">
                        <span>{allEntities.find(e => e.id === rel.relatedObjID)?.name || rel.relatedObjID} - {ENTITY_ASSET_RELATIONS_GENERAL.find(r => r.code === rel.relationTypeID)?.description || rel.relationTypeID}</span>
                        <button type="button" onClick={() => handleRemoveEntityRelation(idx)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <div className="flex items-end gap-1 mt-1">
                    <SelectField className="flex-grow mb-0 text-xs" label="" value={selectedEntityForRelation} onChange={(e) => setSelectedEntityForRelation(e.target.value)} options={allEntities.map(e => ({ code: e.id, description: e.name }))} placeholder="בחר ישות..." />
                    <SelectField className="flex-grow mb-0 text-xs" label="" value={selectedRelationTypeToEntity} onChange={(e) => setSelectedRelationTypeToEntity(e.target.value)} options={ENTITY_ASSET_RELATIONS_GENERAL} placeholder="בחר קשר..." />
                    <button type="button" onClick={handleAddEntityRelation} className="px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap self-end mb-0">הוסף</button>
                </div>
            </div>

             {/* Related Account to Financial Asset */}
            <div className="mt-3 pt-2 border-t">
                <h5 className="text-xs font-medium text-gray-500 mb-1">חשבון קשור לנכס (מקסימום 1)</h5>
                 {(assetData.relatedAccounts && assetData.relatedAccounts.length > 0) ? (
                    <div className="flex items-center justify-between p-1 border-b text-xs">
                        <span>{allAccounts.find(a => a.id === assetData.relatedAccounts[0]?.accountObjID)?.name || assetData.relatedAccounts[0]?.accountObjID}</span>
                        <button type="button" onClick={handleRemoveAccountRelation} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ) : (
                    <div className="flex items-end gap-1 mt-1">
                        <SelectField className="flex-grow mb-0 text-xs" label="" value={selectedAccountForRelation} onChange={(e) => setSelectedAccountForRelation(e.target.value)} options={allAccounts.map(e => ({ code: e.id, description: e.name }))} placeholder="בחר חשבון..." />
                        <button type="button" onClick={handleAddAccountRelation} className="px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap self-end mb-0">הוסף</button>
                    </div>
                )}
            </div>

             {/* Related Attachments to Financial Asset */}
            <div className="mt-3 pt-2 border-t">
                <h5 className="text-xs font-medium text-gray-500 mb-1">צרופות קשורות לנכס</h5>
                 {assetData.relatedAttachments?.map((att, idx) => (
                    <div key={att.reporterObjId || idx} className="flex items-center justify-between p-1 border-b text-xs">
                        <span>{allAttachments.find(a => a.id === att.attachmentObjID)?.name || att.attachmentObjID}</span>
                        <button type="button" onClick={() => handleRemoveAttachmentRelation(idx)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <div className="flex items-end gap-1 mt-1">
                    <SelectField className="flex-grow mb-0 text-xs" label="" value={selectedAttachmentForRelation} onChange={(e) => setSelectedAttachmentForRelation(e.target.value)} options={allAttachments.map(a => ({ code: a.id, description: a.name }))} placeholder="בחר צרופה..." />
                    <button type="button" onClick={handleAddAttachmentRelation} className="px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap self-end mb-0">הוסף</button>
                </div>
            </div>
        </div>
    );
};
export default FinancialAssetForm;