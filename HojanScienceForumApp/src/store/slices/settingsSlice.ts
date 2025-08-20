import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode } from '../../types';

export type ThemePreference = 'system' | 'light' | 'dark';

export interface SettingsState {
  theme: ThemePreference;
  language: LanguageCode;
  notificationsEnabled: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
}

const initialState: SettingsState = {
  theme: 'system',
  language: 'en',
  notificationsEnabled: true,
  pushNotifications: true,
  emailNotifications: true,
  soundEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemePreference>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.language = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setPushNotifications: (state, action: PayloadAction<boolean>) => {
      state.pushNotifications = action.payload;
    },
    setEmailNotifications: (state, action: PayloadAction<boolean>) => {
      state.emailNotifications = action.payload;
    },
    setSoundEnabled: (state, action: PayloadAction<boolean>) => {
      state.soundEnabled = action.payload;
    },
  },
});

export const { 
  setTheme, 
  setLanguage, 
  setNotificationsEnabled,
  setPushNotifications,
  setEmailNotifications,
  setSoundEnabled
} = settingsSlice.actions;
export default settingsSlice.reducer;


