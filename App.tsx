import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, dishDetails } from "./types/types";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screenadd } from "./component/Add";
import { Screenmenu } from "./component/Home";
import { FilterScreen } from "./component/Filter";

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screenmenu">
        <Stack.Screen name="Screenmenu" component={Screenmenu}></Stack.Screen>
        <Stack.Screen name="Screenadd" component={Screenadd}></Stack.Screen>
        <Stack.Screen
          name="FilterScreen"
          component={FilterScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;