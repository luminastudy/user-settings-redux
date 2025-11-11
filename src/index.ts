/**
 * @lumina-study/user-settings-redux
 *
 * Redux store for Lumina Study user settings with unstorage persistence
 */

// Export store creation and types
export {
  createUserSettingsStore,
  type CreateStoreOptions,
  type UserSettingsStore,
  type RootState,
  type AppDispatch,
} from './store';

// Export slice actions and reducer
export {
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
  userSettingsSlice,
} from './userSettingsSlice';
export { default as userSettingsReducer } from './userSettingsSlice';

// Export persistence utilities
export {
  createPersistenceMiddleware,
  loadPersistedSettings,
  clearPersistedSettings,
  STORAGE_KEY,
} from './persistenceMiddleware';

// Export hooks
export {
  useAppDispatch,
  useAppSelector,
  useUserSettings,
  useLanguage,
  useDegreeId,
} from './hooks';

// Export registered degree utilities
export {
  initializeRegisteredDegree,
  saveRegisteredDegreeToLocalStorage,
  getRegisteredDegreeFromLocalStorage,
  clearRegisteredDegreeFromLocalStorage,
  type RegisteredDegreeData,
} from './registeredDegreeUtils';

// Export registered degree hook
export { useRegisteredDegree, type UseRegisteredDegreeReturn } from './useRegisteredDegree';

// Re-export types from user-settings package
export type { UserSettings } from '@lumina-study/user-settings';
