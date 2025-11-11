import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserSettings } from '@lumina-study/user-settings';

/**
 * Initial state for user settings with default values
 */
const initialState: UserSettings = {
  language: 'en',
  degreeId: null,
};

/**
 * Redux slice for user settings
 * Manages the state of user preferences including language and degree selection
 */
export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    /**
     * Set the complete user settings state
     * Used primarily when loading persisted settings from storage
     */
    setUserSettings: (state, action: PayloadAction<UserSettings>) => {
      return action.payload;
    },
    /**
     * Update the user interface language
     */
    setLanguage: (state, action: PayloadAction<UserSettings['language']>) => {
      state.language = action.payload;
    },
    /**
     * Update the user's degree identifier
     */
    setDegreeId: (state, action: PayloadAction<UserSettings['degreeId']>) => {
      state.degreeId = action.payload;
    },
    /**
     * Reset settings to default values
     */
    resetUserSettings: () => {
      return initialState;
    },
  },
});

export const {
  setUserSettings,
  setLanguage,
  setDegreeId,
  resetUserSettings,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
