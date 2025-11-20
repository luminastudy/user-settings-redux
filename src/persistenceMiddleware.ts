import { Middleware } from '@reduxjs/toolkit'
import type { Storage } from 'unstorage'
import type { UserSettings } from '@lumina-study/user-settings'

/**
 * Storage key used for persisting user settings
 */
const STORAGE_KEY = 'user-settings'

/**
 * Creates a Redux middleware that persists user settings to unstorage
 *
 * This middleware:
 * - Listens for changes to the userSettings slice
 * - Automatically saves the state to the provided unstorage driver
 * - Debounces writes to prevent excessive storage operations
 *
 * @param storage - The unstorage instance to use for persistence
 * @returns Redux middleware function
 */
export function createPersistenceMiddleware(storage: Storage): Middleware {
  let writeTimeout: NodeJS.Timeout | null = null
  const DEBOUNCE_MS = 300

  return store => next => action => {
    // Execute the action first
    const result = next(action)

    // Check if the action is related to user settings
    const actionType = (action as { type: string }).type
    if (actionType?.startsWith('userSettings/')) {
      // Debounce the write operation
      if (writeTimeout) {
        clearTimeout(writeTimeout)
      }

      writeTimeout = setTimeout(async () => {
        const state = store.getState()
        const userSettings = state.userSettings as UserSettings

        try {
          await storage.setItem(STORAGE_KEY, userSettings)
        } catch (error) {
          console.error('Failed to persist user settings:', error)
        }
      }, DEBOUNCE_MS)
    }

    return result
  }
}

/**
 * Loads user settings from storage
 *
 * @param storage - The unstorage instance to read from
 * @returns The persisted user settings, or null if not found or invalid
 */
export async function loadPersistedSettings(
  storage: Storage
): Promise<UserSettings | null> {
  try {
    const settings = await storage.getItem<UserSettings>(STORAGE_KEY)
    return settings
  } catch (error) {
    console.error('Failed to load persisted user settings:', error)
    return null
  }
}

/**
 * Clears persisted user settings from storage
 *
 * @param storage - The unstorage instance to clear from
 */
export async function clearPersistedSettings(storage: Storage): Promise<void> {
  try {
    await storage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear persisted user settings:', error)
  }
}

export { STORAGE_KEY }
