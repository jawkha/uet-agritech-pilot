/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './src/services/bgMessaging';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
