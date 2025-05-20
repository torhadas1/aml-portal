// --- File: src/components/shared/AddressForm.js ---

/**
 * @file AddressForm.js
 * @description Component for managing a single address.
 */
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { COUNTRY_CODES } from '../../constants'; // Assuming COUNTRY_CODES is in constants

const AddressForm = ({ address, basePath, index, onAddressChange, onRemoveAddress, isOnlyAddress }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onAddressChange(index, name, value);
    };

    return (
        <div className="p-3 border border-dashed border-gray-400 rounded-md mb-3 relative bg-gray-50">
            { !isOnlyAddress && (
                 <button
                    type="button"
                    onClick={() => onRemoveAddress(index)}
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg p-1"
                    title="Remove Address"
                >
                    &times;
                </button>
            )}
            <h4 className="text-sm font-medium text-gray-600 mb-2">כתובת {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <SelectField
                    label="מדינת כתובת"
                    id={`${basePath}.${index}.countryID`}
                    name="countryID" // Field name within the address object
                    value={address.countryID}
                    onChange={handleChange}
                    options={COUNTRY_CODES}
                    required
                    placeholder="בחר מדינה..."
                />
                <InputField
                    label="ישוב - אחר (אם לא נמצא קוד)"
                    id={`${basePath}.${index}.cityName`}
                    name="cityName"
                    value={address.cityName}
                    onChange={handleChange}
                    placeholder="שם הישוב"
                    // Required if cityCode is 777777 or not provided
                />
                 <InputField
                    label="רחוב - אחר (אם לא נמצא קוד)"
                    id={`${basePath}.${index}.streetName`}
                    name="streetName"
                    value={address.streetName}
                    onChange={handleChange}
                    required
                    placeholder="שם הרחוב"
                />
                <InputField
                    label="מספר בית"
                    id={`${basePath}.${index}.houseNumber`}
                    name="houseNumber"
                    value={address.houseNumber}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="מיקוד (7 ספרות)"
                    id={`${basePath}.${index}.newZIPCode`}
                    name="newZIPCode"
                    value={address.newZIPCode}
                    onChange={handleChange}
                    // Add validation for 7 digits
                />
                 <InputField
                    label="מיקוד (ישן, אם אין חדש)"
                    id={`${basePath}.${index}.zipCode`}
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleChange}
                />
                {/* Optional: City Code and Street Code if using official codes */}
                {/*
                <InputField label="סמל ישוב" id={`${basePath}.${index}.cityCode`} name="cityCode" value={address.cityCode} onChange={handleChange} />
                <InputField label="סמל רחוב" id={`${basePath}.${index}.streetCode`} name="streetCode" value={address.streetCode} onChange={handleChange} />
                */}
            </div>
        </div>
    );
};

export default AddressForm;