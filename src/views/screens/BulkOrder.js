import {Picker} from '@react-native-picker/picker';
import React, {Component} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  View,
  Platform,
  RefreshControl,
} from 'react-native';
import COLORS from '../../const/colors';
import InputData from '../../maincomponents/InputBox';
import FIREBASE from '../../config/FIREBASE';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-datepicker';
import PhoneInput from 'react-native-phone-number-input';
import Spinner from 'react-native-loading-spinner-overlay';
import WarningMessage from '../components/Alert/warningMessage';

export default class BulkOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      contact: '',
      foodItem: '',
      parcels: '',
      date: '',
      dataSource: [],
      selectedHours: 0,
      selectedMinutes: 0,
      loading: false,
      oldDates: [],
      holidayVal: false,
      mobileVal: false,
      nameVal: false,
      parcelVal: false,
      dateVal: false,
      ItemVal: false,
      succeessMsg: false,
      confirmResult: null,

      // refreshing: false,
    };
  }

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  async get_firebase_list() {
    return FIREBASE.database()
      .ref('contact')
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

  async get_holidays() {
    return FIREBASE.database()
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
      dataSource: await this.get_firebase_list(),
      oldDates: await this.get_holidays(),
    });
  }

  handleSendCode = () => {
    // let phoneNumberLength = this.state.contact.length;
    let duplicate = false;
    if (this.state.date) {
      this.state.oldDates.map((item, index) => {
        if (item.holidayDate === this.state.date) {
          duplicate = true;
        }
      });
    }

    if (this.state.foodItem) {
      if (this.state.date) {
        if (this.state.parcels && !isNaN(this.state.parcels)) {
          if (this.state.name) {
            // if (!isNaN(this.state.contact) && phoneNumberLength === 10) {
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
                  .signInWithPhoneNumber(this.state.contact)
                  .then(confirmResult => {
                    this.setState({confirmResult});
                    console.log('Success');
                  })
                  .catch(error => {
                    // this.showWrongPhone();
                    alert('Wrong phone number Ot connection problem');
                    console.log(error);
                  });
              } else {
                alert('Wrong phone number');
              }
            } else {
              this.showHolidayVAl();
            }
            // } else {
            //   this.showMobileVal();
            // }
          } else {
            this.showNameVAl();
          }
        } else {
          this.showParcelVAl();
        }
      } else {
        this.showDateVAl();
      }
    } else {
      this.showItemVAl();
    }
  };

  SubmitOrder = () => {
    const AddBulkOrders = FIREBASE.database().ref('BulkOrders');
    const BulkOrders = {
      CustomerName: this.state.name,
      OrderedFood: this.state.foodItem,
      NumberOfParcels: this.state.parcels,
      CustomerContactNo: this.state.contact,
      GiveDate: this.state.date,
      OrderderedDate: new Date().toDateString(),
      status: true,
      reject: false,
    };
    AddBulkOrders.push(BulkOrders)
      .then(data => {
        this.setState({
          loading: true,
        });
        setTimeout(() => {
          this.setState({
            loading: false,
          });
          this.showSuccessVAl();
          this.setState({
            name: '',
            contact: '',
            foodItem: '',
            parcels: '',
            date: '',
          });
        }, 5000);
      })
      .catch(error => {
        console.log('Error :', error);
      });
  };

  clear = () => {
    this.setState({
      name: '',
      contact: '',
      foodItem: '',
      parcels: '',
      date: '',
      confirmResult: null,
    });
    this.componentWillMount();
  };

  // Name VALIDATION
  showHolidayVAl = () => {
    this.setState({
      holidayVal: true,
    });
  };

  hideHolidayVal = () => {
    this.setState({
      holidayVal: false,
    });
  };

  // Name VALIDATION
  showMobileVal = () => {
    this.setState({
      mobileVal: true,
    });
  };

  hideMobileVal = () => {
    this.setState({
      mobileVal: false,
    });
  };

  // Name VALIDATION
  showNameVAl = () => {
    this.setState({
      nameVal: true,
    });
  };

  hideNameVal = () => {
    this.setState({
      nameVal: false,
    });
  };

  // Name VALIDATION
  showParcelVAl = () => {
    this.setState({
      parcelVal: true,
    });
  };

  hideParcelVal = () => {
    this.setState({
      parcelVal: false,
    });
  };

  // Name VALIDATION
  showDateVAl = () => {
    this.setState({
      dateVal: true,
    });
  };

  hideDateVal = () => {
    this.setState({
      dateVal: false,
    });
  };

  // Name VALIDATION
  showItemVAl = () => {
    this.setState({
      ItemVal: true,
    });
  };

  hideItemVal = () => {
    this.setState({
      ItemVal: false,
    });
  };

  // Name VALIDATION
  showSuccessVAl = () => {
    this.setState({
      succeessMsg: true,
    });
  };

  hideSuccessVal = () => {
    this.setState({
      succeessMsg: false,
    });
  };

  // NUMBER VALIDATION
  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.contact);
  };

  // CHANGE PHONE NUMBER
  changePhoneNumber = () => {
    this.setState({confirmResult: null, verificationCode: ''});
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
          this.SubmitOrder();
        })
        .catch(error => {
          console.log('Not Order');
          alert('invalit otp');
          // this.showInvalidOtp();
        });
    } else {
      // this.showOtpVAl();
      alert('Input 6 otp');
    }
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
        {/* <TouchableOpacity style={styles.touch} onPress={() => this.onSubmit()}>
          <Text style={styles.submit}>Book Now</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.touch} onPress={this.handleVerifyCode}>
          <Text style={styles.submit}>Order Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    var today = new Date();
    today.setDate(today.getDate() + 3);
    const {
      holidayVal,
      mobileVal,
      nameVal,
      parcelVal,
      dateVal,
      ItemVal,
      succeessMsg,
    } = this.state;

    return (
      <SafeAreaView style={styles.conatiner}>
        <View style={styles.header}>
          <Text style={styles.title}>Bulk Order</Text>
        </View>

        <View style={styles.pages}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
              <Picker
                onValueChange={(itemVlue, itemIndex) =>
                  this.setState({
                    foodItem: itemVlue,
                  })
                }>
                <Picker.Item
                  label="Select Your Food"
                  value=""
                  style={{
                    color: '#D3D3D3',
                    fontSize: 13,
                  }}
                />
                {this.state.dataSource.map((item, index) => {
                  if (item.BulkFoodStatus === true)
                    return (
                      <Picker.Item
                        color="black"
                        label={item.name}
                        value={item.name}
                        key={index}
                      />
                    );
                })}
              </Picker>
            </View>

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
                  // display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  marginLeft: 10,
                },
                dateInput: {
                  marginLeft: 0,
                  borderRadius: 5,
                  backgroundColor: 'grey',
                  borderRadius: 50,
                  height: 45,
                  marginBottom: 10,
                  borderWidth: 0,
                },
              }}
              onDateChange={date => {
                this.setState({
                  date: date,
                });
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Number Of Parcels"
              onChangeText={text => this.setState({parcels: text})}
              value={this.state.parcels}
              placeholderTextColor="#C7C7CD"
              keyboardType="number-pad"
              maxLength={3}
            />

            <InputData
              placeholder="Enter Your Name here"
              onChangeText={this.onChangeText}
              value={this.state.name}
              nameState="name"
            />

            <PhoneInput
              defaultValue={this.state.contact}
              defaultCode="LK"
              layout="first"
              onChangeFormattedText={phone => {
                this.setState({contact: phone});
              }}
              containerStyle={{
                backgroundColor: 'grey',
                borderRadius: 50,
                width: 300,
                height: 45,
                marginTop: 10,
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

            <TouchableOpacity
              style={styles.clear}
              onPress={() => this.clear()}
              keyboardShouldPersistTaps={'always'}>
              <Text style={styles.submit}>Clear</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <WarningMessage
          title="Sorry!"
          message="Your Reservation date is Holiday for shop, Please choose other dates"
          hideAlert={this.hideHolidayVal}
          showAlert={holidayVal}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Input Mobile Number"
          hideAlert={this.hideMobileVal}
          showAlert={mobileVal}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Choose Date"
          hideAlert={this.hideDateVal}
          showAlert={dateVal}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Input Your Name"
          hideAlert={this.hideNameVal}
          showAlert={nameVal}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Input Number Of Parcels"
          hideAlert={this.hideParcelVal}
          showAlert={parcelVal}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Choose Date"
          hideAlert={this.hideDateVal}
          showAlert={dateVal}
        />

        <WarningMessage
          title="Sorry!"
          message="Please Choose Food Item"
          hideAlert={this.hideItemVal}
          showAlert={ItemVal}
        />

        <WarningMessage
          title="Success!"
          message="Your Order has been send, We will contact as soon"
          hideAlert={this.hideSuccessVal}
          showAlert={succeessMsg}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {flex: 1, backgroundColor: COLORS.white},
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
    color: COLORS.white,
    top: 50,
  },

  card: {
    backgroundColor: 'grey',
    color: 'black',
    borderRadius: 50,
    marginBottom: 10,
  },

  textInput: {
    borderRadius: 50,
    width: 300,
    height: 45,
    marginVertical: 8,
    fontSize: 14,
    padding: 10,
    color: 'black',
    backgroundColor: 'grey',
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
  touch: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
  },

  clear: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderRadius: 50,
  },
  submit: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  datePickerStyle: {
    width: 300,
    marginTop: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
