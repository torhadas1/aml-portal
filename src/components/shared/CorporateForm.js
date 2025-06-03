// --- File: src/components/shared/CorporateForm.js ---

/**
 * @file CorporateForm.js
 * @description Sub-form for corporate entity details.
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
    CORPORATE_ID_TYPES,
    COUNTRY_CODES,
    CORPORATE_RESIDENCE_STATUS_CODES,
    ENTITY_TO_ENTITY_RELATIONS
} from '../../constants';

const CorporateForm = ({ corporateData, corporateIndex, onCorporateChange, onRemoveCorporate, onCheckboxGroupChange, basePath }) => {
     const { updateItemInArrayField, addItemToArray, removeItemFromArray } = useReportStore();

    // Handlers for nested arrays within Corporate
    const handleAddressChange = (addressIndex, field, value) => {
        updateItemInArrayField(`${basePath}.addresses`, addressIndex, field, value);
    };
    const handleAddAddress = () => {
        addItemToArray(`${basePath}.addresses`, emptyAddress());
    };
    const handleRemoveAddress = (addressIndex) => {
        if (corporateData.addresses.length > 1) {
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
        if (corporateData.phones.length > 1) {
            removeItemFromArray(`${basePath}.phones`, phoneIndex);
        } else {
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
         if (corporateData.emails.length > 1) {
            removeItemFromArray(`${basePath}.emails`, emailIndex);
        } else {
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailAddress', '');
            updateItemInArrayField(`${basePath}.emails`, 0, 'emailType', null);
        }
    };

    // TODO: Implement handleEntityRelationChange, handleAddEntityRelation, handleRemoveEntityRelation

    const selectedEventRelations = corporateData.relationsToEvent?.map(r => r.relationTypeID) || [];

    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
            <button
                type="button"
                onClick={onRemoveCorporate}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="Remove Corporate"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                תאגיד מעורב #{corporateIndex + 1} (ID: {corporateData.reporterObjId?.slice(-6)})
            </h3>

            <CheckboxGroupField
                label="קשר ישות לידיעה"
                name="relationsToEvent"
                options={ENTITY_EVENT_RELATIONS}
                selectedCodes={selectedEventRelations}
                onChange={(groupNameCorporate, code, isChecked) => onCheckboxGroupChange(groupNameCorporate, 'relationTypeID', code, isChecked)}
                required
            />
            {selectedEventRelations.includes(24) && ( // Assuming 24 is 'Other'
                <InputField
                    label="פירוט קשר ישות לידיעה - אחר"
                    id={`corporate_${corporateIndex}_relationToEventDesc`}
                    value={corporateData.relationsToEvent?.find(r => r.relationTypeID === 24)?.relationTypeDesc || ''}
                     onChange={(e) => {
                        const updatedRelations = corporateData.relationsToEvent.map(r =>
                            r.relationTypeID === 24 ? { ...r, relationTypeDesc: e.target.value } : r
                        );
                        onCorporateChange('relationsToEvent', updatedRelations);
                    }}
                    required={selectedEventRelations.includes(24)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="שם תאגיד" value={corporateData.name} onChange={(e) => onCorporateChange('name', e.target.value)} required />
                <InputField label="שם תאגיד בלועזית" value={corporateData.latinName} onChange={(e) => onCorporateChange('latinName', e.target.value)} />

                <SelectField
                    label="סוג מספר זהות (תאגיד)"
                    value={corporateData.idType}
                    onChange={(e) => onCorporateChange('idType', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={CORPORATE_ID_TYPES}
                    required
                    placeholder="בחר סוג..."
                />
                 {corporateData.idType === 99 && (
                    <InputField label="פירוט סוג מספר זהות - אחר" value={corporateData.idTypeDesc} onChange={(e) => onCorporateChange('idTypeDesc', e.target.value)} required />
                )}
                <InputField label="מספר זהות (ח.פ / אחר)" value={corporateData.idNumber} onChange={(e) => onCorporateChange('idNumber', e.target.value)} required />
                <SelectField label="מדינת התאגדות" value={corporateData.idCountry} onChange={(e) => onCorporateChange('idCountry', e.target.value)} options={COUNTRY_CODES} required placeholder="בחר מדינה..." />
                <InputField label="תאריך התאגדות" type="date" value={corporateData.foundationDate} onChange={(e) => onCorporateChange('foundationDate', e.target.value)} required />

                <SelectField
                    label="מעמד ישות (תאגיד)"
                    value={corporateData.residenceStatus}
                    onChange={(e) => onCorporateChange('residenceStatus', e.target.value ? parseInt(e.target.value,10) : null)}
                    options={CORPORATE_RESIDENCE_STATUS_CODES}
                    required
                    placeholder="בחר מעמד..."
                />
                 {corporateData.residenceStatus === 5 && ( // Assuming 5 is 'Other' for corporate
                    <InputField label="פירוט מעמד ישות - אחר" value={corporateData.residenceStatusDesc} onChange={(e) => onCorporateChange('residenceStatusDesc', e.target.value)} required />
                )}
                <InputField label="תיאור תחום עיסוק תאגיד" value={corporateData.corporateFieldDesc} onChange={(e) => onCorporateChange('corporateFieldDesc', e.target.value)} />
            </div>

            {/* Addresses */}
            <div className="mt-4 pt-3 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-2">כתובות</h4>
                {corporateData.addresses.map((addr, idx) => (
                    <AddressForm
                        key={addr.reporterObjId || idx}
                        address={addr}
                        basePath={`${basePath}.addresses`}
                        index={idx}
                        onAddressChange={handleAddressChange}
                        onRemoveAddress={handleRemoveAddress}
                        isOnlyAddress={corporateData.addresses.length === 1}
                    />
                ))}
                 <button type="button" onClick={handleAddAddress} className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600">
                    + הוסף כתובת
                </button>
            </div>


            {/* Phones */}
             <PhoneList
                phones={corporateData.phones}
                basePath={`${basePath}.phones`}
                onPhoneChange={handlePhoneChange}
                onAddPhone={handleAddPhone}
                onRemovePhone={handleRemovePhone}
            />

            {/* Emails */}
            <EmailList
                emails={corporateData.emails}
                basePath={`${basePath}.emails`}
                onEmailChange={handleEmailChange}
                onAddEmail={handleAddEmail}
                onRemoveEmail={handleRemoveEmail}
            />


            <TextAreaField
                label="הערות לתאגיד"
                value={corporateData.entityComment}
                onChange={(e) => onCorporateChange('entityComment', e.target.value)}
                rows={2}
            />

            {/* TODO: Entity to Entity Relations (Section 3.4.1.1) - Requires EntityRelationList component */}
            <div className="mt-4 pt-3 border-t">
                 <p className="text-sm text-gray-500"> (מקטע 'קשר ישות לישויות אחרות' יפותח בהמשך)</p>
             </div>
        </div>
    );
};

export default CorporateForm;