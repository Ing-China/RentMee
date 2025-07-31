import 'package:flutter/material.dart';
import '../../core/constants/app_constants.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        automaticallyImplyLeading: false,
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppConstants.defaultPadding),
              child: Column(
                children: [
                  const CircleAvatar(
                    radius: 40,
                    child: Icon(Icons.person, size: 40),
                  ),
                  const SizedBox(height: AppConstants.defaultPadding),
                  Text(
                    'John Doe',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Property Manager',
                    style: Theme.of(
                      context,
                    ).textTheme.bodyMedium?.copyWith(color: Colors.grey[600]),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: AppConstants.defaultPadding),
          _buildSettingsSection('Account', [
            _buildSettingsTile(
              icon: Icons.person_outline,
              title: 'Profile Settings',
              onTap: () {},
            ),
            _buildSettingsTile(
              icon: Icons.security,
              title: 'Security',
              onTap: () {},
            ),
            _buildSettingsTile(
              icon: Icons.notifications_outlined,
              title: 'Notifications',
              onTap: () {},
            ),
          ]),
          const SizedBox(height: AppConstants.defaultPadding),
          _buildSettingsSection('App Settings', [
            _buildSettingsTile(
              icon: Icons.dark_mode_outlined,
              title: 'Dark Mode',
              trailing: Switch(value: false, onChanged: (value) {}),
            ),
            _buildSettingsTile(
              icon: Icons.language,
              title: 'Language',
              subtitle: 'English',
              onTap: () {},
            ),
            _buildSettingsTile(
              icon: Icons.backup_outlined,
              title: 'Backup & Sync',
              onTap: () {},
            ),
          ]),
          const SizedBox(height: AppConstants.defaultPadding),
          _buildSettingsSection('Support', [
            _buildSettingsTile(
              icon: Icons.help_outline,
              title: 'Help & Support',
              onTap: () {},
            ),
            _buildSettingsTile(
              icon: Icons.feedback_outlined,
              title: 'Send Feedback',
              onTap: () {},
            ),
            _buildSettingsTile(
              icon: Icons.info_outline,
              title: 'About',
              onTap: () {},
            ),
          ]),
          const SizedBox(height: AppConstants.defaultPadding),
          _buildSettingsTile(
            icon: Icons.logout,
            title: 'Logout',
            titleColor: Colors.red,
            onTap: () {},
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, bottom: 8),
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Colors.grey,
            ),
          ),
        ),
        Card(child: Column(children: children)),
      ],
    );
  }

  Widget _buildSettingsTile({
    required IconData icon,
    required String title,
    String? subtitle,
    Widget? trailing,
    Color? titleColor,
    VoidCallback? onTap,
  }) {
    return ListTile(
      leading: Icon(icon, color: titleColor),
      title: Text(title, style: TextStyle(color: titleColor)),
      subtitle: subtitle != null ? Text(subtitle) : null,
      trailing: trailing ?? const Icon(Icons.arrow_forward_ios, size: 16),
      onTap: onTap,
    );
  }
}
