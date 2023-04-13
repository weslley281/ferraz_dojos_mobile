import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

type AuthRoutes = {
  home: undefined;
};

//  export interface AuthNavigatorRoutesProps extends NativeStackNavigationProp<AuthRoutes> {}

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

export const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function HomeRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
      <Screen name="home" component={SignIn} />
    </Navigator>
  );
}
