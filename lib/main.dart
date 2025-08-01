import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'presentation/router/app_router.dart';
import 'shared/theme/app_theme.dart';
import 'shared/providers/locale_provider.dart';
import 'l10n/app_localizations.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => LocaleProvider(),
      child: const RentMeeApp(),
    ),
  );
}

class RentMeeApp extends StatelessWidget {
  const RentMeeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<LocaleProvider>(
      builder: (context, localeProvider, child) {
        return MaterialApp.router(
          onGenerateTitle: (context) =>
              AppLocalizations.of(context)?.appTitle ?? 'RentMee',
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: ThemeMode.system,
          routerConfig: appRouter,
          debugShowCheckedModeBanner: false,
          locale: localeProvider.locale,
          supportedLocales: localeProvider.supportedLocales,
          localizationsDelegates: const [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
        );
      },
    );
  }
}
