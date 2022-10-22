import { AntDesign, Feather } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../App";

const Home = ({ navigation, route, user }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesLister = onSnapshot(q, (snapShots) => {
      const lists = [];
      snapShots.forEach((doc) => {
        lists.push({ ...doc.data(), id: doc.id });
      });

      setNotes(lists);
      setLoading(false);

      return () => notesLister;
    });
  }, []);

  const deleteNote = async (itemId) => {
    try {
      
      const docRef = doc(db, "notes", itemId);
      await deleteDoc(docRef);

      showMessage({
        message: "Note delete successfully",
        type: "success",
      });

    } catch (error) {
      console.log(error, "error");
      showMessage({
        message: "Note delete failed",
        type: "danger",
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView>
        <View style={{position: 'absolute', left: 100, top: 100}}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text>My notes</Text>
        <Pressable onPress={() => navigation.navigate("Create")}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => {
            const { title, description, color } = item;

            return (
              <Pressable
                onPress={() => navigation.navigate("Edit", { item })}
                style={{
                  backgroundColor: color,
                  marginBottom: 10,
                  padding: 20,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  {title}
                </Text>
                <Text style={{ color: "white", marginTop: 10 }}>
                  {description}
                </Text>
                <Pressable
                  style={{ position: "absolute", top: 25, right: 15 }}
                  onPress={() => deleteNote(item.id)}
                >
                  <Feather name="delete" size={24} color="white" />
                </Pressable>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
