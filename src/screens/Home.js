import { AntDesign } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../App";

const Home = ({ navigation, route, user }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesLister = onSnapshot(q, (snapShots) => {
      const lists = [];
      snapShots.forEach((doc) => {
        lists.push(doc.data());
      });

      setNotes(lists);

      return () => notesLister;
    });
  }, []);

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
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => {
            const {title, description, color} = item;

            return (
              <Pressable
                style={{
                  backgroundColor: color,
                  marginBottom: 10,
                  padding: 20,
                  borderRadius: 5
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{title}</Text>
                <Text style={{color: 'white', marginTop: 10}}>{description}</Text>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
