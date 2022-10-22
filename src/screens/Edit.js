import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../App";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";

const Edit = ({navigation, route, user}) => {
  const item = route.params.item;
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const noteColorOptions = ["red", "green", "blue"];
  const [noteColor, setNoteColor] = useState(item.color);
  const [loading, setLoading] = useState(false);

  const updateNote = async () => {
    try {

      setLoading(true);
      const docRef = doc(db, "notes", item.id);
      await updateDoc(docRef, {
        title,
        description,
        color: noteColor
      });
      
      showMessage({
        message: 'Note updated successfully',
        type: 'success'
      })

      setLoading(false);
      navigation.goBack();
      
    } catch (error) {
      
      console.log(error, 'error')
      showMessage({
        message: 'Note updated failed',
        type: 'danger'
      })
      setLoading(false);
    }    
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)} value={title} />
        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          value={description}
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
            onPress={updateNote}
            title="Update"
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

export default Edit;
