import {Picker} from '@react-native-picker/picker';
// import {TimePicker} from 'react-native-simple-time-picker';
import React, {Component} from 'react';
import {
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import COLORS from '../../const/colors';
import InputData from '../../maincomponents/InputBox';
import FIREBASE from '../../config/FIREBASE';
import DatePicker from 'react-native-datepicker';

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
    });
    // console.log(this.state.dataSource);
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
          console.log('Added');
          // Alert.alert('Success', 'added');
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
      Alert.alert('Error', 'Please Input here');
    }
  };

  render() {
    var today = new Date();
    today.setDate(today.getDate() + 3);
    return (
      <SafeAreaView style={styles.conatiner}>
        <View style={styles.header}>
          <Text style={styles.title}>Bulk Order</Text>
        </View>

        <View style={styles.pages}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontSize: 16, marginBottom: 5}}>
              Choose Your Foods
            </Text>

            <Picker
              onValueChange={(itemVlue, itemIndex) =>
                this.setState({
                  foodItem: itemVlue,
                })
              }>
              {this.state.dataSource.map((item, index) => {
                {/* console.log(item.FoodStatus); */}
                if(item.BulkFoodStatus === 'Active')
                return (
                  <Picker.Item
                    label={item.name}
                    value={item.name}
                    key={index}
                  />
                );
              })}
            </Picker>

            <InputData
              label="Number of Parcels"
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
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.touch}
              onPress={() => this.onSubmit()}>
              <Text style={styles.submit}>Order Now</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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

  touch: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
