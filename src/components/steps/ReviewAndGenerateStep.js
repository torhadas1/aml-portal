// --- File: src/components/steps/ReviewAndGenerateStep.js ---
/**
 * @file ReviewAndGenerateStep.js
 * @description Component for Step 10: Reviewing entered data and generating the XML.
 */
import React from 'react';
import useReportStore from '../../store/useReportStore';

const ReviewSection = ({ title, data, fields }) => {
    if (!data) return null;

    const renderValue = (value) => {
        if (typeof value === 'boolean') {
            return value ? 'כן' : 'לא';
        }
        if (Array.isArray(value)) {
            if (value.length === 0) return <span className="text-gray-500 italic">לא נבחרו פריטים</span>;
            return value.map((item, index) => (
                <span key={index} className="block text-sm text-gray-700 ml-2">- {typeof item === 'object' ? JSON.stringify(item) : item}</span>
            ));
        }
        if (typeof value === 'object' && value !== null) {
            return <pre className="text-xs bg-gray-100 p-1 rounded overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>;
        }
        return value || <span className="text-gray-500 italic">לא הוזן</span>;
    };

    return (
        <div className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-indigo-700 mb-3 border-b pb-2">{title}</h3>
            <div className="space-y-2">
                {fields.map(field => {
                    let value = data;
                    const pathKeys = field.path.split('.');
                    try {
                        for (const key of pathKeys) {
                            if (value && typeof value === 'object' && key in value) {
                                value = value[key];
                            } else {
                                value = undefined; // Path not found
                                break;
                            }
                        }
                    } catch (e) {
                        value = undefined;
                    }

                    // Special handling for counts of array items
                    if (field.countArray) {
                        value = Array.isArray(value) ? value.length : 0;
                         return (
                            <div key={field.path} className="flex justify-between py-1">
                                <span className="text-sm font-medium text-gray-600">{field.label}:</span>
                                <span className="text-sm text-gray-800 font-semibold">{value}</span>
                            </div>
                        );
                    }
                     // Special handling for specific display
                    if (field.displayFormatter) {
                         return (
                            <div key={field.path} className="py-1">
                                <span className="text-sm font-medium text-gray-600 block mb-1">{field.label}:</span>
                                {field.displayFormatter(value, data)}
                            </div>
                        );
                    }


                    return (
                        <div key={field.path} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                            <span className="text-sm font-medium text-gray-600">{field.label}:</span>
                            <span className="text-sm text-gray-800">{renderValue(value)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const ReviewAndGenerateStep = () => {
    const { reportData } = useReportStore((state) => ({
        reportData: state.reportData,
    }));

    // Define what to display for each section
    // This is a simplified summary. More detail can be added.
    const generalReportFields = [
        { label: 'מספר דיווח', path: 'reportNumber' },
        { label: 'תאריך כתיבת הדיווח', path: 'reportDate' },
        { label: 'סטאטוס דיווח', path: 'reportStatus' }, // Consider mapping code to description
    ];

    const reporterDetailsFields = [
        { label: 'שם הגורם המדווח', path: 'irregularSourceMetaData.sourceName' },
        { label: 'מספר גורם מדווח', path: 'irregularSourceMetaData.sourceId' },
        { label: 'שם עורך הדיווח', path: 'irregularSourceMetaData.reportingPerson.firstName', displayFormatter: (val, data) => `${data?.irregularSourceMetaData?.reportingPerson?.firstName || ''} ${data?.irregularSourceMetaData?.reportingPerson?.lastName || ''}` },
        { label: 'תפקיד עורך הדיווח', path: 'irregularSourceMetaData.reportingPerson.reportingPersonRole' },
    ];

    const eventDetailsFields = [
        { label: 'תאריך האירוע', path: 'irregularReportEvent.eventDateTime' },
        { label: 'סיכום סיבות הדיווח', path: 'irregularReportEvent.reportingReasons', displayFormatter: (val) => (Array.isArray(val) && val.length > 0 ? val.map(r => r.reportingReason).join(', ') : 'לא נבחרו')},
        { label: 'דיווח מכיל פעולות?', path: 'irregularReportEvent.transactionCommitted' },
        { label: 'תמצית הידיעה', path: 'irregularReportEvent.reportingBriefContent' },
    ];

    const involvedEntitiesFields = [
        { label: 'מספר אנשים מעורבים', path: 'irregularReportEvent.listOfInvolvedEntities.persons', countArray: true },
        { label: 'מספר תאגידים מעורבים', path: 'irregularReportEvent.listOfInvolvedEntities.corporates', countArray: true },
    ];
     const relatedAccountsFields = [
        { label: 'מספר חשבונות בנק/דואר', path: 'irregularReportEvent.irregularAccounts', countArray: true },
        { label: 'מספר חשבונות חו"ל/ארנקים', path: 'irregularReportEvent.irregularOtherAccounts', countArray: true },
    ];
    const pledgesFields = [
        { label: 'מספר בטוחות', path: 'irregularReportEvent.irregularPledges', countArray: true },
    ];
    const transactionsFields = [
        { label: 'מספר פעולות', path: 'irregularReportEvent.irregularTransactions', countArray: true },
    ];
     const attachmentsFields = [
        { label: 'מספר צרופות (מטא-דאטה)', path: 'irregularReportEvent.attachments', countArray: true },
    ];


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">שלב 10: סקירה והפקת דוח XML</h2>
            <p className="text-sm text-gray-600 mb-6">
                אנא בדוק את סיכום הפרטים שהוזנו. אם הכל תקין, לחץ על 'הפק דוח XML' בתחתית העמוד.
                <br/>
                שים לב: זוהי סקירה חלקית. הדוח המלא יופק לקובץ ה-XML.
            </p>

            <ReviewSection title="פרטים כללים לדיווח (שלב 2)" data={reportData.reportMetaData} fields={generalReportFields} />
            <ReviewSection title="פרטי המדווח (שלב 1)" data={reportData} fields={reporterDetailsFields} />
            <ReviewSection title="פרטי הדיווח ותוכן הידיעה (שלב 4)" data={reportData} fields={eventDetailsFields} />
            <ReviewSection title="גורמים מעורבים (שלב 5)" data={reportData} fields={involvedEntitiesFields} />
            <ReviewSection title="חשבונות קשורים (שלב 6)" data={reportData} fields={relatedAccountsFields} />
            <ReviewSection title="בטוחות (שלב 7)" data={reportData} fields={pledgesFields} />
            <ReviewSection title="פעולות ונכסים (שלב 8)" data={reportData} fields={transactionsFields} />
            <ReviewSection title="צרופות (שלב 9)" data={reportData} fields={attachmentsFields} />


            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-300 rounded-md">
                <h4 className="text-md font-semibold text-yellow-800">לתשומת לבך:</h4>
                <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
                    <li>לאחר לחיצה על "הפק דוח XML", קובץ XML יורד למחשבך.</li>
                    <li>קובץ זה יש לשלב בתוך קובץ ZIP יחד עם תיקיית `Attachments` המכילה את הצרופות בפועל, בהתאם להנחיות הרשות.</li>
                    <li>האפליקציה אינה שומרת מידע זה בשום מקום לאחר סגירת הדפדפן.</li>
                </ul>
            </div>
        </div>
    );
};

export default ReviewAndGenerateStep;