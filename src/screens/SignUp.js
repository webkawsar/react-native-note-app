import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../App";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const genderOptions = ["Male", "Female"];
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const signUp = async () => {
    // at first create user
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        name,
        email,
        gender,
        age,
        uid: user.uid,
      });

      setLoading(false);
      showMessage({
        message: "Sign up successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error, "error");
      showMessage({
        message: "Error",
        type: "danger",
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
          <Input
            placeholder="Full name"
            autoCapitalize="words"
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Email address"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
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
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              onPress={signUp}
              title="Submit"
              customStyles={{ alignSelf: "center", marginBottom: 25 }}
            />
          )}
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
