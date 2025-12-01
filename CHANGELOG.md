# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-12-01

### Changed

- **BREAKING**: Removed `useDegreeId` hook
- **BREAKING**: Removed `setDegreeId` action from userSettingsSlice
- **BREAKING**: Removed `useRegisteredDegree.ts` and `registeredDegreeUtils.ts`
- Updated dependency `@lumina-study/user-settings` to ^1.0.0

## [0.1.1] - 2025-11-20

### Fixed

- Add TypeScript DOM library support for localStorage APIs in registeredDegreeUtils
- Add @types/react dev dependency to resolve React type imports in hooks
- Fix build errors preventing package compilation

## [0.1.0] - 2025-11-11

### Added

- Initial release of @lumina-study/user-settings-redux
- Redux store for user settings with Redux Toolkit
- Integration with unstorage for persistence
- Automatic persistence middleware with debouncing
- React hooks for easy component integration
- Full TypeScript support
- Comprehensive API documentation
