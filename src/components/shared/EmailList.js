// --- File: src/components/shared/EmailList.js ---

/**
 * @file EmailList.js
 * @description Component for managing a list of email addresses.
 */
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { EMAIL_TYPES } from '../../constants';
import useReportStore, { emptyEmail } from '../../store/useReportStore'; // Import emptyEmail

const EmailList = ({ emails, basePath, onEmailChange, onAddEmail, onRemoveEmail }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">כתובות דוא"ל</label>
            {emails.map((email, index) => (
                <div key={email.reporterObjId || index} className="p-3 border border-dashed border-gray-400 rounded-md mb-3 relative bg-gray-50">
                     <button
                        type="button"
                        onClick={() => onRemoveEmail(index)}
                        disabled={emails.length <= 1} // Disable remove if only one email
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove Email"
                    >
                        &times;
                    </button>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">דוא"ל {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <InputField
                            label="כתובת דוא''ל"
                            id={`${basePath}.${index}.emailAddress`}
                            name="emailAddress"
                            type="email"
                            value={email.emailAddress}
                            onChange={(e) => onEmailChange(index, 'emailAddress', e.target.value)}
                            required
                        />
                        <SelectField
                            label="סוג דוא''ל"
                            id={`${basePath}.${index}.emailType`}
                            name="emailType"
                            value={email.emailType}
                            onChange={(e) => onEmailChange(index, 'emailType', e.target.value ? parseInt(e.target.value, 10) : null)}
                            options={EMAIL_TYPES}
                            placeholder="בחר סוג..."
                        />
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={onAddEmail}
                className="mt-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
                + הוסף דוא"ל
            </button>
        </div>
    );
};
export default EmailList;