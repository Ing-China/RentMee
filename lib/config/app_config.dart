class AppConfig {
  static const String appName = 'RentMee';
  static const String appVersion = '1.0.0';

  // API Configuration
  static const String baseUrl = 'https://api.rentmee.com';
  static const int connectTimeout = 30000;
  static const int receiveTimeout = 30000;

  // Debug flags
  static const bool enableLogging = true;
  static const bool enableNetworkLogging = true;
}
