import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_constants.dart';
import '../../l10n/app_localizations.dart';
import '../../shared/providers/locale_provider.dart';

class LanguagePage extends StatefulWidget {
  const LanguagePage({super.key});

  @override
  State<LanguagePage> createState() => _LanguagePageState();
}

class _LanguagePageState extends State<LanguagePage> {
  final List<LanguageOption> languages = [
    LanguageOption(name: 'English', code: 'en', flag: '🇺🇸'),
    LanguageOption(name: 'Khmer', code: 'km', flag: '🇰🇭'),
  ];

  @override
  Widget build(BuildContext context) {
    return Consumer<LocaleProvider>(
      builder: (context, localeProvider, child) {
        return Scaffold(
          appBar: AppBar(
            title: Text(AppLocalizations.of(context)!.language),
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => context.pop(),
            ),
          ),
          body: ListView(
            padding: const EdgeInsets.all(AppConstants.defaultPadding),
            children: [
              Card(
                child: Column(
                  children: languages.map((language) {
                    final isSelected =
                        localeProvider.locale.languageCode == language.code;
                    return ListTile(
                      leading: Text(
                        language.flag,
                        style: const TextStyle(fontSize: 24),
                      ),
                      title: Text(
                        language.name,
                        style: TextStyle(
                          fontWeight: isSelected
                              ? FontWeight.w600
                              : FontWeight.normal,
                        ),
                      ),
                      subtitle: Text(language.code.toUpperCase()),
                      trailing: isSelected
                          ? Icon(
                              Icons.check_circle,
                              color: Theme.of(context).colorScheme.primary,
                            )
                          : const Icon(Icons.radio_button_unchecked),
                      onTap: () {
                        localeProvider.setLocale(Locale(language.code));
                      },
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class LanguageOption {
  final String name;
  final String code;
  final String flag;

  LanguageOption({required this.name, required this.code, required this.flag});
}
