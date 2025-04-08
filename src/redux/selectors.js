export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectExchangeInfo = state => state.currency.exchangeInfo;
export const selectRates = state => state.currency.rates;
export const selectFilter = state => state.filter.value;
export const selectIsLoading = state => state.currency.isLoading;
export const selectError = state => state.currency.error;
