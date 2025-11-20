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

  // Sync with Redux state on mount
  useEffect(() => {
    const stored = getRegisteredDegreeFromLocalStorage()
    if (stored.degreeId !== null) {
      dispatch(
        updateUserSettings({
          degreeId: stored.degreeId,
          institutionId: stored.institutionId,
          degreeTitle: stored.degreeTitle,
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
        dispatch(
          updateUserSettings({
            degreeId: degreeId,
            institutionId: institutionId,
            degreeTitle: degreeTitle || null,
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
      dispatch(
        updateUserSettings({
          degreeId: null,
          institutionId: null,
          degreeTitle: null,
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
