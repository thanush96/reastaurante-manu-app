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
import {Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneNumber from '../components/otp/PhoneNumber';
import VerifyCode from '../components/otp/VerifyCode';
import Authenticated from '../components/otp/Authenticated';
import FIREBASE from '../../config/FIREBASE';
import Spinner from 'react-native-loading-spinner-overlay';

export default function App() {
  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [seat, setSeat] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [isDate, setDate] = useState(null);
  const [name, setName] = useState(null);
  // const [loading, setLoading] = useState(false);

  async function signIn(name, phoneNumber, seats, isDate) {
    console.log('Function signIn');
    if (name && phoneNumber && seats && isDate) {
      console.log('Valid');
      setMobile(phoneNumber);
      setSeat(seats);
      setDate(isDate);
      setName(name);
      console.log(name, phoneNumber, seats, isDate);
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        // console.log(phoneNumber, seats);
        setConfirm(confirmation);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      // console.log('Input Here');
      Alert.alert('Warning!', 'Please Fill Suitable field');
    }
  }

  SubmitOrder = otpcode => {
    console.log('SubmitFuction');
    const AddSatReservation = FIREBASE.database().ref('Seat_Reservation');
    const Reservation = {
      CustomerName: name,
      status: true,
      otp: otpcode,
      Seat: seat,
      CustomerContactNo: mobile,
      GiveDate: isDate,
      OrderderedDate: new Date().toDateString(),
    };
    AddSatReservation.push(Reservation)
      .then(data => {
        console.log('Order Success');
        // setLoading(true);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 5000);
        // Alert.alert('Success', 'Order Success');
      })
      .catch(error => {
        console.log('Error :', error);
      });
  };

  async function confirmVerificationCode(code) {
    console.log('confirmVerificationCode');
    try {
      await confirm.confirm(code);
      SubmitOrder(code);
      console.log(seat, mobile, code, isDate, new Date().toDateString());
      setConfirm(null);
    } catch (error) {
      console.log(error);
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

  return <PhoneNumber onSubmit={signIn} />}


//   return (
//     (
//       <Spinner
//         //visibility of Overlay Loading Spinner
//         visible={loading}
//         //Text with the Spinner
//         textContent={'Loading...'}
//         //Text style of the Spinner Text
//         textStyle={styles.spinnerTextStyle}
//       />
//     ),
//     (<PhoneNumber onSubmit={signIn} />)
//   );
// }

// const styles = StyleSheet.create({
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
// });
