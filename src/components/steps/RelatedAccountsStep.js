// --- File: src/components/steps/RelatedAccountsStep.js ---
/**
 * @file RelatedAccountsStep.js
 * @description Component for Step 6: Managing Related Accounts.
 */
import React from 'react';
import useReportStore, { initialBankAccountState, initialOtherAccountState } from '../../store/useReportStore';
import BankAccountForm from '../shared/BankAccountForm';
import OtherAccountForm from '../shared/OtherAccountForm';

const RelatedAccountsStep = () => {
    const { reportData, addItemToArray, removeItemFromArray, updateItemInArrayField, updateCheckboxGroup } = useReportStore((state) => ({
        reportData: state.reportData,
        addItemToArray: state.addItemToArray,
        removeItemFromArray: state.removeItemFromArray,
        updateItemInArrayField: state.updateItemInArrayField,
        updateCheckboxGroup: state.updateCheckboxGroup,
    }));

    const bankAccounts = reportData.irregularReportEvent.irregularAccounts || [];
    const otherAccounts = reportData.irregularReportEvent.irregularOtherAccounts || [];

    const handleAddBankAccount = () => {
        addItemToArray('irregularReportEvent.irregularAccounts', initialBankAccountState());
    };
    const handleRemoveBankAccount = (index) => {
        removeItemFromArray('irregularReportEvent.irregularAccounts', index);
    };
    const handleBankAccountChange = (index, field, value) => {
        updateItemInArrayField('irregularReportEvent.irregularAccounts', index, field, value);
    };

    const handleAddOtherAccount = () => {
        addItemToArray('irregularReportEvent.irregularOtherAccounts', initialOtherAccountState());
    };
    const handleRemoveOtherAccount = (index) => {
        removeItemFromArray('irregularReportEvent.irregularOtherAccounts', index);
    };
    const handleOtherAccountChange = (index, field, value) => {
        updateItemInArrayField('irregularReportEvent.irregularOtherAccounts', index, field, value);
    };


    return (
        <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800">6. פרטי חשבונות קשורים (Related Accounts)</h2>
            <p className="text-sm text-gray-600">יש למלא את כל פרטי החשבונות הרלוונטיים לדיווח, כולל חשבונות צד נגדי או חשבונות ששועבדו.</p>

            {/* Bank / Post Bank Accounts Section */}
            <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-indigo-700">חשבונות בנק / דואר בישראל</h3>
                    <button
                        onClick={handleAddBankAccount}
                        className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-green-600"
                    >
                        + הוסף חשבון בנק/דואר
                    </button>
                </div>
                {bankAccounts.map((account, index) => (
                    <BankAccountForm
                        key={account.reporterObjId || index}
                        accountData={account}
                        accountIndex={index}
                        onAccountChange={handleBankAccountChange}
                        onRemoveAccount={() => handleRemoveBankAccount(index)}
                        basePath={`irregularReportEvent.irregularAccounts.${index}`}
                    />
                ))}
                {bankAccounts.length === 0 && <p className="text-xs text-gray-500">לא נוספו חשבונות בנק/דואר.</p>}
            </div>

            {/* Foreign Financial Institutes / Digital Wallets Section */}
            <div className="p-4 border border-gray-200 rounded-md mt-6">
                 <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-indigo-700">חשבונות בחו"ל / ארנקים דיגיטליים</h3>
                    <button
                        onClick={handleAddOtherAccount}
                        className="px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-purple-600"
                    >
                        + הוסף חשבון חו"ל / ארנק
                    </button>
                </div>
                {otherAccounts.map((account, index) => (
                     <OtherAccountForm
                        key={account.reporterObjId || index}
                        accountData={account}
                        accountIndex={index}
                        onAccountChange={handleOtherAccountChange}
                        onRemoveAccount={() => handleRemoveOtherAccount(index)}
                        basePath={`irregularReportEvent.irregularOtherAccounts.${index}`}
                    />
                ))}
                {otherAccounts.length === 0 && <p className="text-xs text-gray-500">לא נוספו חשבונות חו"ל או ארנקים דיגיטליים.</p>}
            </div>
        </div>
    );
};

export default RelatedAccountsStep;