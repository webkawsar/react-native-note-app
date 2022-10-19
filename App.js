import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeCfEWdveQJ5dWiAfEkhEyvQOFyHuLGDo",
  authDomain: "note-app-4b18c.firebaseapp.com",
  projectId: "note-app-4b18c",
  storageBucket: "note-app-4b18c.appspot.com",
  messagingSenderId: "379143446878",
  appId: "1:379143446878:web:152f78d562d3359f1e6fcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


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
