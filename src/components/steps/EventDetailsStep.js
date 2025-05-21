// --- File: src/components/steps/EventDetailsStep.js ---

/**
 * @file EventDetailsStep.js
 * @description Component for Step 4: Event Details and Content.
 */
import React, { use, useState } from 'react';
import useReportStore from '../../store/useReportStore';
import InputField from '../shared/InputField';
import TextAreaField from '../shared/TextAreaField';
import CheckboxGroupField from '../shared/CheckboxGroupField';
import SelectField from '../shared/SelectField'; // For boolean toggle
import { REPORTING_REASONS, REPORT_KEYWORDS, ADDITIONAL_AUTHORITIES, EVENT_TRANSACTION_COMMITTED_OPTIONS } from '../../constants';

const EventDetailsStep = () => {

    const reportData = useReportStore((state) => state.reportData);
    const updateField = useReportStore((state) => state.updateField);
    const updateCheckboxGroup = useReportStore((state) => state.updateCheckboxGroup);

    const event = reportData.irregularReportEvent;

    const [errors, setErrors] = useState({});

    // Handle simple input changes
    const handleChange = (e) => {
        const { name, value, type, required } = e.target;
        let processedValue = value;
        // Basic required validation
        if (required && value.trim() === '') {
            setErrors(prev => ({ ...prev, [name]: 'שדה חובה' }));
        } else {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        // Handle boolean select
        if (name === 'irregularReportEvent.transactionCommitted') {
            processedValue = value === '' ? null : (value === '1'); // Convert '1'/'0' string to boolean/null
        }
        updateField(name, processedValue);
    };

    // Handle changes for checkbox groups
    const handleCheckboxChange = (groupName, code, isChecked) => {
        // groupName should be the path to the array in the state, e.g., 'irregularReportEvent.reportingReasons'
        // keyName should be the property name within the objects in the array, e.g., 'reportingReason'
        let keyName = '';
        if (groupName === 'irregularReportEvent.reportingReasons') keyName = 'reportingReason';
        else if (groupName === 'irregularReportEvent.reportKeyWordsCodes') keyName = 'reportKeyWordCode';
        else if (groupName === 'irregularReportEvent.additionalAuthoritiesCodes') keyName = 'additionalAuthorityCode';
        else {
            console.error("Unknown checkbox group:", groupName);
            return;
        }

        updateCheckboxGroup(groupName, keyName, code, isChecked);

        // Clear 'Other' description if the corresponding 'Other' checkbox is unchecked
        if (!isChecked) {
            if (keyName === 'reportingReason' && code === 99) updateField('irregularReportEvent.reportingReasonDesc', '');
            if (keyName === 'reportKeyWordCode' && code === 300) updateField('irregularReportEvent.reportKeyWordDesc', '');
            if (keyName === 'additionalAuthorityCode' && code === 4) updateField('irregularReportEvent.additionalAuthoritiesDesc', '');
        }
    };

    // Get selected codes for checkbox groups
    const selectedReasons = event.reportingReasons?.map(r => r.reportingReason) || [];
    const selectedKeywords = event.reportKeyWordsCodes?.map(k => k.reportKeyWordCode) || [];
    const selectedAuthorities = event.additionalAuthoritiesCodes?.map(a => a.additionalAuthorityCode) || [];

    // Determine if 'Other' options are selected
    const isReasonOtherSelected = selectedReasons.includes(99);
    const isKeywordOtherSelected = selectedKeywords.includes(300);
    const isAuthorityOtherSelected = selectedAuthorities.includes(4);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">4. פרטי הדיווח ותוכן הידיעה (Report Details & Event Content)</h2>
            <p className="text-sm text-gray-600">פרטי האירוע שהוביל לדיווח ותיאור מפורט.</p>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField
                    label="תאריך האירוע שחולל את הדיווח"
                    id="eventDateTime"
                    name="irregularReportEvent.eventDateTime"
                    type="date" // Using date only as per spec table 3.4 (1)
                    value={event.eventDateTime}
                    onChange={handleChange}
                    required
                    error={errors['irregularReportEvent.eventDateTime']}
                />
                <SelectField
                    label="האם הדיווח מכיל פעולות?"
                    id="transactionCommitted"
                    name="irregularReportEvent.transactionCommitted"
                    value={event.transactionCommitted === null ? '' : (event.transactionCommitted ? '1' : '0')} // Map boolean/null to '1'/'0'/''
                    onChange={handleChange}
                    options={EVENT_TRANSACTION_COMMITTED_OPTIONS}
                    required // Likely required
                    placeholder="בחר..."
                    error={errors['irregularReportEvent.transactionCommitted']}
                />
            </div>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <CheckboxGroupField
                    label="סיבת הדיווח (ניתן לבחור יותר מאחד)"
                    name="irregularReportEvent.reportingReasons" // Path to the array
                    options={REPORTING_REASONS}
                    selectedCodes={selectedReasons}
                    onChange={handleCheckboxChange} // Pass the specific handler
                    required
                    error={errors['irregularReportEvent.reportingReasons']}
                />
                {isReasonOtherSelected && (
                    <InputField
                        label="פירוט סיבת דיווח אחרת"
                        id="reportingReasonDesc"
                        name="irregularReportEvent.reportingReasonDesc"
                        value={event.reportingReasonDesc}
                        onChange={handleChange}
                        required={isReasonOtherSelected}
                        error={errors['irregularReportEvent.reportingReasonDesc']}
                        className="mt-2"
                    />
                )}
            </div>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <TextAreaField
                    label="תמצית הידיעה"
                    id="reportingBriefContent"
                    name="irregularReportEvent.reportingBriefContent"
                    value={event.reportingBriefContent}
                    onChange={handleChange}
                    rows={3}
                    placeholder="תיאור תמציתי של נסיבות הדיווח..."
                    error={errors['irregularReportEvent.reportingBriefContent']}
                />
            </div>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <CheckboxGroupField
                    label="ביטוי מפתח (ניתן לבחור יותר מאחד)"
                    name="irregularReportEvent.reportKeyWordsCodes"
                    options={REPORT_KEYWORDS}
                    selectedCodes={selectedKeywords}
                    onChange={handleCheckboxChange}
                    error={errors['irregularReportEvent.reportKeyWordsCodes']}
                />
                {isKeywordOtherSelected && (
                    <InputField
                        label="פירוט תחום בסיכון אחר"
                        id="reportKeyWordDesc"
                        name="irregularReportEvent.reportKeyWordDesc"
                        value={event.reportKeyWordDesc}
                        onChange={handleChange}
                        required={isKeywordOtherSelected}
                        error={errors['irregularReportEvent.reportKeyWordDesc']}
                        className="mt-2"
                    />
                )}
            </div>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <CheckboxGroupField
                    label="דווח לרשות אכיפה (אם רלוונטי, ניתן לבחור יותר מאחד)"
                    name="irregularReportEvent.additionalAuthoritiesCodes"
                    options={ADDITIONAL_AUTHORITIES}
                    selectedCodes={selectedAuthorities}
                    onChange={handleCheckboxChange}
                    error={errors['irregularReportEvent.additionalAuthoritiesCodes']}
                />
                {isAuthorityOtherSelected && (
                    <InputField
                        label="פירוט גורם אכיפה אחר"
                        id="additionalAuthoritiesDesc"
                        name="irregularReportEvent.additionalAuthoritiesDesc"
                        value={event.additionalAuthoritiesDesc}
                        onChange={handleChange}
                        required={isAuthorityOtherSelected}
                        error={errors['irregularReportEvent.additionalAuthoritiesDesc']}
                        className="mt-2"
                    />
                )}
            </div>

            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <TextAreaField
                    label="תוכן הידיעה"
                    id="reportingContent"
                    name="irregularReportEvent.reportingContent"
                    value={event.reportingContent}
                    onChange={handleChange}
                    rows={8}
                    required
                    placeholder="תיאור מלא של המקרה ונסיבותיו..."
                    error={errors['irregularReportEvent.reportingContent']}
                />
            </div>

        </div>
    );
};

export default EventDetailsStep;