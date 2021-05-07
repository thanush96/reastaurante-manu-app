import {Picker} from '@react-native-picker/picker';
// import {TimePicker} from 'react-native-simple-time-picker';
import React, {Component} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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

  async componentWillMount() {
    this.setState({
      dataSource: await this.get_firebase_list(),
      // refreshing: false,
    });
    // console.log(this.state.dataSource);
    // console.log('Refreshing..');
  }

  onSubmit = () => {
    // console.log(this.state.selectedMinutes);
    if (
      this.state.foodItem &&
      this.state.name &&
      this.state.parcels &&
      this.state.contact
    ) {
      const AddBulkOrders = FIREBASE.database().ref('BulkOrders');
      const BulkOrders = {
        CustomerName: this.state.name,
        OrderedFood: this.state.foodItem,
        NumberOfParcels: this.state.parcels,
        CustomerContactNo: this.state.contact,
        GiveDate: this.state.date,
        OrderderedDate: new Date().toDateString(),
      };
      AddBulkOrders.push(BulkOrders)
        .then(data => {
          // console.log('Added');
          Alert.alert('Success', 'Order Success');
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
    } else {
      this.showAlert();
      // Alert.alert('Error', 'Please Input here');
    }
  };

  // _onRefresh = () => {
  //   this.setState({refreshing: true});
  //   this.componentWillMount();
  // };

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
    console.log('hide');
    this.setState({
      showAlert: false,
    });
  };

  render() {
    var today = new Date();
    today.setDate(today.getDate() + 3);
    const {showAlert} = this.state;

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
            <Text style={{fontSize: 16, marginBottom: 5}}>Food Name</Text>

            <View style={styles.card}>
              <Picker
                onValueChange={(itemVlue, itemIndex) =>
                  this.setState({
                    foodItem: itemVlue,
                  })
                }>
                {/* <Picker.Item
                  label="--Select Food--"
                  value="default"
                  style={{color: '#D3D3D3'}}
                /> */}
                {this.state.dataSource.map((item, index) => {
                  {
                    /* console.log(item.FoodStatus); */
                  }
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

            <InputData
              label="Parcels"
              placeholder="Number Of Parcels"
              onChangeText={this.onChangeText}
              value={this.state.parcels}
              nameState="parcels"
              keyboardType="numeric"
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
                  // display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 5,
                },
              }}
              onDateChange={date => {
                this.setState({
                  date: date,
                });
                // console.log(new Date().toDateString());
              }}
            />

            {/* <TimePicker
              selectedHours={this.state.selectedHours}
              selectedMinutes={this.state.selectedMinutes}
              onChange={( hours, minutes) => {
                console.log(minutes);
                this.setState({
                  selectedHours: hours,
                  selectedMinutes: minutes,
                });
                
              }}
            /> */}

            <InputData
              label="Your Name"
              placeholder="Enter Your Name here"
              onChangeText={this.onChangeText}
              value={this.state.name}
              nameState="name"
            />

            <InputData
              label="Contact"
              placeholder="Enter your Contact Number"
              onChangeText={this.onChangeText}
              value={this.state.contact}
              nameState="contact"
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.onSubmit()}>
              <Text style={styles.submit}>Order Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.clear()}
              keyboardShouldPersistTaps={'always'}>
              <Text style={styles.submit}>Clear</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* WARNING MESSAGE ALERT */}
        <WarningMessage
          title="Warning!"
          message="Please input suitable field"
          // confirmText="Yes, Delete"
          {...this.props}
          hideAlert={this.hideAlert}
          showAlert={showAlert}
          // confirmAlert={this.hideAlert}
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
    // backgroundColor:'green'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    top: 50,
  },

  card: {
    borderWidth: 1,
    borderColor: 'grey',
    color: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },

  touch: {
    backgroundColor: COLORS.secondary,
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
});
