import { describe, it, expect } from 'vitest'
import * as exports from './index'

describe('index exports', () => {
  it('should export store creation functions', () => {
    expect(exports.createUserSettingsStore).toBeDefined()
  })

  it('should export slice actions', () => {
    expect(exports.setUserSettings).toBeDefined()
    expect(exports.setLanguage).toBeDefined()
    expect(exports.updateUserSettings).toBeDefined()
    expect(exports.resetUserSettings).toBeDefined()
    expect(exports.userSettingsSlice).toBeDefined()
    expect(exports.userSettingsReducer).toBeDefined()
  })

  it('should export persistence utilities', () => {
    expect(exports.createPersistenceMiddleware).toBeDefined()
    expect(exports.loadPersistedSettings).toBeDefined()
    expect(exports.clearPersistedSettings).toBeDefined()
    expect(exports.STORAGE_KEY).toBeDefined()
  })

  it('should export hooks', () => {
    expect(exports.useAppDispatch).toBeDefined()
    expect(exports.useAppSelector).toBeDefined()
    expect(exports.useUserSettings).toBeDefined()
    expect(exports.useLanguage).toBeDefined()
  })
})
