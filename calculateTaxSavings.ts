import currency from 'currency.js';

const TAXABLE_DEPRECIATION = 0.3;

interface savingsData {
    taxSaved: string,
    expenseAfterTaxSaved: string,
}

const INR = (value: number) => currency(value, { symbol: '₹', useVedic: true });

function calculateTaxSavings(income: number, expense: number, depreciationPercent: number) : savingsData {
    if(income < 5000000) {
        throw new Error('Not applicable for less than 50,00,000 income');
    }

    const depreciationAmount = expense * depreciationPercent / 100;

    const taxSaved =  INR(depreciationAmount * TAXABLE_DEPRECIATION);

    const expenseAfterTaxSaved = INR(expense).subtract(taxSaved);

    return {
        taxSaved: taxSaved.format(),
        expenseAfterTaxSaved: expenseAfterTaxSaved.format(),
    };
}

export default calculateTaxSavings;