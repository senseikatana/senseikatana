import { useState } from 'react';

export function Product() {
    const [getPrice, setPrice] = useState(0);

    function formatCurrency(
        amount: number,
        digits: number,
        moneda: 'EUR' | 'USD',
    ) {
        return new Intl.NumberFormat('en', {
            maximumFractionDigits: digits,
            minimumFractionDigits: digits,
            currency: moneda,
        }).format(setPrice(amount));
    }

    return (
        <>
            <p>{formatCurrency(getPrice, 2, 'EUR')}</p>
        </>
    );
}
