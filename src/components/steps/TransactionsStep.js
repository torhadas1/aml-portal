// --- File: src/components/steps/TransactionsStep.js ---
/**
 * @file TransactionsStep.js
 * @description Component for Step 8: Managing Transactions and Assets.
 */
import React from 'react';
import useReportStore, { initialTransactionState } from '../../store/useReportStore';
import TransactionForm from '../shared/TransactionForm';

const TransactionsStep = () => {
    const { reportData, addItemToArray, removeItemFromArray, updateItemInArrayField } = useReportStore((state) => ({
        reportData: state.reportData,
        addItemToArray: state.addItemToArray,
        removeItemFromArray: state.removeItemFromArray,
        updateItemInArrayField: state.updateItemInArrayField,
    }));

    const transactions = reportData.irregularReportEvent.irregularTransactions || [];

    const handleAddTransaction = () => {
        addItemToArray('irregularReportEvent.irregularTransactions', initialTransactionState());
    };

    const handleRemoveTransaction = (index) => {
        removeItemFromArray('irregularReportEvent.irregularTransactions', index);
    };

    const handleTransactionChange = (index, field, value) => {
        updateItemInArrayField('irregularReportEvent.irregularTransactions', index, field, value);
    };


    return (
        <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800">8. פעולות ונכסים (Transactions and Assets)</h2>
            <p className="text-sm text-gray-600">
                יש לדווח על כל הפעולות והנכסים הפיננסיים המעורבים. כל פעולה תזוהה על ידי מזהה ראשי ומשני.
                <br/>
                יש לוודא שבשלב 4 ('פרטי הדיווח ותוכן הידיעה') סומן "כן" בשדה "האם הדיווח מכיל פעולות".
            </p>

            <div className="p-4 border border-gray-200 rounded-md">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-indigo-700">רשימת פעולות</h3>
                    <button
                        onClick={handleAddTransaction}
                        className="px-3 py-1.5 bg-cyan-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-cyan-600"
                    >
                        + הוסף פעולה
                    </button>
                </div>
                {transactions.map((transaction, index) => (
                    <TransactionForm
                        key={transaction.reporterObjId || index}
                        transactionData={transaction}
                        transactionIndex={index}
                        onTransactionChange={handleTransactionChange}
                        onRemoveTransaction={() => handleRemoveTransaction(index)}
                        basePath={`irregularReportEvent.irregularTransactions.${index}`}
                    />
                ))}
                {transactions.length === 0 && <p className="text-xs text-gray-500">לא נוספו פעולות.</p>}
            </div>
        </div>
    );
};

export default TransactionsStep;