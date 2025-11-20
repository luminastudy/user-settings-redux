import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserSettings } from '@lumina-study/user-settings'

/**
 * Initial state for user settings with default values
 */
const initialState: UserSettings = {
  language: 'en',
  degreeId: null,
  institutionId: null,
  degreeTitle: null,
  fontFamily: null,
  shuffleQuestions: false,
  devMode: false,
}

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
      return action.payload
    },
    /**
     * Update the user interface language
     */
    setLanguage: (state, action: PayloadAction<UserSettings['language']>) => {
      state.language = action.payload
    },
    /**
     * Update the user's degree identifier
     */
    setDegreeId: (state, action: PayloadAction<UserSettings['degreeId']>) => {
      state.degreeId = action.payload
    },
    /**
     * Update the user's institution identifier
     */
    setInstitutionId: (
      state,
      action: PayloadAction<UserSettings['institutionId']>
    ) => {
      state.institutionId = action.payload
    },
    /**
     * Update the user's degree title
     */
    setDegreeTitle: (
      state,
      action: PayloadAction<UserSettings['degreeTitle']>
    ) => {
      state.degreeTitle = action.payload
    },
    /**
     * Update font family preference
     */
    setFontFamily: (
      state,
      action: PayloadAction<UserSettings['fontFamily']>
    ) => {
      state.fontFamily = action.payload
    },
    /**
     * Toggle shuffle questions setting
     */
    setShuffleQuestions: (
      state,
      action: PayloadAction<UserSettings['shuffleQuestions']>
    ) => {
      state.shuffleQuestions = action.payload
    },
    /**
     * Toggle dev mode
     */
    setDevMode: (state, action: PayloadAction<UserSettings['devMode']>) => {
      state.devMode = action.payload
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
  setDegreeId,
  setInstitutionId,
  setDegreeTitle,
  setFontFamily,
  setShuffleQuestions,
  setDevMode,
  updateUserSettings,
  resetUserSettings,
} = userSettingsSlice.actions

export default userSettingsSlice.reducer
