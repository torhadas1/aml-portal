// --- File: src/components/shared/TransactionForm.js ---
/**
 * @file TransactionForm.js
 * @description Sub-form for individual Transaction (IrRegularETransaction) details.
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from './InputField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';
import FinancialAssetForm from './FinancialAssetForm';
import {
    TRANSACTION_ACTION_INDICATIONS,
    REPORTED_BEFORE_OPTIONS,
    TRANSACTION_TYPES,
    CREDIT_PURPOSE_TYPES,
    PROVIDER_TRANSACTION_TYPES,
    DEFRAYAL_COMPANY_IDS,
    ENTITY_TRANSACTION_RELATIONS
} from '../../constants';

const TransactionForm = ({ transactionData, transactionIndex, onTransactionChange, onRemoveTransaction, basePath }) => {
    const { getAllEntitiesForLinking, getAllPledgesForLinking, addItemToArray, removeItemFromArray, updateItemInArrayField } = useReportStore();

    const [selectedEntityForRelation, setSelectedEntityForRelation] = useState('');
    const [selectedRelationTypeToEntity, setSelectedRelationTypeToEntity] = useState('');
    const [selectedPledgeForRelation, setSelectedPledgeForRelation] = useState('');

    const allEntities = getAllEntitiesForLinking();
    const allPledges = getAllPledgesForLinking();


    const handleChange = (field, value) => {
        let processedValue = value;
        // Handle numeric and boolean conversions
        if (['transactionCommitted', 'transactionReportedBefore', 'transactionType', 'creditPurposeTypeID', 'providerTransactionType', 'defrayalCompanyLicenseID', 'secondaryTransactionIDSource'].includes(field)
            || field.startsWith('sumInNis.') || field.startsWith('sumInOriginalCurrency.') || field.startsWith('sumInVirtualCurrency.')) {
            if (field === 'transactionCommitted' || field === 'transactionReportedBefore') {
                processedValue = value === '' ? null : (value === '1'); // Boolean from '1'/'0'
            } else if (field.includes('sum')) {
                 processedValue = value === '' ? null : parseFloat(value); // For sums
            } else {
                processedValue = value ? parseInt(value, 10) : null;
            }
        }
        onTransactionChange(transactionIndex, field, processedValue);

        // Clear conditional descriptions
        if (field === 'transactionType' && value !== 99) onTransactionChange(transactionIndex, 'transactionTypeDesc', '');
        if (field === 'creditPurposeTypeID' && value !== 99) onTransactionChange(transactionIndex, 'creditPurposeTypeDesc', '');
    };

    const handleAssetChange = (assetField, assetValue) => {
        onTransactionChange(transactionIndex, `irregularFinancialAsset.${assetField}`, assetValue);
    };

    const handleAddEntityRelation = () => {
        if (!selectedEntityForRelation || !selectedRelationTypeToEntity) return;
        const newRelation = {
            reporterObjId: `rel_tx_ent_${Date.now()}`,
            relatedObjID: selectedEntityForRelation,
            relationTypeID: parseInt(selectedRelationTypeToEntity, 10),
            relationTypeDesc: '' // Handle 'Other'
        };
        addItemToArray(`${basePath}.relatedEntities`, newRelation);
        setSelectedEntityForRelation(''); setSelectedRelationTypeToEntity('');
    };
    const handleRemoveEntityRelation = (index) => {
        removeItemFromArray(`${basePath}.relatedEntities`, index);
    };

    const handleAddPledgeRelation = () => {
        if (!selectedPledgeForRelation) return;
        const currentPledges = transactionData.relatedPledges || [];
        if(!currentPledges.some(p => p.pledgeObjID === selectedPledgeForRelation)){
            addItemToArray(`${basePath}.relatedPledges`, { pledgeObjID: selectedPledgeForRelation });
        }
        setSelectedPledgeForRelation('');
    };
    const handleRemovePledgeRelation = (index) => {
        removeItemFromArray(`${basePath}.relatedPledges`, index);
    };


    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
            <button
                type="button"
                onClick={onRemoveTransaction}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="הסר פעולה"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                פעולה #{transactionIndex + 1} (ID: {transactionData.reporterObjId?.slice(-6)})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField label="אינדיקציה לביצוע פעולה" value={transactionData.transactionCommitted === null ? '' : (transactionData.transactionCommitted ? '1' : '0')} onChange={(e) => handleChange('transactionCommitted', e.target.value)} options={TRANSACTION_ACTION_INDICATIONS} required placeholder="בחר..." />
                <SelectField label="האם הפעולה דווחה בדיווח רגיל?" value={transactionData.transactionReportedBefore === null ? '' : (transactionData.transactionReportedBefore ? '1' : '0')} onChange={(e) => handleChange('transactionReportedBefore', e.target.value)} options={REPORTED_BEFORE_OPTIONS} placeholder="בחר..." />
                <InputField label="מזהה פעולה ראשי (ID מקור)" value={transactionData.transactionIDSource} onChange={(e) => handleChange('transactionIDSource', e.target.value)} required />
                <InputField label="מזהה פעולה משני" type="number" value={transactionData.secondaryTransactionIDSource} onChange={(e) => handleChange('secondaryTransactionIDSource', e.target.value)} required />
                <SelectField label="תיאור סוג פעולה (נספח א')" value={transactionData.transactionType} onChange={(e) => handleChange('transactionType', e.target.value)} options={TRANSACTION_TYPES} required placeholder="בחר סוג פעולה..." />
                {transactionData.transactionType === 99 && (
                    <InputField label="פירוט סוג פעולה - אחר" value={transactionData.transactionTypeDesc} onChange={(e) => handleChange('transactionTypeDesc', e.target.value)} required />
                )}
                <InputField label="תאריך ושעת ביצוע הפעולה" type="datetime-local" value={transactionData.eventDateTime} onChange={(e) => handleChange('eventDateTime', e.target.value)} required />
                <InputField label="סכום הפעולה בשקלים (ILS)" type="number" value={transactionData.sumInNis?.sum} onChange={(e) => handleChange('sumInNis.sum', e.target.value)} required />
                <InputField label="סכום במטבע מקורי" type="number" value={transactionData.sumInOriginalCurrency?.sum} onChange={(e) => handleChange('sumInOriginalCurrency.sum', e.target.value)} required />
                <SelectField label="קוד מטבע מקורי" value={transactionData.sumInOriginalCurrency?.currencyType} onChange={(e) => handleChange('sumInOriginalCurrency.currencyType', e.target.value)} options={COUNTRY_CODES.map(c => ({code: c.code, description: c.code})) /* Use ISO codes directly */} required placeholder="בחר מטבע..." />

                {/* Virtual Currency - Conditional */}
                {transactionData.transactionType === 11 && ( // Example condition, adjust if needed
                     <div className="col-span-1 md:col-span-2 mt-2 p-2 border-t">
                         <h5 className="text-xs font-medium text-gray-500 mb-1">פרטי מטבע וירטואלי (אם רלוונטי)</h5>
                         <InputField label="יחידות מטבע וירטואלי (15.18)" type="number" step="any" value={transactionData.sumInVirtualCurrency?.virtualCurrencyUnits} onChange={(e) => handleChange('sumInVirtualCurrency.virtualCurrencyUnits', e.target.value)} />
                         <InputField label="שער המטבע (מול דולר, 15.18)" type="number" step="any" value={transactionData.sumInVirtualCurrency?.virtualCurrencyExchangeRate} onChange={(e) => handleChange('sumInVirtualCurrency.virtualCurrencyExchangeRate', e.target.value)} />
                         <InputField label="קוד מטבע וירטואלי (SYMBOL)" value={transactionData.sumInVirtualCurrency?.virtualCurrencySymbol} onChange={(e) => handleChange('sumInVirtualCurrency.virtualCurrencySymbol', e.target.value)} placeholder="לדוגמה: BTC" />
                     </div>
                )}

                <InputField label="כתובת IP (אם מקוון)" value={transactionData.ipAddress} onChange={(e) => handleChange('ipAddress', e.target.value)} />
                <InputField label="מזהה IMEI (אם ממכשיר נייד)" value={transactionData.imei} onChange={(e) => handleChange('imei', e.target.value)} />
                <InputField label="מספר סידורי לאשראי" value={transactionData.creditSerialNumber} onChange={(e) => handleChange('creditSerialNumber', e.target.value)} />
                <InputField label="מספר תשלומים להחזר אשראי" type="number" value={transactionData.creditNumOfPaymentLeft} onChange={(e) => handleChange('creditNumOfPaymentLeft', e.target.value)} />
                <InputField label="תאריך סיום החזר אשראי משוער" type="date" value={transactionData.estimatedCreditRefundDate} onChange={(e) => handleChange('estimatedCreditRefundDate', e.target.value)} />
                <SelectField label="מטרת מתן האשראי" value={transactionData.creditPurposeTypeID} onChange={(e) => handleChange('creditPurposeTypeID', e.target.value)} options={CREDIT_PURPOSE_TYPES} placeholder="בחר מטרה..." />
                 {transactionData.creditPurposeTypeID === 99 && (
                    <InputField label="פירוט מטרת אשראי - אחר" value={transactionData.creditPurposeTypeDesc} onChange={(e) => handleChange('creditPurposeTypeDesc', e.target.value)} required />
                )}
                {/* Fields for Transaction Type 7 (Card Discounting) */}
                {transactionData.transactionType === 7 && (
                    <>
                        <InputField label="מועד ביצוע הפעולה אצל הספק" type="date" value={transactionData.providerTransactionDate} onChange={(e) => handleChange('providerTransactionDate', e.target.value)} />
                        <SelectField label="סוג פעולה אצל הספק" value={transactionData.providerTransactionType} onChange={(e) => handleChange('providerTransactionType', e.target.value)} options={PROVIDER_TRANSACTION_TYPES} placeholder="בחר סוג..." />
                        <SelectField label="מזהה גורם סולק" value={transactionData.defrayalCompanyLicenseID} onChange={(e) => handleChange('defrayalCompanyLicenseID', e.target.value)} options={DEFRAYAL_COMPANY_IDS} placeholder="בחר סולק..." />
                    </>
                )}
                 <InputField label="מספר עסקה בבלוקצ'יין (TXID)" value={transactionData.txid} onChange={(e) => handleChange('txid', e.target.value)} />
                 <InputField label="ישות מבצעת הפעולה (ID)" value={transactionData.entityCommittedTransaction} onChange={(e) => handleChange('entityCommittedTransaction', e.target.value)} placeholder="ID של אדם/תאגיד מדווח"/>
            </div>

            <TextAreaField label="הערות לפעולה" value={transactionData.eventComment} onChange={(e) => handleChange('eventComment', e.target.value)} rows={2} />

            {/* Financial Asset */}
            <FinancialAssetForm
                assetData={transactionData.irregularFinancialAsset}
                basePath={`${basePath}.irregularFinancialAsset`}
                onAssetChange={handleAssetChange}
                // Pass relation handlers if they need to be managed from here or directly in FinancialAssetForm
            />

            {/* Related Pledges to Transaction */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">בטוחות קשורות לפעולה</h4>
                {transactionData.relatedPledges?.map((rel, relIdx) => (
                    <div key={rel.pledgeObjID || relIdx} className="flex items-center justify-between p-1 border-b text-xs">
                        <span>{allPledges.find(p => p.id === rel.pledgeObjID)?.name || rel.pledgeObjID}</span>
                        <button type="button" onClick={() => handleRemovePledgeRelation(relIdx)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <div className="flex items-end gap-1 mt-1">
                    <SelectField className="flex-grow mb-0 text-xs" label="" value={selectedPledgeForRelation} onChange={(e) => setSelectedPledgeForRelation(e.target.value)} options={allPledges.map(p => ({ code: p.id, description: p.name }))} placeholder="בחר בטוחה קיימת..." />
                    <button type="button" onClick={handleAddPledgeRelation} className="px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap self-end mb-0">קשר בטוחה</button>
                </div>
            </div>

             {/* Related Entities to Transaction */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">ישויות קשורות לפעולה (נספח ג')</h4>
                 {transactionData.relatedEntities?.map((rel, relIdx) => (
                    <div key={rel.reporterObjId || relIdx} className="flex items-center justify-between p-1 border-b text-xs">
                        <span>{allEntities.find(e => e.id === rel.relatedObjID)?.name || rel.relatedObjID} - {ENTITY_TRANSACTION_RELATIONS.find(r => r.code === rel.relationTypeID)?.description || rel.relationTypeID}</span>
                        <button type="button" onClick={() => handleRemoveEntityRelation(relIdx)} className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
                <div className="flex items-end gap-1 mt-1">
                    <SelectField className="flex-grow mb-0 text-xs" label="" value={selectedEntityForRelation} onChange={(e) => setSelectedEntityForRelation(e.target.value)} options={allEntities.map(e => ({ code: e.id, description: e.name }))} placeholder="בחר ישות..." />
                    <SelectField className="flex-grow mb-0 text-xs" label="" value={selectedRelationTypeToEntity} onChange={(e) => setSelectedRelationTypeToEntity(e.target.value)} options={ENTITY_TRANSACTION_RELATIONS} placeholder="בחר קשר..." />
                    <button type="button" onClick={handleAddEntityRelation} className="px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap self-end mb-0">הוסף</button>
                </div>
                 {/* TODO: Add 'Other' description for entity-transaction relation */}
            </div>
        </div>
    );
};

export default TransactionForm;