// src/navigation/index.tsx
import HomeScreen from "@/app/features/home/todo/presentation/pages/home_screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
