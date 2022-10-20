import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backgroundColor: "#fff",
    },
  };

  useEffect(() => {

    const authSubscription = onAuthStateChanged(auth, (authenticatedUser) => {
      if(authenticatedUser) {

        setUser(authenticatedUser);
        setLoading(false);
      } else {
        
        setUser(null);
        setLoading(false)
      }
    });

    return authSubscription;

  }, [])

  // useEffect(() => {
  //   signOut(auth)
  // }, [])


  if(loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color='blue' size='large' />
      </View>
    )
  }

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Edit" component={Edit} />
          </>
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
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
