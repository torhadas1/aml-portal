// --- File: src/components/steps/PledgesStep.js ---
/**
 * @file PledgesStep.js
 * @description Component for Step 7: Managing Pledges/Collateral.
 */
import React from 'react';
import useReportStore, { initialPledgeState } from '../../store/useReportStore';
import PledgeForm from '../shared/PledgeForm';

const PledgesStep = () => {

    const reportData = useReportStore((state) => state.reportData);
    const addItemToArray = useReportStore((state) => state.addItemToArray);
    const removeItemFromArray = useReportStore((state) => state.removeItemFromArray);
    const updateItemInArrayField = useReportStore((state) => state.updateItemInArrayField);

    const pledges = reportData.irregularReportEvent.irregularPledges || [];

    const handleAddPledge = () => {
        addItemToArray('irregularReportEvent.irregularPledges', initialPledgeState());
    };

    const handleRemovePledge = (index) => {
        removeItemFromArray('irregularReportEvent.irregularPledges', index);
    };

    const handlePledgeChange = (index, field, value) => {
        updateItemInArrayField('irregularReportEvent.irregularPledges', index, field, value);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800">8. בטוחות (Pledges / Collateral)</h2>
            <p className="text-sm text-gray-600">יש למלא את כל פרטי הבטוחות הרלוונטיות לדיווח.</p>

            <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-indigo-700">רשימת בטוחות</h3>
                    <button
                        onClick={handleAddPledge}
                        className="px-3 py-1.5 bg-teal-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-teal-600"
                    >
                        + הוסף בטוחה
                    </button>
                </div>
                {pledges.map((pledge, index) => (
                    <PledgeForm
                        key={pledge.reporterObjId || index}
                        pledgeData={pledge}
                        pledgeIndex={index}
                        onPledgeChange={handlePledgeChange}
                        onRemovePledge={() => handleRemovePledge(index)}
                        basePath={`irregularReportEvent.irregularPledges.${index}`}
                    />
                ))}
                {pledges.length === 0 && <p className="text-xs text-gray-500">לא נוספו בטוחות.</p>}
            </div>
        </div>
    );
};

export default PledgesStep;