import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneNumber from '../components/otp/PhoneNumber';
import VerifyCode from '../components/otp/VerifyCode';
import Authenticated from '../components/otp/Authenticated';
import FIREBASE from '../../config/FIREBASE';
import Spinner from 'react-native-loading-spinner-overlay';
import WarningMessage from '../components/Alert/warningMessage';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function App() {
  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [seat, setSeat] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [isDate, setDate] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  async function signIn(name, phoneNumber, seats, isDate) {
    console.log('Function signIn');
    let phoneNumberLength = phoneNumber.toString().length;
    if (
      name &&
      seats &&
      isDate &&
      phoneNumberLength === 12 &&
      !isNaN(phoneNumber) &&
      !isNaN(seats)
    ) {
      console.log('valid');
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
      console.log('Input Here');
      // console.log(phoneNumberLength);
      setShowAlert(true);
      // this.showAlert();
      // Alert.alert('Warning!', 'Please Fill Suitable field');
    }
  }

  hideAlert = () => {
    setShowAlert(false);
    console.log('Alert Close');
  };

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
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={{color: '#FFF'}}
      />
    );


  if (showAlert)
    return (
      // <WarningMessage
      //   title="Sorry!"
      //   message="Please input suitable field"
      //   // confirmText="Yes, Delete"
      //   // {...this.props}
      //   hideAlert={false}
      //   showAlert={true}
      //   // confirmAlert={this.hideAlert}
      // />

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
          this.hideAlert();
        }}
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
