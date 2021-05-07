import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Authenticated() {
  return (
    <View style={styles.screen}>
      {/* <Text style={styles.phoneNumber}>{auth().currentUser.phoneNumber}</Text> */}
      <Text>Successsfull Your Reservation</Text>
      <View style={{marginTop: 30}}>
        <Button title="Back To Home" onPress={() => auth().signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 25,
  },
  phoneNumber: {
    fontSize: 21,
    marginTop: 20,
  },
});
