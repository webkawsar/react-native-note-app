import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RadioInput = ({ label, value, setValue }) => {
  const selected = value === label;

  return (
    <TouchableOpacity style={styles.radioContainer} onPress={() => setValue(label)}>
      <View
        style={[styles.outerCircle, selected && styles.selectedOuterCircle]}
      >
        <View
          style={[styles.innerCircle, selected && styles.selectedInnerCircle]}
        />
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
});

export default RadioInput;
