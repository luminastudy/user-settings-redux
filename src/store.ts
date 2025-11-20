import { configureStore } from '@reduxjs/toolkit'
import type { Storage } from 'unstorage'
import userSettingsReducer, { setUserSettings } from './userSettingsSlice'
import {
  createPersistenceMiddleware,
  loadPersistedSettings,
} from './persistenceMiddleware'

/**
 * Configuration options for creating the user settings store
 */
export interface CreateStoreOptions {
  /**
   * The unstorage driver instance to use for persistence
   */
  storage: Storage

  /**
   * Additional Redux DevTools options
   */
  devTools?: boolean
}

/**
 * Creates and initializes the Redux store for user settings
 *
 * This function:
 * 1. Creates a Redux store with the userSettings reducer
 * 2. Adds persistence middleware using the provided unstorage driver
 * 3. Loads any existing persisted settings from storage
 * 4. Initializes the store with the loaded settings (if any)
 *
 * @param options - Configuration options including the storage driver
 * @returns A promise that resolves to the configured Redux store
 *
 * @example
 * ```typescript
 * import { createStorage } from 'unstorage';
 * import localStorageDriver from 'unstorage/drivers/localstorage';
 * import { createUserSettingsStore } from '@lumina-study/user-settings-redux';
 *
 * const storage = createStorage({
 *   driver: localStorageDriver({ base: 'app:' })
 * });
 *
 * const store = await createUserSettingsStore({ storage });
 * ```
 */
export async function createUserSettingsStore(options: CreateStoreOptions) {
  const { storage, devTools = true } = options

  // Create the persistence middleware
  const persistenceMiddleware = createPersistenceMiddleware(storage)

  // Create the store
  const store = configureStore({
    reducer: {
      userSettings: userSettingsReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        // Configure serialization check to ignore Storage objects
        serializableCheck: {
          ignoredActions: [],
          ignoredPaths: [],
        },
      }).concat(persistenceMiddleware),
    devTools,
  })

  // Load persisted settings and initialize the store
  const persistedSettings = await loadPersistedSettings(storage)
  if (persistedSettings) {
    store.dispatch(setUserSettings(persistedSettings))
  }

  return store
}

/**
 * Export type for the store
 */
export type UserSettingsStore = Awaited<
  ReturnType<typeof createUserSettingsStore>
>

/**
 * Export RootState type for use with hooks
 */
export type RootState = ReturnType<UserSettingsStore['getState']>

/**
 * Export AppDispatch type for use with hooks
 */
export type AppDispatch = UserSettingsStore['dispatch']
