import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../core/constants/app_assets.dart';

class MainScaffold extends StatelessWidget {
  final Widget child;
  final int selectedIndex;

  const MainScaffold({
    super.key,
    required this.child,
    required this.selectedIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: selectedIndex,
        selectedItemColor: Theme.of(context).colorScheme.primary,
        unselectedItemColor: Colors.grey,
        onTap: (index) => _onItemTapped(context, index),
        items: [
          BottomNavigationBarItem(
            icon: SvgPicture.asset(
              AppAssets.dashboardIcon,
              width: 24,
              height: 24,
              colorFilter: ColorFilter.mode(
                selectedIndex == 0
                    ? Theme.of(context).colorScheme.primary
                    : Colors.grey,
                BlendMode.srcIn,
              ),
            ),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(
              AppAssets.propertiesIcon,
              width: 24,
              height: 24,
              colorFilter: ColorFilter.mode(
                selectedIndex == 1
                    ? Theme.of(context).colorScheme.primary
                    : Colors.grey,
                BlendMode.srcIn,
              ),
            ),
            label: 'Properties',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(
              AppAssets.tenantsIcon,
              width: 24,
              height: 24,
              colorFilter: ColorFilter.mode(
                selectedIndex == 2
                    ? Theme.of(context).colorScheme.primary
                    : Colors.grey,
                BlendMode.srcIn,
              ),
            ),
            label: 'Tenants',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(
              AppAssets.financesIcon,
              width: 24,
              height: 24,
              colorFilter: ColorFilter.mode(
                selectedIndex == 3
                    ? Theme.of(context).colorScheme.primary
                    : Colors.grey,
                BlendMode.srcIn,
              ),
            ),
            label: 'Finances',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(
              AppAssets.settingsIcon,
              width: 24,
              height: 24,
              colorFilter: ColorFilter.mode(
                selectedIndex == 4
                    ? Theme.of(context).colorScheme.primary
                    : Colors.grey,
                BlendMode.srcIn,
              ),
            ),
            label: 'Settings',
          ),
        ],
      ),
    );
  }

  void _onItemTapped(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/dashboard');
        break;
      case 1:
        context.go('/properties');
        break;
      case 2:
        context.go('/tenants');
        break;
      case 3:
        context.go('/finances');
        break;
      case 4:
        context.go('/settings');
        break;
    }
  }
}
