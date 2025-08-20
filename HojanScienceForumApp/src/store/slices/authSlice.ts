import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserProfile } from '../../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isGuest: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isGuest = false;
      state.error = null;
    },
    setGuestUser: (state, action: PayloadAction<{ preferredLanguage: 'en' | 'fr' | 'ku-sorani' | 'ku-kurmanji' }>) => {
      state.user = {
        id: 'guest-' + Date.now(),
        name: 'Guest User',
        email: '',
        affiliation: '',
        researchInterests: [],
        biography: '',
        socialLinks: {},
        userType: 'guest',
        preferredLanguage: action.payload.preferredLanguage,
        isGuest: true,
      };
      state.isAuthenticated = true;
      state.isGuest = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isGuest = false;
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

export const { setLoading, setUser, setGuestUser, clearUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
