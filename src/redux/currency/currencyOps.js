import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrence',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }

    try {
      const baseCurrency = await getUserInfo(coords);
      return baseCurrency;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
export const fetchExchangeInfo = createAsyncThunk(
  'currency/fetchExchangeInfo',
  async (credentials, thunkAPI) => {
    try {
      const data = await exchangeCurrency(credentials);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
export const fetchLatestRates = createAsyncThunk(
  'currency/fetchLatestRates',
  async (baseCurrency, thunkAPI) => {
    try {
      const data = await latestRates(baseCurrency);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
