import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {View, Button, Text} from 'react-native';
import firebaseSetup from '../../config/FIREBASE/index';

const OtpScreen = () => {
  const {auth} = firebaseSetup();
  // const { auth } = require ('../../config/FIREBASE/index');

  const [confirm, setConfirm] = React.useState(null);
  const [code, setCode] = React.useState('');

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      console.log('success');
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  if (!confirm) {
    return (
      <View>
        <Button
          title="send"
          onPress={() => signInWithPhoneNumber('+94783428797')}>
          <Text>Sign </Text>
        </Button>
      </View>
    );
  }
  return (
    <View>
      <Button
        title="send"
        onPress={() => signInWithPhoneNumber('+94783428797')}>
        <Text>otp screen </Text>
      </Button>
    </View>
  );
};

const otp = () => {
  return (
    <NavigationContainer>
      <OtpScreen />
    </NavigationContainer>
  );
};

export default otp;
