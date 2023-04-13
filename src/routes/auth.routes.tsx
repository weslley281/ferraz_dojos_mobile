import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { AppRoutes } from './app.routes';

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
  home: undefined;
};

//  export interface AuthNavigatorRoutesProps extends NativeStackNavigationProp<AuthRoutes> {}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

export const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Screen name="signIn" component={SignIn} />

      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
