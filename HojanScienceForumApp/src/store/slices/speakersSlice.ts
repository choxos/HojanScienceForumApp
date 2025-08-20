import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpeakersState, Speaker } from '../../types';

const initialState: SpeakersState = {
  speakers: [],
  loading: false,
  error: null,
};

const speakersSlice = createSlice({
  name: 'speakers',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSpeakers: (state, action: PayloadAction<Speaker[]>) => {
      state.speakers = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setSpeakers, setError, clearError } = speakersSlice.actions;
export default speakersSlice.reducer;
