// --- File: src/components/steps/RelatedReportsStep.js ---

/**
 * @file RelatedReportsStep.js
 * @description Component for Step 3: Linking Related Reports.
 */
import React, { useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from '../shared/InputField';
import CheckboxGroupField from '../shared/CheckboxGroupField'; // Assuming CheckboxGroup is better here
import { RELATED_REPORT_RELATION_TYPES } from '../../constants';

const RelatedReportsStep = () => {
    const { reportData, addItemToArray, removeItemFromArray, updateItemInArrayField, updateCheckboxGroup } = useReportStore((state) => ({
        reportData: state.reportData,
        addItemToArray: state.addItemToArray,
        removeItemFromArray: state.removeItemFromArray,
        updateItemInArrayField: state.updateItemInArrayField,
        updateCheckboxGroup: state.updateCheckboxGroup, // Use the specific action
    }));
    const relatedReports = reportData.relatedReports || [];

    const [errors, setErrors] = useState({}); // Local errors for this step

    const handleAddReport = () => {
        // Add a new empty related report object to the state
        addItemToArray('relatedReports', { reportNumber: '', relationsToEvent: [] });
    };

    const handleRemoveReport = (index) => {
        // Remove the report at the specified index
        removeItemFromArray('relatedReports', index);
    };

    const handleInputChange = (index, field, value) => {
        // Update a specific field (like reportNumber) for a report at a given index
        updateItemInArrayField('relatedReports', index, field, value);
        // Basic validation
        if (field === 'reportNumber' && value.trim() === '') {
            setErrors(prev => ({ ...prev, [`relatedReports.${index}.reportNumber`]: 'שדה חובה' }));
        } else {
            setErrors(prev => ({ ...prev, [`relatedReports.${index}.reportNumber`]: null }));
        }
    };

    const handleRelationChange = (index, relationCode, isChecked) => {
        // This is complex because relationsToEvent is an array of objects [{ relationTypeID: code }]
        // We need to add or remove the object based on the checkbox state.
        const pathToArray = `relatedReports.${index}.relationsToEvent`;
        const currentRelations = relatedReports[index]?.relationsToEvent || [];

        if (isChecked) {
            // Add { relationTypeID: code } if not already present
            if (!currentRelations.some(rel => rel.relationTypeID === relationCode)) {
                // We can't directly push here, need a new action or more complex updateItemInArrayField
                // Let's try updating the whole array for simplicity now, though less efficient
                const newRelations = [...currentRelations, { relationTypeID: relationCode }];
                updateItemInArrayField('relatedReports', index, 'relationsToEvent', newRelations);
            }
        } else {
            // Remove { relationTypeID: code } if present
            const newRelations = currentRelations.filter(rel => rel.relationTypeID !== relationCode);
            updateItemInArrayField('relatedReports', index, 'relationsToEvent', newRelations);
        }
    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">3. דיווחים קשורים (Related Reports)</h2>
            <p className="text-sm text-gray-600">קשר דיווח זה לדיווחים קודמים שנשלחו לרשות, אם רלוונטי.</p>

            {relatedReports.map((report, index) => (
                <div key={report.reporterObjId || index} className="p-4 border border-gray-300 rounded-md bg-gray-50 relative mb-4">
                    <button
                        onClick={() => handleRemoveReport(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl"
                        title="Remove Related Report"
                    >
                        &times; {/* Multiplication sign for X */}
                    </button>
                    <h3 className="text-md font-medium text-gray-700 mb-2">דיווח קשור #{index + 1}</h3>
                    <InputField
                        label="מספר דיווח קשור שנשלח בעבר לרשות"
                        id={`relatedReportNumber_${index}`}
                        value={report.reportNumber}
                        onChange={(e) => handleInputChange(index, 'reportNumber', e.target.value)}
                        required
                        error={errors[`relatedReports.${index}.reportNumber`]}
                        className="mb-3"
                    />
                    {/* Using Checkboxes for Relation Types */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            סוג הקשר (ניתן לבחור יותר מאחד)
                            {/* Add required indicator if needed */}
                        </label>
                        <div className="mt-1 space-y-1 p-2 border border-gray-200 rounded-md">
                            {RELATED_REPORT_RELATION_TYPES.map((relationType) => (
                                <div key={relationType.code} className="flex items-center">
                                    <input
                                        id={`relationType_${index}_${relationType.code}`}
                                        type="checkbox"
                                        value={relationType.code}
                                        checked={report.relationsToEvent?.some(r => r.relationTypeID === relationType.code) || false}
                                        onChange={(e) => handleRelationChange(index, relationType.code, e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor={`relationType_${index}_${relationType.code}`} className="ml-2 block text-sm text-gray-900">
                                        {relationType.description}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* Add error display if needed */}
                    </div>
                </div>
            ))}

            <button
                onClick={handleAddReport}
                className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                + הוסף דיווח קשור
            </button>
        </div>
    );
};

export default RelatedReportsStep;