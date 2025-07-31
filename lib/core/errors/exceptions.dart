abstract class AppException implements Exception {
  final String message;
  final String? code;

  const AppException(this.message, {this.code});
}

class NetworkException extends AppException {
  const NetworkException(super.message, {super.code});
}

class ValidationException extends AppException {
  const ValidationException(super.message, {super.code});
}

class AuthException extends AppException {
  const AuthException(super.message, {super.code});
}