import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const noteColorOptions = ["red", "green", "blue"];
  const [noteColor, setNoteColor] = useState("blue");

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />

        {
          noteColorOptions.map((color, index) => {
            return (
              <RadioInput
                key={index}
                label={color}
                value={noteColor}
                setValue={setNoteColor}
              />
            )
          })         
        }

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

export default Create;
