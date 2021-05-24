import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneNumber from '../components/otp/PhoneNumber';
import VerifyCode from '../components/otp/VerifyCode';
import Authenticated from '../components/otp/Authenticated';
import FIREBASE from '../../config/FIREBASE';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function App() {
  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [seat, setSeat] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [isDate, setDate] = useState(null);
  const [name, setName] = useState(null);
  const [oldDates, setOldDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

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
        // console.log('valid');
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 10000);
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
          // Alert.alert('Success', 'Order Success');
        } catch (error) {
          alert(error);
          console.log(error);
        }
      } else {
        // console.log('Leave day for shop');
        Alert.alert('Leave day for shop')
      }
    } else {
      console.log('Input Here');
      // Alert.alert('not')
      setShowAlert(true);
    }
  }

  function hideAlert() {
    setShowAlert(false);
    console.log('Alert Close');
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

  if (loading)
    return (
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    );

  // return <PhoneNumber onSubmit={signIn} />;

  if (!showAlert) {
    return <PhoneNumber onSubmit={signIn} />;
  } else {
    return (
      <AwesomeAlert
        style={styles.alert}
        show={showAlert}
        showProgress={false}
        title="Sorry!"
        message="Please input suitable field"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        confirmText="AwesomeAlert"
        cancelButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideAlert();
        }}
      />
    );
  }
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
