import { NavigationContainer } from "@react-navigation/native";
import FeedListScreen from "./FeedListScreen";
import FeedScreen from "./FeedScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ErrorBoundary from "./ErrorBoundary";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ErrorBoundary fallbackView={null}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={FeedListScreen} />
          <Stack.Screen name="Feed" component={FeedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}

export default App
