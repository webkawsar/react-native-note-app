import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../App";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";

const Create = ({navigation, route, user}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const noteColorOptions = ["red", "green", "blue"];
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  const createNote = async () => {
    try {

      setLoading(true);
      await addDoc(collection(db, 'notes'), {
        title,
        description,
        color: noteColor,
        uid: user.uid
      })

      showMessage({
        message: 'Note created successfully',
        type: 'success'
      })

      setLoading(false);
      navigation.goBack();
      
    } catch (error) {
      
      showMessage({
        message: 'Server Error',
        type: 'danger'
      })
      setLoading(false);
    }    
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />

        <View style={{ marginVertical: 15 }}>
          <Text>Select your note color</Text>
        </View>
        {noteColorOptions.map((color, index) => {
          return (
            <RadioInput
              key={index}
              label={color}
              value={noteColor}
              setValue={setNoteColor}
            />
          );
        })}

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            onPress={createNote}
            title="Submit"
            customStyles={{ alignSelf: "center", marginTop: 60, width: '100%' }}
          />
        )}
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
