
export const formatCurrency = (value: number, currency: string = 'COP', locale: string = 'es-CO'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatNumber = (value: number, locale: string = 'es-CO'): string => {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
};
