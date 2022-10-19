import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginImage from "../../assets/login-2.png";
import Button from "../components/Button";
import Input from "../components/Input";

const SignIn = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          Never forget your notes
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input placeholder="Email" />
        <Input placeholder="Password" secureTextEntry />
      </View>

      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 40,
        }}
      >
        <Button
          title="Login"
          customStyles={{ alignSelf: "center", marginBottom: 25 }}
        />
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
