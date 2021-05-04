import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker';
import COLORS from '../../../const/colors';


export default function PhoneNumber(props) {
  // const [name, setName] = useState(null);
  const [seats, setSeats] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isDate, setDate] = useState(null);

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('A date has been picked: ', date);
    setDate(date);
    console.log(isDate);
    hideDatePicker();
  };

  var today = new Date();

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.header}>
        <Text style={styles.title}>Bulk Order</Text>
      </View>
      <View style={styles.screen}>
        {/* <Text style={styles.text}>Enter Your Name</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.text}>Booking Date</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={isDate}
        onPressIn={showDatePicker}
        onChangeText={setDate}
      />
       <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />  */}

        <DatePicker
          style={styles.datePickerStyle}
          date={isDate}
          mode="date"
          placeholder="Select Your Order date"
          format="DD-MM-YYYY"
          minDate={today}
          maxDate="01-01-2051"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          // customStyles={{
          // dateIcon: {
          //   // display: 'none',
          //   position: 'absolute',
          //   left: 0,
          //   top: 4,
          //   marginLeft: 0,
          // },
          //   dateInput: {
          //     marginLeft: 36,
          //     borderRadius: 5,
          //   },
          // }}
          onDateChange={date => {
            setDate(date);
            // console.log(new Date().toDateString());
          }}
        />
        <Text style={styles.text}>Seats</Text>
        <TextInput
          autoFocus
          style={styles.input}
          value={seats}
          onChangeText={setSeats}
        />

        <Text style={styles.text}>Enter Phone Number</Text>
        <TextInput
          autoFocus
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Button
          title="Phone Number Sign In"
          onPress={() => props.onSubmit(phoneNumber, seats, isDate)}
        />
      </View>
    </SafeAreaView>
  );
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
    // backgroundColor:'green'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    top: 50,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 10,
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
  },
  datePickerStyle: {
    width: 300,
    marginTop: 10,
  },
});
