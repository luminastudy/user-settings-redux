# @lumina-study/user-settings-redux

Redux store for Lumina Study user settings with unstorage persistence.

This package provides a ready-to-use Redux store that manages user settings (language, degree ID) with automatic persistence using [unstorage](https://unstorage.unjs.io/). Changes to the store are automatically synced to your chosen storage backend (localStorage, IndexedDB, file system, etc.).

## Features

- Redux Toolkit-based store for user settings
- Automatic persistence with unstorage
- TypeScript support with full type safety
- React hooks for easy integration
- Debounced storage writes for performance
- Support for any unstorage driver

## Installation

```bash
pnpm add @lumina-study/user-settings-redux
# or
npm install @lumina-study/user-settings-redux
```

## Quick Start

### 1. Create the Store

```typescript
import { createStorage } from 'unstorage';
import localStorageDriver from 'unstorage/drivers/localstorage';
import { createUserSettingsStore } from '@lumina-study/user-settings-redux';

// Create an unstorage instance with your preferred driver
const storage = createStorage({
  driver: localStorageDriver({ base: 'lumina:' })
});

// Create the Redux store (async - loads persisted settings)
const store = await createUserSettingsStore({ storage });
```

### 2. Integrate with React

```typescript
import { Provider } from 'react-redux';
import { createStorage } from 'unstorage';
import localStorageDriver from 'unstorage/drivers/localstorage';
import { createUserSettingsStore } from '@lumina-study/user-settings-redux';

// Create storage and store
const storage = createStorage({
  driver: localStorageDriver({ base: 'lumina:' })
});

const store = await createUserSettingsStore({ storage });

// Wrap your app with the Provider
function App() {
  return (
    <Provider store={store}>
      <YourApp />
    </Provider>
  );
}
```

### 3. Use in Components

```typescript
import {
  useUserSettings,
  useLanguage,
  useDegreeId,
} from '@lumina-study/user-settings-redux';

function UserSettingsComponent() {
  // Get all settings
  const settings = useUserSettings();

  // Or use specific hooks
  const [language, setLanguage] = useLanguage();
  const [degreeId, setDegreeId] = useDegreeId();

  return (
    <div>
      <p>Current Language: {language}</p>
      <button onClick={() => setLanguage('he')}>עברית</button>
      <button onClick={() => setLanguage('en')}>English</button>

      <p>Degree ID: {degreeId || 'Not set'}</p>
      <button onClick={() => setDegreeId('degree-123')}>
        Set Degree
      </button>
    </div>
  );
}
```

## Storage Drivers

You can use any [unstorage driver](https://unstorage.unjs.io/drivers). Here are some examples:

### Browser localStorage

```typescript
import { createStorage } from 'unstorage';
import localStorageDriver from 'unstorage/drivers/localstorage';

const storage = createStorage({
  driver: localStorageDriver({ base: 'lumina:' })
});
```

### Browser IndexedDB

```typescript
import { createStorage } from 'unstorage';
import indexedDbDriver from 'unstorage/drivers/indexedb';

const storage = createStorage({
  driver: indexedDbDriver({ base: 'lumina:' })
});
```

### Node.js File System

```typescript
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';

const storage = createStorage({
  driver: fsDriver({ base: './.data' })
});
```

### Memory (for testing)

```typescript
import { createStorage } from 'unstorage';

const storage = createStorage(); // Uses memory driver by default
```

## API Reference

### Store Creation

#### `createUserSettingsStore(options)`

Creates and initializes the Redux store with persistence.

**Parameters:**
- `options.storage` (required): The unstorage instance to use for persistence
- `options.devTools` (optional): Enable Redux DevTools (default: `true`)

**Returns:** Promise<Store> - The configured Redux store

### Actions

#### `setUserSettings(settings: UserSettings)`

Set the complete user settings state.

```typescript
import { setUserSettings } from '@lumina-study/user-settings-redux';

dispatch(setUserSettings({ language: 'he', degreeId: 'degree-123' }));
```

#### `setLanguage(language: 'he' | 'en')`

Update the user interface language.

```typescript
import { setLanguage } from '@lumina-study/user-settings-redux';

dispatch(setLanguage('he'));
```

#### `setDegreeId(degreeId: string | null)`

Update the user's degree identifier.

```typescript
import { setDegreeId } from '@lumina-study/user-settings-redux';

dispatch(setDegreeId('degree-123'));
```

#### `resetUserSettings()`

Reset settings to default values.

```typescript
import { resetUserSettings } from '@lumina-study/user-settings-redux';

dispatch(resetUserSettings());
```

### Hooks

#### `useUserSettings()`

Access the complete user settings state.

```typescript
const settings = useUserSettings();
// { language: 'en', degreeId: null }
```

#### `useLanguage()`

Access and update the language setting.

```typescript
const [language, setLanguage] = useLanguage();
setLanguage('he');
```

#### `useDegreeId()`

Access and update the degree ID setting.

```typescript
const [degreeId, setDegreeId] = useDegreeId();
setDegreeId('degree-123');
```

#### `useAppDispatch()`

Typed dispatch hook.

```typescript
const dispatch = useAppDispatch();
dispatch(setLanguage('en'));
```

#### `useAppSelector(selector)`

Typed selector hook.

```typescript
const language = useAppSelector((state) => state.userSettings.language);
```

### Utilities

#### `loadPersistedSettings(storage)`

Manually load settings from storage.

```typescript
import { loadPersistedSettings } from '@lumina-study/user-settings-redux';

const settings = await loadPersistedSettings(storage);
```

#### `clearPersistedSettings(storage)`

Clear persisted settings from storage.

```typescript
import { clearPersistedSettings } from '@lumina-study/user-settings-redux';

await clearPersistedSettings(storage);
```

## TypeScript

The package is fully typed and exports all necessary types:

```typescript
import type {
  UserSettings,
  RootState,
  AppDispatch,
  UserSettingsStore,
  CreateStoreOptions,
} from '@lumina-study/user-settings-redux';
```

## How Persistence Works

1. **Initialization**: When you create the store, it automatically loads any previously saved settings from the storage driver
2. **Auto-save**: Any action that modifies the user settings state triggers an automatic save to storage (debounced by 300ms)
3. **Persistence Key**: Settings are stored under the key `'user-settings'` in your storage backend

## Advanced Usage

### Direct Store Usage (without React)

```typescript
import { createUserSettingsStore, setLanguage } from '@lumina-study/user-settings-redux';

const store = await createUserSettingsStore({ storage });

// Subscribe to changes
store.subscribe(() => {
  console.log('Settings updated:', store.getState().userSettings);
});

// Dispatch actions
store.dispatch(setLanguage('he'));
```

### Custom Middleware

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { userSettingsReducer, createPersistenceMiddleware } from '@lumina-study/user-settings-redux';

const store = configureStore({
  reducer: {
    userSettings: userSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(createPersistenceMiddleware(storage))
      .concat(yourCustomMiddleware),
});
```

## Development

### Building

```bash
pnpm install
pnpm run build
```

This will compile TypeScript files to the `dist` directory.

### Publishing

#### Automated Publishing (Recommended)

The package is automatically published to npm when pushing to the `main` branch via GitHub Actions.

**Setup:**

1. Create an npm access token:
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token" → "Automation"
   - Copy the token

2. Add the token to GitHub:
   - Go to your repository settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token

3. Update the version in `package.json`

4. Push to main:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore: bump version to x.x.x"
   git push origin main
   ```

The CI/CD workflow will:
- Run tests
- Build the package
- Publish to npm (if version changed)
- Create a git tag
- Create a GitHub release

#### Manual Publishing

You can also publish manually using [release-it](https://github.com/release-it/release-it):

```bash
# Dry run
pnpm run release:dry

# Create a release
pnpm run release
```

## License

MIT

## Related Packages

- [@lumina-study/user-settings](https://github.com/luminastudy/user-settings) - JSON schema and TypeScript types for user settings
