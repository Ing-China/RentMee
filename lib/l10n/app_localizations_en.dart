// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'RentMee';

  @override
  String get dashboard => 'Dashboard';

  @override
  String get properties => 'Properties';

  @override
  String get tenants => 'Tenants';

  @override
  String get finances => 'Finances';

  @override
  String get settings => 'Settings';

  @override
  String get language => 'Language';

  @override
  String get selectLanguage => 'Select Language';

  @override
  String get choosePreferredLanguage =>
      'Choose your preferred language for the app interface.';

  @override
  String get english => 'English';

  @override
  String get khmer => 'Khmer';

  @override
  String get languageChanged => 'Language Changed';

  @override
  String languageChangedMessage(String languageName) {
    return 'Language has been changed to $languageName.';
  }

  @override
  String get ok => 'OK';

  @override
  String get note => 'Note';

  @override
  String get languageChangeNote =>
      'Language changes will take effect immediately.';
}
