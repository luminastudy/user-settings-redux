import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserSettings } from '@lumina-study/user-settings'

/**
 * Initial state for user settings with default values
 */
const initialState: UserSettings = {
  language: 'en',
}

/**
 * Redux slice for user settings
 * Manages the state of user preferences including language
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
      return action.payload
    },
    /**
     * Update the user interface language
     */
    setLanguage: (state, action: PayloadAction<UserSettings['language']>) => {
      state.language = action.payload
    },
    /**
     * Update partial user settings
     */
    updateUserSettings: (
      state,
      action: PayloadAction<Partial<UserSettings>>
    ) => {
      return { ...state, ...action.payload }
    },
    /**
     * Reset settings to default values
     */
    resetUserSettings: () => {
      return initialState
    },
  },
})

export const {
  setUserSettings,
  setLanguage,
  updateUserSettings,
  resetUserSettings,
} = userSettingsSlice.actions

export default userSettingsSlice.reducer
