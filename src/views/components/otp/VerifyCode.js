import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../../const/colors';

export default function OTP(props) {
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.conatiner} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>Verify Your Code</Text>
      </View>
      <View style={styles.screen}>
        <Image
          source={require('../../../assets/lock.png')}
          style={{width: 100, height: 100, marginBottom: 20}}
        />
        {/* <Text style={styles.text}>Enter OTP</Text> */}
        <TextInput
          autoFocus
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          style={styles.input}
          maxLength={6}
        />

        <TouchableOpacity
          style={styles.touch}
          onPress={() => props.onSubmit(code)}
          keyboardShouldPersistTaps={'always'}>
          <Text style={styles.submit}>Confirm OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {flex: 1, backgroundColor: 'white'},
  header: {
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    top: 50,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
  },
  input: {
    backgroundColor: '#D3D3D3',
    color: 'black',
    borderRadius: 50,
    marginBottom: 10,
    width: 300,
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 30,
    marginBottom: 20,
  },
  text: {
    fontSize: 25,
  },
  touch: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
