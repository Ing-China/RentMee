import 'package:go_router/go_router.dart';
import '../pages/dashboard_page.dart';
import '../pages/properties_page.dart';
import '../pages/tenants_page.dart';
import '../pages/finances_page.dart';
import '../pages/settings_page.dart';
import '../pages/language_page.dart';
import '../widgets/main_scaffold.dart';
import '../../core/constants/app_constants.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: AppConstants.dashboardRoute,
  routes: [
    ShellRoute(
      builder: (context, state, child) {
        final currentRoute = state.uri.path;
        int selectedIndex = 0;
        
        switch (currentRoute) {
          case '/dashboard':
            selectedIndex = 0;
            break;
          case '/properties':
            selectedIndex = 1;
            break;
          case '/tenants':
            selectedIndex = 2;
            break;
          case '/finances':
            selectedIndex = 3;
            break;
          case '/settings':
            selectedIndex = 4;
            break;
        }
        
        return MainScaffold(
          selectedIndex: selectedIndex,
          child: child,
        );
      },
      routes: [
        GoRoute(
          path: AppConstants.dashboardRoute,
          name: 'dashboard',
          builder: (context, state) => const DashboardPage(),
        ),
        GoRoute(
          path: AppConstants.propertiesRoute,
          name: 'properties',
          builder: (context, state) => const PropertiesPage(),
        ),
        GoRoute(
          path: AppConstants.tenantsRoute,
          name: 'tenants',
          builder: (context, state) => const TenantsPage(),
        ),
        GoRoute(
          path: AppConstants.financesRoute,
          name: 'finances',
          builder: (context, state) => const FinancesPage(),
        ),
        GoRoute(
          path: AppConstants.settingsRoute,
          name: 'settings',
          builder: (context, state) => const SettingsPage(),
        ),
      ],
    ),
    GoRoute(
      path: '/language',
      name: 'language',
      builder: (context, state) => const LanguagePage(),
    ),
  ],
);