import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({ placeholder, secureTextEntry, onChangeText }) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      onChangeText={onChangeText}
    />
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

export default Input;
