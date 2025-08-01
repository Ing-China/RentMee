import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocaleProvider extends ChangeNotifier {
  static const String _localeKey = 'selected_locale';
  Locale _locale = const Locale('en');

  Locale get locale => _locale;

  LocaleProvider() {
    _loadLocale();
  }

  void setLocale(Locale locale) async {
    if (_locale == locale) return;

    _locale = locale;
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_localeKey, locale.languageCode);
  }

  void _loadLocale() async {
    final prefs = await SharedPreferences.getInstance();
    final localeCode = prefs.getString(_localeKey);

    if (localeCode != null) {
      _locale = Locale(localeCode);
      notifyListeners();
    }
  }

  String getLanguageName() {
    switch (_locale.languageCode) {
      case 'en':
        return 'English';
      case 'km':
        return 'Khmer';
      default:
        return 'English';
    }
  }

  List<Locale> get supportedLocales => const [Locale('en'), Locale('km')];
}
