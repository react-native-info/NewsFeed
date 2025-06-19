import { NavigationContainer } from "@react-navigation/native";
import FeedListScreen from "./FeedListScreen";
import FeedScreen from "./FeedScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ErrorBoundary from "./ErrorBoundary";
import ErrorScreen from "./ErrorScreen";
import useThemedColors from "./useThemedColors";

const Stack = createNativeStackNavigator();

const App = () => {
  const themedColors = useThemedColors();
  const screenOptions = {
    headerStyle: { backgroundColor: themedColors.background },
    headerTitleStyle: { color: themedColors.text },
    contentStyle: { backgroundColor: themedColors.background },
  }

  return (
    <ErrorBoundary fallbackView={<ErrorScreen />}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={FeedListScreen}
            options={screenOptions}
          />
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={screenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}

export default App
