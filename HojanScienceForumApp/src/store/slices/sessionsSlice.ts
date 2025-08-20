import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionsState, Session } from '../../types';

const initialState: SessionsState = {
  sessions: [],
  currentSession: null,
  userAgenda: [],
  loading: false,
  error: null,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSessions: (state, action: PayloadAction<Session[]>) => {
      state.sessions = action.payload;
      state.error = null;
    },
    setCurrentSession: (state, action: PayloadAction<Session | null>) => {
      state.currentSession = action.payload;
    },
    addToAgenda: (state, action: PayloadAction<string>) => {
      if (!state.userAgenda.includes(action.payload)) {
        state.userAgenda.push(action.payload);
      }
    },
    removeFromAgenda: (state, action: PayloadAction<string>) => {
      state.userAgenda = state.userAgenda.filter(id => id !== action.payload);
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

export const {
  setLoading,
  setSessions,
  setCurrentSession,
  addToAgenda,
  removeFromAgenda,
  setError,
  clearError,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
