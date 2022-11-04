import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../App";
import LoginImage from "../../assets/login-2.png";
import Button from "../components/Button";
import Input from "../components/Input";

const SignIn = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      showMessage({
        message: "Sign in successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error, "signIn error");
      showMessage({
        message: "Sign in failed",
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={LoginImage}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginVertical: 20,
            }}
          />
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
          >
            Never forget your notes
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
          <Input
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 40,
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              onPress={signIn}
              title="Login"
              customStyles={{ alignSelf: "center", marginBottom: 25 }}
            />
          )}
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text>
              Don't have an account?{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  color: "green",
                  textDecorationLine: "underline",
                }}
              >
                Sign up
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
  },
});

export default SignIn;
