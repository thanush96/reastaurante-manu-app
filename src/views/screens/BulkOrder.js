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
import DatePicker from 'react-native-datepicker';
import WarningMessage from '../components/Alert/warningMessage';
import Spinner from 'react-native-loading-spinner-overlay';

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
      showAlert: false,
      successAlertMsg: false,
      loading: false,
      oldDates: [],
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
      // refreshing: false,
    });
  }

  onSubmit = () => {
    let phoneNumberLength = this.state.contact.length;
    let duplicate = false;
    if (this.state.date) {
      this.state.oldDates.map((item, index) => {
        if (item.holidayDate === this.state.date) {
          duplicate = true;
        }
      });
    } else {
      // this.showAlert();
      console.log('This is Not duplicate');
    }

    if (
      this.state.foodItem &&
      this.state.name &&
      this.state.date &&
      !isNaN(this.state.parcels) &&
      this.state.parcels &&
      !isNaN(this.state.contact) &&
      phoneNumberLength === 10
    ) {
      if (!duplicate) {
        const AddBulkOrders = FIREBASE.database().ref('BulkOrders');
        const BulkOrders = {
          CustomerName: this.state.name,
          OrderedFood: this.state.foodItem,
          NumberOfParcels: this.state.parcels,
          CustomerContactNo: this.state.contact,
          GiveDate: this.state.date,
          OrderderedDate: new Date().toDateString(),
          status: true,
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
            }, 7000);
            this.successShowAlert();
            this.setState({
              name: '',
              contact: '',
              foodItem: '',
              parcels: '',
              date: '',
            });
          })
          .catch(error => {
            console.log('Error :', error);
          });
      }
      console.log('Holiday');
    } else {
      this.showAlert();
    }
  };

  clear = () => {
    this.setState({
      name: '',
      contact: '',
      foodItem: '',
      parcels: '',
      date: '',
    });
    this.componentWillMount();
  };

  // ALERT FUNCTIONS
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  // SUCCESSFULL ALERT FUNCTIONS
  successShowAlert = () => {
    this.setState({
      successAlertMsg: true,
    });
  };

  hideAlertSuccessMsg = () => {
    this.setState({
      successAlertMsg: false,
    });
  };

  render() {
    var today = new Date();
    today.setDate(today.getDate() + 3);
    const {showAlert, successAlertMsg} = this.state;

    return (
      <SafeAreaView style={styles.conatiner}>
        <View style={styles.header}>
          <Text style={styles.title}>Bulk Order</Text>
        </View>

        <View style={styles.pages}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this._onRefresh}
            //   />
            // }
          >
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
                    fontSize: 14,
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

            <TextInput
              style={styles.textInput}
              placeholderTextColor="#C7C7CD"
              placeholder="Enter Your Contact number here"
              onChangeText={text => this.setState({contact: text})}
              value={this.state.contact}
              keyboardType="numeric"
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.onSubmit()}>
              <Text style={styles.submit}>Order Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clear}
              onPress={() => this.clear()}
              keyboardShouldPersistTaps={'always'}>
              <Text style={styles.submit}>Clear</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <WarningMessage
          title="Sorry!"
          message="Please input suitable field"
          hideAlert={this.hideAlert}
          showAlert={showAlert}
        />

        <WarningMessage
          title="Thank You!"
          message="Your submission is received and we will contact you soon"
          hideAlert={this.hideAlertSuccessMsg}
          showAlert={successAlertMsg}
        />

        <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
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

  touch: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
