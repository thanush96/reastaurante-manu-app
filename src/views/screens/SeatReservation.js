import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View, Text} from 'react-native';
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
  const [oldDates, setOldDates] = useState([]);
  const [loading, setLoading] = useState(false);

  async function get_holidays() {
    FIREBASE.database()
      .ref('holidays')
      .once('value')
      .then(function (snapshot) {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          items.push(childData);
        });
        setOldDates(items);
      });
  }

  useEffect(() => {
    get_holidays();
  }, []);

  async function signIn(name, phoneNumber, seats, isDate) {
    let phoneNumberLength = phoneNumber.toString().length;
    let duplicate = false;
    if (isDate) {
      oldDates.map((item, index) => {
        if (item.holidayDate === isDate) {
          duplicate = true;
        }
      });
    }
    if (
      name &&
      seats &&
      isDate &&
      phoneNumberLength === 12 &&
      !isNaN(phoneNumber) &&
      !isNaN(seats)
    ) {
      if (!duplicate) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 10000);
        setMobile(phoneNumber);
        setSeat(seats);
        setDate(isDate);
        setName(name);
        try {
          const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
          setConfirm(confirmation);
        } catch (error) {
          Alert.alert(
            'Sorry',
            'Your Mobile number is wrong please make sure number',
          );
          console.log(error);
        }
      } else {
        Alert.alert('Sorry !', 'This date has leave for shop', [
          {
            text: 'ok',
            style: 'cancel',
          },
        ]);
      }
    } else {
      Alert.alert('Sorry !', 'Plsea fill sutable fields', [
        {
          text: 'ok',
          style: 'cancel',
        },
      ]);
    }
  }

  SubmitOrder = otpcode => {
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
      .then(data => {})
      .catch(error => {
        console.log('Error :', error);
      });
  };

  async function confirmVerificationCode(code) {
    try {
      await confirm.confirm(code);
      SubmitOrder(code);
      setConfirm(null);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Sorry !',
        'You OTP Wrong Please make sure 6 Digits OTP on your SMS',
        [
          {
            text: 'ok',
            style: 'cancel',
          },
        ],
      );
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

  if (loading)
    return (
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    );

  return <PhoneNumber onSubmit={signIn} />;
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
