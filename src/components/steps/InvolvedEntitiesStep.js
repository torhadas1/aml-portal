// --- File: src/components/steps/InvolvedEntitiesStep.js ---
import React, { useState } from 'react';
import useReportStore, { initialPersonState, initialCorporateState, clientSideId } from '../../store/useReportStore'; // Ensure clientSideId is exported if needed here, or from utils
import PersonForm from '../shared/PersonForm';
import CorporateForm from '../shared/CorporateForm';

const InvolvedEntitiesStep = () => {

    const reportData = useReportStore((state) => state.reportData);
    const addItemToArray = useReportStore((state) => state.addItemToArray);
    const removeItemFromArray = useReportStore((state) => state.removeItemFromArray);
    const updateItemInArrayField = useReportStore((state) => state.updateItemInArrayField);
    const updateCheckboxGroup = useReportStore((state) => state.updateCheckboxGroup);
    const persons = reportData.irregularReportEvent.listOfInvolvedEntities.persons || [];
    const corporates = reportData.irregularReportEvent.listOfInvolvedEntities.corporates || [];

    const handleAddPerson = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.persons', initialPersonState());
    };

    const handleRemovePerson = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.persons', index);
    };

    const handleAddCorporate = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.corporates', initialCorporateState());
    };

    const handleRemoveCorporate = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.corporates', index);
    };

    const handleEntityChange = (entityType, index, fieldPath, value) => {
        const fullPathToArray = `irregularReportEvent.listOfInvolvedEntities.${entityType}`;
        updateItemInArrayField(fullPathToArray, index, fieldPath, value);
    };

    // CORRECTED HANDLER
    const handleEntityCheckboxGroupChange = (entityType, entityIndex, groupPathInEntity, keyNameInGroup, code, isChecked) => {
        // Construct the full path to the specific array within the specific entity in the store
        // Example: "irregularReportEvent.listOfInvolvedEntities.persons.0.relationsToEvent"
        const fullPathToGroupArray = `irregularReportEvent.listOfInvolvedEntities.${entityType}.${entityIndex}.${groupPathInEntity}`;

        // Call the Zustand action designed for this, which uses Immer correctly
        updateCheckboxGroup(fullPathToGroupArray, keyNameInGroup, code, isChecked);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">6. גורמים מעורבים (Involved Entities)</h2>
            <p className="text-sm text-gray-600">פרטי הגורמים המעורבים באירוע, אנשים או תאגידים.</p>

            {/* Persons Section */}
            <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-indigo-700">אנשים מעורבים (Persons)</h3>
                    <button
                        onClick={handleAddPerson}
                        className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-green-600"
                    >
                        + הוסף אדם
                    </button>
                </div>
                {persons.map((person, index) => (
                    <PersonForm
                        key={person.reporterObjId || `person-${index}`}
                        personData={person}
                        personIndex={index}
                        onPersonChange={(fieldPath, value) => handleEntityChange('persons', index, fieldPath, value)}
                        onRemovePerson={() => handleRemovePerson(index)}
                        // This onCheckboxGroupChange prop is passed to PersonForm
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) =>
                            handleEntityCheckboxGroupChange('persons', index, groupPath, keyName, code, isChecked)
                        }
                        basePath={`irregularReportEvent.listOfInvolvedEntities.persons.${index}`}
                    />
                ))}
                {persons.length === 0 && <p className="text-xs text-gray-500">לא נוספו אנשים מעורבים.</p>}
            </div>

            {/* Corporates Section */}
            <div className="p-4 border border-gray-200 rounded-md mt-6">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-indigo-700">תאגידים מעורבים (Corporates)</h3>
                    <button
                        onClick={handleAddCorporate}
                        className="px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-purple-600"
                    >
                        + הוסף תאגיד
                    </button>
                </div>
                {corporates.map((corporate, index) => (
                    <CorporateForm
                        key={corporate.reporterObjId || `corporate-${index}`}
                        corporateData={corporate}
                        corporateIndex={index}
                        onCorporateChange={(fieldPath, value) => handleEntityChange('corporates', index, fieldPath, value)}
                        onRemoveCorporate={() => handleRemoveCorporate(index)}
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) =>
                            handleEntityCheckboxGroupChange('corporates', index, groupPath, keyName, code, isChecked)
                        }
                        basePath={`irregularReportEvent.listOfInvolvedEntities.corporates.${index}`}
                    />
                ))}
                {corporates.length === 0 && <p className="text-xs text-gray-500">לא נוספו תאגידים מעורבים.</p>}
            </div>
        </div>
    );
};

export default InvolvedEntitiesStep;