import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import firebase from '../../config/FIREBASE';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-datepicker';
import PhoneInput from 'react-native-phone-number-input';
import COLORS from '../../const/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import WarningMessage from '../components/Alert/warningMessage';

class PhoneAuthScreen extends Component {
  state = {
    confirmResult: null,
    verificationCode: '',
    name: '',
    seats: '',
    phone: '',
    date: '',
    oldDates: [],
    loading: false,
    warningAlertMsg: false,
    successAlertMsg: false,
    holidayAlerMsg: false,
    phoneValidationAlerMsg: false,
    wrongPhone: false,
    valSeat: false,
    valDate: false,
    valName: false,
    valOtp: false,
    invalidOtp: false,
  };

  async get_holidays() {
    return firebase
      .database()
      .ref('holidays')
      .once('value')
      .then(function (snapshot) {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          items.push(childData);
        });
        return items;
      });
  }

  async componentWillMount() {
    this.setState({
      oldDates: await this.get_holidays(),
    });
    console.log(this.state.oldDates);
  }

  // NUMBER VALIDATION
  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };

  // SEND CODE
  handleSendCode = () => {
    console.log('handleSendCode');
    let duplicate = false;
    if (this.state.date) {
      this.state.oldDates.map((item, index) => {
        if (item.holidayDate === this.state.date) {
          duplicate = true;
        }
      });
    }

    if (this.state.name) {
      if (this.state.date) {
        if (this.state.seats && !isNaN(this.state.seats)) {
          if (!duplicate) {
            if (this.validatePhoneNumber()) {
              this.setState({
                loading: true,
              });
              setTimeout(() => {
                this.setState({
                  loading: false,
                });
              }, 20000);
              auth()
                .signInWithPhoneNumber(this.state.phone)
                .then(confirmResult => {
                  this.setState({confirmResult});
                  console.log('Success');
                })
                .catch(error => {
                  this.showWrongPhone();
                  console.log(error);
                });
            } else {
              this.showPhoneValidationAlert();
            }
          } else {
            this.showHolidayAlerMsg();
          }
        } else {
          this.showSeatVAl();
        }
      } else {
        this.showDateVAl();
      }
    } else {
      this.showNameVAl();
    }
  };

  // CHANGE PHONE NUMBER
  changePhoneNumber = () => {
    this.setState({confirmResult: null, verificationCode: ''});
  };

  Reset = () => {
    this.changePhoneNumber();
    this.setState({
      confirmResult: null,
      verificationCode: '',
      name: '',
      seats: '',
      phone: '',
      date: '',
    });
  };

  // VERIFY CODE
  handleVerifyCode = () => {
    console.log('handleVerifyCode');
    const {confirmResult, verificationCode} = this.state;
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          console.log('Success Order', auth().currentUser.phoneNumber);
          this.SubmitOrder(verificationCode);
        })
        .catch(error => {
          console.log('Not Order');
          this.showInvalidOtp();
        });
    } else {
      this.showOtpVAl();
    }
  };

  SubmitOrder = otpcode => {
    console.log('Submit function', otpcode);
    const AddSatReservation = firebase.database().ref('Seat_Reservation');
    const Reservation = {
      CustomerName: this.state.name,
      status: true,
      otp: this.state.verificationCode,
      Seat: this.state.seats,
      CustomerContactNo: this.state.phone,
      GiveDate: this.state.date,
      OrderderedDate: new Date().toDateString(),
    };
    AddSatReservation.push(Reservation)
      .then(data => {
        this.setState({
          loading: true,
        });
        // SUCCESS ALERT MESSAGE AND LOADING
        setTimeout(() => {
          this.setState({
            loading: false,
          });
          this.showSuccessAlert();
          this.Reset();
        }, 3000);
      })
      .catch(error => {
        console.log('Error :', error);
        this.showOtpVAl();
      });
  };

  // Warning ALERT FUNCTIONS
  showWarningAlert = () => {
    this.setState({
      warningAlertMsg: true,
    });
  };

  hideWarningAlert = () => {
    this.setState({
      warningAlertMsg: false,
    });
  };

  // Holiday ALERT FUNCTIONS
  showHolidayAlerMsg = () => {
    this.setState({
      holidayAlerMsg: true,
    });
  };

  hideHolidayAlerMsg = () => {
    this.setState({
      holidayAlerMsg: false,
    });
  };

  // SUCCESSFULL ALERT FUNCTIONS
  showSuccessAlert = () => {
    this.setState({
      successAlertMsg: true,
    });
  };

  hideAlertSuccessMsg = () => {
    this.setState({
      successAlertMsg: false,
    });
  };

  // SUCCESSFULL ALERT FUNCTIONS
  showPhoneValidationAlert = () => {
    this.setState({
      phoneValidationAlerMsg: true,
    });
  };

  hidePhoneValidationMsg = () => {
    this.setState({
      phoneValidationAlerMsg: false,
    });
  };

  showWrongPhone = () => {
    this.setState({
      wrongPhone: true,
    });
  };

  hideWrongPhone = () => {
    this.setState({
      wrongPhone: false,
    });
  };

  // SEAT VALIDATION
  showSeatVAl = () => {
    this.setState({
      valSeat: true,
    });
  };

  hideSeatVal = () => {
    this.setState({
      valSeat: false,
    });
  };

  // DATE VALIDATION
  showDateVAl = () => {
    this.setState({
      valDate: true,
    });
  };

  hideDateVal = () => {
    this.setState({
      valDate: false,
    });
  };

  // Name VALIDATION
  showNameVAl = () => {
    this.setState({
      valName: true,
    });
  };

  hideNameVal = () => {
    this.setState({
      valName: false,
    });
  };

  // Name VALIDATION
  showOtpVAl = () => {
    this.setState({
      valOtp: true,
    });
  };

  hideOtpVal = () => {
    this.setState({
      valOtp: false,
    });
  };

  // Name VALIDATION
  showInvalidOtp = () => {
    this.setState({
      invalidOtp: true,
    });
  };

  hideInvalidOtp = () => {
    this.setState({
      invalidOtp: false,
    });
  };

  renderConfirmationCodeView = () => {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Verification code"
          placeholderTextColor="#C7C7CD"
          value={this.state.verificationCode}
          keyboardType="numeric"
          onChangeText={verificationCode => {
            this.setState({verificationCode});
          }}
          maxLength={6}
        />
        <TouchableOpacity style={styles.touch} onPress={this.handleVerifyCode}>
          <Text style={styles.submit}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    var today = new Date();
    const {
      warningAlertMsg,
      holidayAlerMsg,
      successAlertMsg,
      phoneValidationAlerMsg,
      wrongPhone,
      valDate,
      valName,
      valSeat,
      valOtp,
      invalidOtp,
    } = this.state;

    return (
      <SafeAreaView
        style={styles.conatiner}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Seat Reservation</Text>
        </View>
        <ScrollView>
          <View style={styles.screen}>
            <TextInput
              placeholderTextColor="#C7C7CD"
              style={styles.input}
              value={this.state.name}
              onChangeText={name => {
                this.setState({name});
              }}
              placeholder="Your Name"
            />

            <TextInput
              placeholderTextColor="#C7C7CD"
              style={styles.input}
              value={this.state.seats}
              onChangeText={seats => {
                this.setState({seats});
              }}
              placeholder="Seats"
              keyboardType="number-pad"
              maxLength={3}
            />

            <DatePicker
              style={styles.datePickerStyle}
              date={this.state.date}
              mode="date"
              placeholder="Select Your Order date"
              format="DD-MM-YYYY"
              minDate={today}
              maxDate="01-01-2051"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 10,
                },
                dateInput: {
                  marginLeft: 0,
                  borderRadius: 5,
                  backgroundColor: 'grey',
                  borderRadius: 50,
                  height: 45,
                  borderWidth: 0,
                },
              }}
              onDateChange={date => {
                this.setState({date});
              }}
            />

            <PhoneInput
              defaultValue={this.state.phone}
              defaultCode="LK"
              layout="first"
              onChangeFormattedText={phone => {
                this.setState({phone});
              }}
              containerStyle={{
                backgroundColor: 'grey',
                borderRadius: 50,
                width: 300,
                height: 45,
                marginTop: 18,
                marginBottom: 5,
              }}
              textContainerStyle={{backgroundColor: 'grey', borderRadius: 50}}
              textInputProps={{
                maxLength: 10,
                fontSize: 14,
                padding: 0,
              }}
            />

            <TouchableOpacity
              style={styles.touch}
              onPress={
                this.state.confirmResult
                  ? this.changePhoneNumber
                  : this.handleSendCode
              }>
              <Text style={styles.submit}>
                {this.state.confirmResult ? 'Change Phone Number' : 'Send'}
              </Text>
            </TouchableOpacity>

            {this.state.confirmResult
              ? this.renderConfirmationCodeView()
              : null}
          </View>
        </ScrollView>

        <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <WarningMessage
          title="Sorry!"
          message="Please input sutable field"
          hideAlert={this.hideWarningAlert}
          showAlert={warningAlertMsg}
        />

        <WarningMessage
          title="Sorry!"
          message="Please input Phone Number field"
          hideAlert={this.hidePhoneValidationMsg}
          showAlert={phoneValidationAlerMsg}
        />

        <WarningMessage
          title="Successfull!"
          message="Successfull completed Your booking"
          hideAlert={this.hideAlertSuccessMsg}
          showAlert={successAlertMsg}
        />

        <WarningMessage
          title="Sorry!"
          message="Your Reservation date is Holiday for shop, Please choose other dates"
          hideAlert={this.hideHolidayAlerMsg}
          showAlert={holidayAlerMsg}
        />

        <WarningMessage
          title="Sorry!"
          message="Your Mobile number is wrong or connection error please try again"
          hideAlert={this.hideWrongPhone}
          showAlert={wrongPhone}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Input Seats"
          hideAlert={this.hideSeatVal}
          showAlert={valSeat}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Choose Date"
          hideAlert={this.hideDateVal}
          showAlert={valDate}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Input Name"
          hideAlert={this.hideNameVal}
          showAlert={valName}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Input 6 Digits OTP"
          hideAlert={this.hideOtpVal}
          showAlert={valOtp}
        />

        <WarningMessage
          title="Sorry!"
          message="You OTP PIN is wrong, Please resend code"
          hideAlert={this.hideInvalidOtp}
          showAlert={invalidOtp}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {flex: 1, backgroundColor: 'white'},
  header: {
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.primary,
  },
  pages: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    top: 50,
  },
  screen: {
    backgroundColor: 'green',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderRadius: 50,
    width: 300,
    height: 45,
    marginVertical: 7,
    fontSize: 14,
    padding: 10,
    color: 'black',
    backgroundColor: 'grey',
    // textAlign:'center'
  },

  text: {
    fontSize: 14,
  },
  datePickerStyle: {
    width: 300,
    marginTop: 10,
  },

  touch: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  submit: {
    width: 280,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default PhoneAuthScreen;
