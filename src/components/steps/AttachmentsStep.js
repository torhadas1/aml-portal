// --- File: src/components/steps/AttachmentsStep.js ---
/**
 * @file AttachmentsStep.js
 * @description Component for Step 9: Managing Attachments metadata.
 */
import React from 'react';
import useReportStore, { initialAttachmentState } from '../../store/useReportStore';
import AttachmentForm from '../shared/AttachmentForm';

const AttachmentsStep = () => {
    const { reportData, addItemToArray, removeItemFromArray, updateItemInArrayField } = useReportStore((state) => ({
        reportData: state.reportData,
        addItemToArray: state.addItemToArray,
        removeItemFromArray: state.removeItemFromArray,
        updateItemInArrayField: state.updateItemInArrayField,
    }));

    const attachments = reportData.irregularReportEvent.attachments || [];

    const handleAddAttachment = () => {
        addItemToArray('irregularReportEvent.attachments', initialAttachmentState());
    };

    const handleRemoveAttachment = (index) => {
        removeItemFromArray('irregularReportEvent.attachments', index);
    };

    const handleAttachmentChange = (index, field, value) => {
        updateItemInArrayField('irregularReportEvent.attachments', index, field, value);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800">9. צרופות (Attachments)</h2>
            <p className="text-sm text-gray-600">
                יש למלא את פרטי כל הצרופות המצורפות לדיווח.
                <br/>
                <strong>הערה:</strong> שלב זה הוא לרישום מטא-דאטה של הקבצים. את הקבצים עצמם יש לאגד בתיקיית 'Attachments' בקובץ ה-ZIP הסופי, כפי שמפורט בהנחיות.
            </p>

            <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-indigo-700">רשימת צרופות</h3>
                    <button
                        onClick={handleAddAttachment}
                        className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-sky-600"
                    >
                        + הוסף צרופה
                    </button>
                </div>
                {attachments.map((attachment, index) => (
                    <AttachmentForm
                        key={attachment.reporterObjId || index}
                        attachmentData={attachment}
                        attachmentIndex={index}
                        onAttachmentChange={handleAttachmentChange}
                        onRemoveAttachment={() => handleRemoveAttachment(index)}
                    />
                ))}
                {attachments.length === 0 && <p className="text-xs text-gray-500">לא נוספו צרופות.</p>}
            </div>
        </div>
    );
};

export default AttachmentsStep;