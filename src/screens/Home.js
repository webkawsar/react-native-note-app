import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Home = ({navigation, route, user}) => {
 



  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
        <Text>My notes</Text>
        <Pressable onPress={() => navigation.navigate('Create')}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Home