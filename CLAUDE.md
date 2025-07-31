# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Flutter application called "rentmee" - currently a new Flutter project with the default counter app template. It supports multiple platforms: Android, iOS, Linux, macOS, Windows, and Web.

## Common Commands

### Development
- `flutter run` - Run the app on connected device/emulator
- `flutter run -d chrome` - Run in Chrome browser
- `flutter run -d macos` - Run on macOS desktop
- `flutter hot-reload` or press `r` - Hot reload changes
- `flutter hot-restart` or press `R` - Hot restart the app

### Dependencies
- `flutter pub get` - Install dependencies
- `flutter pub upgrade` - Upgrade dependencies
- `flutter pub outdated` - Check for outdated packages

### Testing and Analysis
- `flutter test` - Run unit and widget tests
- `flutter test test/widget_test.dart` - Run specific test file
- `flutter analyze` - Static analysis (lint checking)

### Building
- `flutter build apk` - Build Android APK
- `flutter build ios` - Build iOS app
- `flutter build web` - Build web version
- `flutter build macos` - Build macOS app
- `flutter build windows` - Build Windows app
- `flutter build linux` - Build Linux app

### Cleaning
- `flutter clean` - Clean build artifacts
- `flutter pub cache clean` - Clean pub cache

## Project Structure
- `lib/main.dart` - Main application entry point with MyApp and MyHomePage widgets
- `test/` - Widget and unit tests
- `pubspec.yaml` - Project configuration and dependencies
- `analysis_options.yaml` - Dart analyzer configuration with flutter_lints
- Platform-specific folders: `android/`, `ios/`, `web/`, `windows/`, `macos/`, `linux/`

## Current Architecture
Currently using the default Flutter template with:
- Material Design UI
- StatefulWidget pattern for state management
- Basic counter app functionality
- Standard Flutter project structure

## Development Notes
- Uses Flutter SDK ^3.8.1
- Includes flutter_lints for code quality
- Material Design with purple color scheme
- Cross-platform support enabled for all major platforms