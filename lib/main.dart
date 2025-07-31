import 'package:flutter/material.dart';
import 'config/app_config.dart';
import 'presentation/router/app_router.dart';
import 'shared/theme/app_theme.dart';

void main() {
  runApp(const RentMeeApp());
}

class RentMeeApp extends StatelessWidget {
  const RentMeeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: AppConfig.appName,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      routerConfig: appRouter,
      debugShowCheckedModeBanner: false,
    );
  }
}
