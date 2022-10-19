import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";

const auth = getAuth();
const genderOptions = ["Male", "Female"];

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const signUp = () => {

    // at first create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        // Signed in
        const user = userCredential.user;
        // create user profile

        console.log('user => ', user)

      })
      .catch((error) => {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        
        
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input placeholder="Full name" onChangeText={(text) => setName(text)} />
        <Input
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />

        <View style={{ marginVertical: 20 }}>
          <Text>Select gender</Text>
        </View>

        {genderOptions.map((option) => {
          const selected = option === gender;

          return (
            <Pressable
              key={option}
              style={styles.radioContainer}
              onPress={() => setGender(option)}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}
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
          onPress={signUp}
          title="Submit"
          customStyles={{ alignSelf: "center", marginBottom: 25 }}
        />
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text>
            Already have an account?{" "}
            <Text
              style={{
                fontWeight: "bold",
                color: "green",
                textDecorationLine: "underline",
              }}
            >
              Sign in
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
  },
  outerCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioText: {},
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
});

export default SignUp;
