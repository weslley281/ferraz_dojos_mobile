import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from '@screens/Dashboard';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

export const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
