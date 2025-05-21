// --- File: src/components/steps/InvolvedEntitiesStep.js ---
import React, { useState } from 'react';
import useReportStore, { initialPersonState, initialCorporateState } from '../../store/useReportStore';
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

    const [showPersonForm, setShowPersonForm] = useState(false); // To toggle visibility of new person form
    const [showCorporateForm, setShowCorporateForm] = useState(false); // To toggle visibility of new corporate form


    const handleAddPerson = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.persons', initialPersonState());
        setShowPersonForm(true); // Keep form open or manage visibility per item
    };

    const handleRemovePerson = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.persons', index);
    };

    const handleAddCorporate = () => {
        addItemToArray('irregularReportEvent.listOfInvolvedEntities.corporates', initialCorporateState());
        setShowCorporateForm(true); // Keep form open or manage visibility per item
    };

    const handleRemoveCorporate = (index) => {
        removeItemFromArray('irregularReportEvent.listOfInvolvedEntities.corporates', index);
    };


    // Generic handler for updating fields within a person or corporate entity
    const handleEntityChange = (entityType, index, fieldPath, value) => {
        // entityType is 'persons' or 'corporates'
        // fieldPath is the nested path within the person/corporate object e.g., 'firstName' or 'addresses.0.streetName'
        // This might need to be more sophisticated if fieldPath is deeply nested itself.
        // For now, assuming fieldPath is a direct property or a simple nested one that updateItemInArrayField can handle.
        const fullPathToArray = `irregularReportEvent.listOfInvolvedEntities.${entityType}`;
        updateItemInArrayField(fullPathToArray, index, fieldPath, value);
    };

    // Handler for checkbox groups within an entity (e.g., relationsToEvent)
    const handleEntityCheckboxGroupChange = (entityType, index, groupPath, keyName, code, isChecked) => {
        const fullPathToGroupArray = `irregularReportEvent.listOfInvolvedEntities.${entityType}.${index}.${groupPath}`;
        // updateCheckboxGroup expects the full path to the array.
        // We need a way to update a nested array within an item of another array.
        // This might require a more specific action in Zustand or careful path construction.

        // For now, let's retrieve the current entity, modify it, and update it.
        const entityArray = reportData.irregularReportEvent.listOfInvolvedEntities[entityType];
        const entity = { ...entityArray[index] }; // Shallow copy

        if (!entity[groupPath]) {
            entity[groupPath] = [];
        }
        const targetArray = entity[groupPath];
        const itemIndex = targetArray.findIndex(item => item[keyName] === code);

        if (isChecked) {
            if (itemIndex === -1) targetArray.push({ [keyName]: code });
        } else {
            if (itemIndex !== -1) targetArray.splice(itemIndex, 1);
        }
        // Update the entire entity object in the persons/corporates array
        updateItemInArrayField(`irregularReportEvent.listOfInvolvedEntities.${entityType}`, index, groupPath, targetArray);
    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">5. גורמים מעורבים (Involved Entities)</h2>
            <p className="text-sm text-gray-600">פרטי הגורמים המעורבים באירוע, אנשים או תאגידים.</p>

            {/* Persons Section */}
            <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium text-indigo-700 mb-3">אנשים מעורבים (Persons)</h3>
                {persons.map((person, index) => (
                    <PersonForm
                        key={person.reporterObjId || index} // Use reporterObjId for stable key
                        personData={person}
                        personIndex={index}
                        onPersonChange={(fieldPath, value) => handleEntityChange('persons', index, fieldPath, value)}
                        onRemovePerson={() => handleRemovePerson(index)}
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) => handleEntityCheckboxGroupChange('persons', index, groupPath, keyName, code, isChecked)}
                        basePath={`irregularReportEvent.listOfInvolvedEntities.persons.${index}`}
                    />
                ))}
                <button
                    onClick={handleAddPerson}
                    className="mt-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    + הוסף אדם
                </button>
            </div>

            {/* Corporates Section */}
            <div className="p-4 border border-gray-200 rounded-md mt-6">
                <h3 className="text-lg font-medium text-indigo-700 mb-3">תאגידים מעורבים (Corporates)</h3>
                {corporates.map((corporate, index) => (
                     <CorporateForm
                        key={corporate.reporterObjId || index}
                        corporateData={corporate}
                        corporateIndex={index}
                        onCorporateChange={(fieldPath, value) => handleEntityChange('corporates', index, fieldPath, value)}
                        onRemoveCorporate={() => handleRemoveCorporate(index)}
                        onCheckboxGroupChange={(groupPath, keyName, code, isChecked) => handleEntityCheckboxGroupChange('corporates', index, groupPath, keyName, code, isChecked)}
                        basePath={`irregularReportEvent.listOfInvolvedEntities.corporates.${index}`}
                    />
                ))}
                <button
                    onClick={handleAddCorporate}
                    className="mt-2 px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    + הוסף תאגיד
                </button>
            </div>
        </div>
    );
};

export default InvolvedEntitiesStep;