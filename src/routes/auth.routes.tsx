import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

export const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Screen name="signIn" component={SignIn} />

      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
