// --- File: src/components/shared/AttachmentForm.js ---
/**
 * @file AttachmentForm.js
 * @description Sub-form for individual Attachment metadata details.
 */
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';
import { ATTACHMENT_DOCUMENT_TYPES } from '../../constants';

const AttachmentForm = ({ attachmentData, attachmentIndex, onAttachmentChange, onRemoveAttachment }) => {

    const handleChange = (field, value) => {
        let processedValue = value;
        if (['documentType', 'numberOfPages'].includes(field)) {
            processedValue = value ? parseInt(value, 10) : null;
        }
        onAttachmentChange(attachmentIndex, field, processedValue);

        if (field === 'documentType' && value !== 99) { // Assuming 99 is 'Other'
            onAttachmentChange(attachmentIndex, 'documentTypeDesc', '');
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded-md mb-6 relative bg-white shadow">
            <button
                type="button"
                onClick={onRemoveAttachment}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-2xl p-1 leading-none"
                title="הסר צרופה"
            >
                &times;
            </button>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
                צרופה #{attachmentIndex + 1} (ID: {attachmentData.reporterObjId?.slice(-6)})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField
                    label="שם קובץ (כפי שיופיע ב-ZIP)"
                    value={attachmentData.fileName}
                    onChange={(e) => handleChange('fileName', e.target.value)}
                    required
                    placeholder="example.pdf"
                />
                <SelectField
                    label="סוג המסמך"
                    value={attachmentData.documentType}
                    onChange={(e) => handleChange('documentType', e.target.value)}
                    options={ATTACHMENT_DOCUMENT_TYPES}
                    required
                    placeholder="בחר סוג מסמך..."
                />
                {attachmentData.documentType === 99 && (
                    <InputField
                        label="פירוט סוג מסמך - אחר"
                        value={attachmentData.documentTypeDesc}
                        onChange={(e) => handleChange('documentTypeDesc', e.target.value)}
                        required
                        className="md:col-span-2"
                    />
                )}
                <InputField
                    label="מספר עמודים"
                    type="number"
                    value={attachmentData.numberOfPages}
                    onChange={(e) => handleChange('numberOfPages', e.target.value)}
                />
            </div>
            <TextAreaField
                label="הערות לצרופה"
                value={attachmentData.comments}
                onChange={(e) => handleChange('comments', e.target.value)}
                rows={2}
                className="mt-2"
            />
        </div>
    );
};

export default AttachmentForm;