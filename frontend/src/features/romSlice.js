import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/axios';

const initialState = {
  roms: [],
  loading: false,
  error: null,
};

export const fetchRoms = createAsyncThunk('roms/fetchRoms', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/roms');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch ROMs');
  }
});

export const syncRom = createAsyncThunk('roms/syncRom', async (metadata, { rejectWithValue }) => {
  try {
    const response = await api.post('/roms', metadata);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to sync ROM metadata');
  }
});

const romSlice = createSlice({
  name: 'roms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoms.fulfilled, (state, action) => {
        state.loading = false;
        state.roms = action.payload;
      })
      .addCase(fetchRoms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(syncRom.fulfilled, (state, action) => {
        const index = state.roms.findIndex(r => r.romHash === action.payload.romHash);
        if (index !== -1) {
          state.roms[index] = action.payload;
        } else {
          state.roms.unshift(action.payload);
        }
      });
  },
});

export default romSlice.reducer;
