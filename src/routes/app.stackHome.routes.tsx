import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Dashboard } from '@screens/Dashboard';

export const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackHomeRoutes() {
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
}
