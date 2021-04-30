// import React from 'react';
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import COLORS from '../../const/colors';

// const SeatReservation = () => {
//   return (
//     <SafeAreaView style={styles.conatiner}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Seat Reservation</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SeatReservation;

// const styles = StyleSheet.create({
//   conatiner: {flex: 1, backgroundColor: COLORS.white},
//   header: {
//     height: 170,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     backgroundColor: COLORS.primary,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: COLORS.white,
//     top: 50,
//   },
// });

import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import PhoneNumber from '../components/otp/PhoneNumber';
import VerifyCode from '../components/otp/VerifyCode';
import Authenticated from '../components/otp/Authenticated';

export default function App() {
  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  async function signIn(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function confirmVerificationCode(code) {
    try {
      await confirm.confirm(code);
      console.log(code);
      setConfirm(null);
    } catch (error) {
      alert('Invalid code');
    }
  }

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (authenticated) return <Authenticated />;

  if (confirm) return <VerifyCode onSubmit={confirmVerificationCode} />;

  return <PhoneNumber onSubmit={signIn} />;
}
