// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Khmer Central Khmer (`km`).
class AppLocalizationsKm extends AppLocalizations {
  AppLocalizationsKm([String locale = 'km']) : super(locale);

  @override
  String get appTitle => 'RentMee';

  @override
  String get dashboard => 'ផ្ទាំងគ្រប់គ្រង';

  @override
  String get properties => 'អចលនទ្រព្យ';

  @override
  String get tenants => 'អ្នកជួល';

  @override
  String get finances => 'ហិរញ្ញវត្ថុ';

  @override
  String get settings => 'ការកំណត់';

  @override
  String get language => 'ភាសា';

  @override
  String get selectLanguage => 'ជ្រើសរើសភាសា';

  @override
  String get choosePreferredLanguage =>
      'ជ្រើសរើសភាសាដែលអ្នកចង់បាន សម្រាប់ប្រភេទ app នេះ។';

  @override
  String get english => 'អង់គ្លេស';

  @override
  String get khmer => 'ខ្មែរ';

  @override
  String get languageChanged => 'ភាសាត្រូវបានផ្លាស់ប្តូរ';

  @override
  String languageChangedMessage(String languageName) {
    return 'ភាសាត្រូវបានផ្លាស់ប្តូរទៅ $languageName។';
  }

  @override
  String get ok => 'យល់ព្រម';

  @override
  String get note => 'សម្គាល់';

  @override
  String get languageChangeNote => 'ការផ្លាស់ប្តូរភាសានឹងមានប្រសិទ្ធភាពភ្លាមៗ។';
}
