import type { UserSettings } from '@lumina-study/user-settings'

export interface RegisteredDegreeData {
  degreeId: string | null
  institutionId: string | null
  degreeTitle?: string | null
}

const REGISTERED_DEGREE_STORAGE_KEY = 'lumina-registered-degree'

/**
 * Save registered degree data to localStorage
 */
export function saveRegisteredDegreeToLocalStorage(
  data: RegisteredDegreeData
): void {
  try {
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(
      REGISTERED_DEGREE_STORAGE_KEY,
      JSON.stringify(dataWithTimestamp)
    )
  } catch (error) {
    console.warn('Failed to save registered degree to localStorage:', error)
  }
}

/**
 * Get registered degree data from localStorage
 */
export function getRegisteredDegreeFromLocalStorage(): RegisteredDegreeData {
  try {
    const stored = localStorage.getItem(REGISTERED_DEGREE_STORAGE_KEY)
    if (stored === null) {
      return { degreeId: null, institutionId: null }
    }
    return JSON.parse(stored)
  } catch (error) {
    console.warn(
      'Failed to retrieve registered degree from localStorage:',
      error
    )
    return { degreeId: null, institutionId: null }
  }
}

/**
 * Clear registered degree data from localStorage
 */
export function clearRegisteredDegreeFromLocalStorage(): void {
  try {
    localStorage.removeItem(REGISTERED_DEGREE_STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear registered degree from localStorage:', error)
  }
}

/**
 * Initialize registered degree from localStorage
 * Call this on app startup to load persisted degree data
 */
export function initializeRegisteredDegree(): RegisteredDegreeData {
  return getRegisteredDegreeFromLocalStorage()
}
