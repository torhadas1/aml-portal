// --- File: src/components/shared/PhoneList.js ---

/**
 * @file PhoneList.js
 * @description Component for managing a list of phone numbers.
 */
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { PHONE_TYPES } from '../../constants';
import useReportStore, { emptyPhone } from '../../store/useReportStore'; // Import emptyPhone

const PhoneList = ({ phones, basePath, onPhoneChange, onAddPhone, onRemovePhone }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">טלפונים</label>
            {phones.map((phone, index) => (
                <div key={phone.reporterObjId || index} className="p-3 border border-dashed border-gray-400 rounded-md mb-3 relative bg-gray-50">
                    <button
                        type="button"
                        onClick={() => onRemovePhone(index)}
                        disabled={phones.length <= 1} // Disable remove if only one phone
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove Phone"
                    >
                        &times;
                    </button>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">טלפון {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <InputField
                            label="מספר טלפון"
                            id={`${basePath}.${index}.number`}
                            name="number"
                            value={phone.number}
                            onChange={(e) => onPhoneChange(index, 'number', e.target.value)}
                            required
                        />
                        <SelectField
                            label="סוג טלפון"
                            id={`${basePath}.${index}.phoneType`}
                            name="phoneType"
                            value={phone.phoneType}
                            onChange={(e) => onPhoneChange(index, 'phoneType', e.target.value ? parseInt(e.target.value, 10) : null)}
                            options={PHONE_TYPES}
                            placeholder="בחר סוג..."
                        />
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={onAddPhone}
                className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
                + הוסף טלפון
            </button>
        </div>
    );
};
export default PhoneList;