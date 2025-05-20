// --- File: src/components/shared/PersonForm.js ---

/**
 * @file PersonForm.js
 * @description Sub-form for individual person entity details.
 */
import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import CheckboxGroupField from './CheckboxGroupField';
import AddressForm from './AddressForm';
import PhoneList from './PhoneList';
import EmailList from './EmailList';
import TextAreaField from './TextAreaField';
// import EntityRelationList from './EntityRelationList'; // TODO: Implement later
import useReportStore, { emptyAddress, emptyPhone, emptyEmail, emptyRelation } from '../../store/useReportStore';

import {
    ENTITY_EVENT_RELATIONS,
    PERSON_ID_TYPES,
    COUNTRY_CODES,
    GENDER_CODES,
    PERSON_RESIDENCE_STATUS_CODES,
    PROFESSION_CODES_EXAMPLE,
    ENTITY_TO_ENTITY_RELATIONS
} from '../../constants';

const PersonForm = ({ personData, personIndex, onPersonChange, onRemovePerson, onCheckboxGroupChange, basePath }) => {
    const { updateItemInArrayField, addItemToArray, removeItemFromArray } = useReportStore();

    // Handlers for nested arrays within Person
    const handleAddressChange = (addressIndex, field, value) => {
        updateItemInArrayField(`${basePath}.addresses`, addressIndex, field, value);
    };
    const handleAddAddress = () => {
        addItemToArray(`${basePath}.addresses`, emptyAddress());
    };
    const handleRemoveAddress = (addressIndex) => {
        // Prevent removing the last address if at least one is required
        if (personData.addresses.length > 1) {
            removeItemFromArray(`${basePath}.addresses`, addressIndex);
        } else {
            alert("חובה להשאיר לפחות כתובת אחת.");
        }
    };

    const handlePhoneChange = (phoneIndex, field, value) => {
        updateItemInArrayField(`${basePath}.phones`, phoneIndex, field, value);
    };
    const handleAddPhone = () => {
        addItemToArray(`${basePath}.phones`, emptyPhone());
    };
    const handleRemovePhone = (phoneIndex) => {
         if (personData.phones.length > 1) {
            removeItemFromArray(`${basePath}.phones`, phoneIndex);
        } else {
            // Optionally clear the fields of the last phone instead of erroring
            updateItemInArrayField(`${basePath}.phones`, 0, 'number', '');
            updateItemInArrayField(`${basePath}.phones`, 0, 'phoneType', null);
        }
    };

    const handleEmailChange = (emailIndex, field, value) => {
        updateItemInArrayField(`${basePath}.emails`, emailIndex, field, value);
    };
    const handleAddEmail = () => {
        addItemToArray(`${basePath}.emails`, emptyEmail());
    };
    const handleRemoveEmail = (emailIndex) => {
        if (personData.emails.length > 1) {
            removeItemFromArray(`${basePath}.emails`, emailIndex);
        } else {
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailAddress', '');
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailType', null);
        }
    };

    // TODO: Implement handleEntityRelationChange, handleAddEntityRelation, handleRemoveEntityRelation

    const selectedEventRelations = personData.relationsToEvent?.map(r => r.relationTypeID) || [];
    const selectedProfessionCodes = personData.professionTypeCodes?.map(p => p.professionTypeCode) || [];


    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
            <button
                type="button"
                onClick={onRemovePerson}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="Remove Person"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                אדם מעורב #{personIndex + 1} (ID: {personData.reporterObjId?.slice(-6)})
            </h3>

            <CheckboxGroupField
                label="קשר ישות לידיעה"
                name="relationsToEvent" // This name is used by onCheckboxGroupChange to build the path
                options={ENTITY_EVENT_RELATIONS}
                selectedCodes={selectedEventRelations}
                onChange={(groupName, code, isChecked) => onCheckboxGroupChange('relationsToEvent', 'relationTypeID', code, isChecked)}
                required
            />
            {selectedEventRelations.includes(24) && ( // Assuming 24 is 'Other'
                <InputField
                    label="פירוט קשר ישות לידיעה - אחר"
                    id={`person_${personIndex}_relationToEventDesc`}
                    value={personData.relationsToEvent?.find(r => r.relationTypeID === 24)?.relationTypeDesc || ''}
                    onChange={(e) => {
                        const updatedRelations = personData.relationsToEvent.map(r =>
                            r.relationTypeID === 24 ? { ...r, relationTypeDesc: e.target.value } : r
                        );
                        onPersonChange('relationsToEvent', updatedRelations);
                    }}
                    required={selectedEventRelations.includes(24)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="שם פרטי" value={personData.firstName} onChange={(e) => onPersonChange('firstName', e.target.value)} required />
                <InputField label="שם משפחה" value={personData.lastName} onChange={(e) => onPersonChange('lastName', e.target.value)} required />
                <InputField label="שם פרטי בלועזית" value={personData.latinName} onChange={(e) => onPersonChange('latinName', e.target.value)} />
                <InputField label="שם משפחה בלועזית" value={personData.latinSurname} onChange={(e) => onPersonChange('latinSurname', e.target.value)} />

                <SelectField
                    label="סוג מספר זהות"
                    value={personData.idType}
                    onChange={(e) => onPersonChange('idType', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={PERSON_ID_TYPES}
                    required
                    placeholder="בחר סוג..."
                />
                {personData.idType === 99 && (
                    <InputField label="פירוט סוג מספר זהות - אחר" value={personData.idTypeDesc} onChange={(e) => onPersonChange('idTypeDesc', e.target.value)} required />
                )}
                <InputField label="מספר זהות" value={personData.idNumber} onChange={(e) => onPersonChange('idNumber', e.target.value)} required />
                <SelectField label="מדינת דרכון/זהות" value={personData.idCountry} onChange={(e) => onPersonChange('idCountry', e.target.value)} options={COUNTRY_CODES} required placeholder="בחר מדינה..." />
                <InputField label="תאריך לידה" type="date" value={personData.birthDate} onChange={(e) => onPersonChange('birthDate', e.target.value)} required />

                <SelectField
                    label="מין"
                    value={personData.entityGender}
                    onChange={(e) => onPersonChange('entityGender', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={GENDER_CODES}
                    required
                    placeholder="בחר מין..."
                />
                {personData.entityGender === 99 && (
                    <InputField label="פירוט מין - אחר" value={personData.entityGenderDesc} onChange={(e) => onPersonChange('entityGenderDesc', e.target.value)} required />
                )}
                <SelectField
                    label="מעמד ישות (אדם)"
                    value={personData.residenceStatus}
                    onChange={(e) => onPersonChange('residenceStatus', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={PERSON_RESIDENCE_STATUS_CODES}
                    required
                    placeholder="בחר מעמד..."
                />
                {personData.residenceStatus === 5 && ( // Assuming 5 is 'Other' for person
                    <InputField label="פירוט מעמד ישות - אחר" value={personData.residenceStatusDesc} onChange={(e) => onPersonChange('residenceStatusDesc', e.target.value)} required />
                )}
            </div>

            {/* Profession - Assuming it's a multi-select for codes */}
             <CheckboxGroupField
                label="קוד תחום עיסוק/משלח יד (בחר מרשימה)"
                name="professionTypeCodes"
                options={PROFESSION_CODES_EXAMPLE} // Replace with actual CBS codes
                selectedCodes={selectedProfessionCodes}
                onChange={(groupName, code, isChecked) => onCheckboxGroupChange('professionTypeCodes', 'professionTypeCode', code, isChecked)}
            />
            {(selectedProfessionCodes.includes('xxxx') || !selectedProfessionCodes.length) && ( // Assuming 'xxxx' is the code for 'Other' or if no code is selected
                <InputField
                    label="תחום עיסוק/משלח יד - אחר/פירוט"
                    value={personData.profession}
                    onChange={(e) => onPersonChange('profession', e.target.value)}
                    placeholder="פרט אם 'לא ידוע' או שלא נמצא ברשימה"
                    required={selectedProfessionCodes.includes('xxxx')}
                />
            )}


            {/* Addresses */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">כתובות</h4>
                {personData.addresses.map((addr, idx) => (
                    <AddressForm
                        key={addr.reporterObjId || idx}
                        address={addr}
                        basePath={`${basePath}.addresses`}
                        index={idx}
                        onAddressChange={handleAddressChange}
                        onRemoveAddress={handleRemoveAddress}
                        isOnlyAddress={personData.addresses.length === 1}
                    />
                ))}
                <button type="button" onClick={handleAddAddress} className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600">
                    + הוסף כתובת
                </button>
            </div>

            {/* Phones */}
            <PhoneList
                phones={personData.phones}
                basePath={`${basePath}.phones`}
                onPhoneChange={handlePhoneChange}
                onAddPhone={handleAddPhone}
                onRemovePhone={handleRemovePhone}
            />

            {/* Emails */}
            <EmailList
                emails={personData.emails}
                basePath={`${basePath}.emails`}
                onEmailChange={handleEmailChange}
                onAddEmail={handleAddEmail}
                onRemoveEmail={handleRemoveEmail}
            />

            <TextAreaField
                label="הערות לישות"
                value={personData.entityComment}
                onChange={(e) => onPersonChange('entityComment', e.target.value)}
                rows={2}
            />

            {/* TODO: Entity to Entity Relations (Section 3.4.1.1) - Requires EntityRelationList component */}
            {/* <EntityRelationList basePath={`${basePath}.relatedEntities`} relations={personData.relatedEntities} entityType="person" /> */}
             <div className="mt-4 pt-3 border-t">
                 <p className="text-sm text-gray-500"> (מקטע 'קשר ישות לישויות אחרות' יפותח בהמשך)</p>
             </div>

        </div>
    );
};

export default PersonForm;