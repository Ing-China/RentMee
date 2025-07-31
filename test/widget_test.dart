// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';

import 'package:rentmee/main.dart';

void main() {
  testWidgets('RentMee app smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const RentMeeApp());

    // Verify that our app loads with the welcome message.
    expect(find.text('Welcome to RentMee'), findsOneWidget);
    expect(find.text('Your rental management solution'), findsOneWidget);

    // Verify the app bar title
    expect(find.text('RentMee'), findsOneWidget);
  });
}
