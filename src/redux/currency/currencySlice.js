import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeInfo,
  fetchLatestRates,
} from './currencyOps';

const handlePending = state => {
  state.error = null;
  state.isLoading = true;
};
const handleError = (state, { payload }) => {
  state.isLoading = false;
  if (payload === 'We already have base currency!') {
    return;
  }
  state.error = payload;
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    rates: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setDefaultBaseCurrency(state, { payload }) {
      state.baseCurrency = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBaseCurrency.pending, handlePending)
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
        state.isLoading = false;
      })
      .addCase(fetchBaseCurrency.rejected, handleError)
      .addCase(fetchExchangeInfo.pending, handlePending)
      .addCase(fetchExchangeInfo.fulfilled, (state, { payload }) => {
        state.exchangeInfo = payload;
        state.isLoading = false;
      })
      .addCase(fetchExchangeInfo.rejected, handleError)
      .addCase(fetchLatestRates.pending, handlePending)
      .addCase(fetchLatestRates.fulfilled, (state, { payload }) => {
        state.rates = payload;
        state.isLoading = false;
      })
      .addCase(fetchLatestRates.rejected, handleError);
  },
});

export const { setDefaultBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
