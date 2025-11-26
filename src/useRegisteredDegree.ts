import { useCallback, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { updateUserSettings } from './userSettingsSlice'
import {
  type RegisteredDegreeData,
  saveRegisteredDegreeToLocalStorage,
  getRegisteredDegreeFromLocalStorage,
  clearRegisteredDegreeFromLocalStorage,
} from './registeredDegreeUtils'

export interface UseRegisteredDegreeReturn {
  registeredDegree: RegisteredDegreeData
  setRegisteredDegree: (
    degreeId: string | null,
    institutionId: string | null,
    degreeTitle?: string
  ) => void
  clearRegisteredDegree: () => void
  isDegreeRegistered: (degreeId: string) => boolean
  isUpdating: boolean
}

/**
 * Hook for managing registered degree with localStorage and Redux sync
 *
 * Note: institutionId and degreeTitle are stored in localStorage only,
 * not in Redux UserSettings (which only has language and degreeId)
 */
export function useRegisteredDegree(): UseRegisteredDegreeReturn {
  const dispatch = useAppDispatch()
  const userSettings = useAppSelector(state => state.userSettings)

  const [registeredDegree, setRegisteredDegreeState] =
    useState<RegisteredDegreeData>(() => {
      const stored = getRegisteredDegreeFromLocalStorage()
      return stored
    })

  const [isUpdating, setIsUpdating] = useState(false)

  // Sync degreeId with Redux state on mount
  useEffect(() => {
    const stored = getRegisteredDegreeFromLocalStorage()
    if (stored.degreeId !== null) {
      dispatch(
        updateUserSettings({
          degreeId: stored.degreeId,
        })
      )
    }
  }, [dispatch])

  const setRegisteredDegree = useCallback(
    (
      degreeId: string | null,
      institutionId: string | null,
      degreeTitle?: string
    ) => {
      setIsUpdating(true)
      try {
        const newData: RegisteredDegreeData = {
          degreeId,
          institutionId,
          degreeTitle,
        }
        setRegisteredDegreeState(newData)
        saveRegisteredDegreeToLocalStorage(newData)
        // Only sync degreeId to Redux (UserSettings only has language and degreeId)
        dispatch(
          updateUserSettings({
            degreeId: degreeId,
          })
        )
      } finally {
        setIsUpdating(false)
      }
    },
    [dispatch]
  )

  const clearRegisteredDegree = useCallback(() => {
    setIsUpdating(true)
    try {
      const emptyData: RegisteredDegreeData = {
        degreeId: null,
        institutionId: null,
      }
      setRegisteredDegreeState(emptyData)
      clearRegisteredDegreeFromLocalStorage()
      // Only sync degreeId to Redux (UserSettings only has language and degreeId)
      dispatch(
        updateUserSettings({
          degreeId: null,
        })
      )
    } finally {
      setIsUpdating(false)
    }
  }, [dispatch])

  const isDegreeRegistered = useCallback(
    (degreeId: string): boolean => {
      return registeredDegree.degreeId === degreeId
    },
    [registeredDegree.degreeId]
  )

  return {
    registeredDegree,
    setRegisteredDegree,
    clearRegisteredDegree,
    isDegreeRegistered,
    isUpdating,
  }
}
