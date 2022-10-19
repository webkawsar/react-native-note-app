import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Input from "../components/Input";

const genderOptions = ["Male", "Female"];

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState("Male");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input placeholder="Full name" />
        <Input placeholder="Email address" />
        <Input placeholder="Password" secureTextEntry />
        <Input placeholder="Age" />

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
