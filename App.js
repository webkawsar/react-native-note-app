import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import firebaseConfig from "./src/config";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export default function App() {
  const Stack = createNativeStackNavigator();
  const user = false;
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backgroundColor: "#fff",
    },
  };

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Edit" component={Edit} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
