import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import COLORS from '../../../const/colors';

export default function Authenticated() {
  return (
    <View style={styles.screen} keyboardShouldPersistTaps="handled">
      {/* <Text style={styles.phoneNumber}>{auth().currentUser.phoneNumber}</Text> */}
      <Image
        source={require('../../../assets/success.png')}
        style={{width: 100, height: 100, marginBottom: 20}}
      />
      <Text style={styles.text}>Successsfull Your Reservation</Text>

      <TouchableOpacity
        style={styles.touch}
        onPress={() => auth().signOut()}
        keyboardShouldPersistTaps={'always'}>
        <Text style={styles.submit}>Back To Home</Text>
      </TouchableOpacity>

      {/* <View style={{marginTop: 30}}>
        <Button title="Back To Home" onPress={() => auth().signOut()} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: COLORS.primary,
  },
  phoneNumber: {
    fontSize: 21,
    marginTop: 20,
  },
  touch: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    borderRadius: 50,
  },
  submit: {
    width: 280,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
