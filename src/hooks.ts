import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed version of useDispatch hook for use throughout the app
 *
 * @example
 * ```typescript
 * const dispatch = useAppDispatch();
 * dispatch(setLanguage('he'));
 * ```
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typed version of useSelector hook for use throughout the app
 *
 * @example
 * ```typescript
 * const language = useAppSelector((state) => state.userSettings.language);
 * ```
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook to access user settings from the store
 *
 * @returns The current user settings state
 *
 * @example
 * ```typescript
 * const { language, degreeId } = useUserSettings();
 * ```
 */
export function useUserSettings() {
  return useAppSelector((state) => state.userSettings);
}

/**
 * Custom hook to access and update the language setting
 *
 * @returns A tuple containing the current language and a setter function
 *
 * @example
 * ```typescript
 * const [language, setLang] = useLanguage();
 *
 * // Update language
 * setLang('he');
 * ```
 */
export function useLanguage() {
  const language = useAppSelector((state) => state.userSettings.language);
  const dispatch = useAppDispatch();

  const setLang = (newLanguage: 'he' | 'en') => {
    const { setLanguage } = require('./userSettingsSlice');
    dispatch(setLanguage(newLanguage));
  };

  return [language, setLang] as const;
}

/**
 * Custom hook to access and update the degree ID setting
 *
 * @returns A tuple containing the current degree ID and a setter function
 *
 * @example
 * ```typescript
 * const [degreeId, setDegree] = useDegreeId();
 *
 * // Update degree ID
 * setDegree('degree-123');
 * ```
 */
export function useDegreeId() {
  const degreeId = useAppSelector((state) => state.userSettings.degreeId);
  const dispatch = useAppDispatch();

  const setDegree = (newDegreeId: string | null) => {
    const { setDegreeId } = require('./userSettingsSlice');
    dispatch(setDegreeId(newDegreeId));
  };

  return [degreeId, setDegree] as const;
}
