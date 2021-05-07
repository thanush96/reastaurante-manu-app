import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker';
import COLORS from '../../../const/colors';
import PhoneInput from 'react-native-phone-input';

export default function PhoneNumber(props) {
  const [name, setName] = useState(null);
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

  const onPhoneInputChange = value => {
    console.log('Phone');
    setPhoneNumber(value);
  };

  var today = new Date();
  return (
    <SafeAreaView style={styles.conatiner} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>Seat Reservation</Text>
      </View>
      <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.text}>Enter Your Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.text}>Seats</Text>
        <TextInput style={styles.input} value={seats} onChangeText={setSeats} />
        {/*
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
          customStyles={{
            dateIcon: {
              // display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 0,
              borderRadius: 5,
            },
          }}
          onDateChange={date => {
            setDate(date);
            // console.log(new Date().toDateString());
          }}
        />

        <Text style={styles.text}>Enter Phone Number</Text>
        {/* <TextInput
          style={styles.input}
          value={phoneNumber}
          keyboardType="number-pad"
          onChangeText={setPhoneNumber}
        /> */}

        {/* <PhoneInput ref="phone" /> */}
        <PhoneInput
          style={styles.phoneInput}
          value={phoneNumber}
          keyboardType="number-pad"
          onChangePhoneNumber={setPhoneNumber}
          initialCountry={'us'}
         
        />

        <TouchableOpacity
          style={styles.touch}
          onPress={() => props.onSubmit(name, phoneNumber, seats, isDate)}
          keyboardShouldPersistTaps={'always'}>
          <Text style={styles.submit}>Book now</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.touch}
          onPressIn={reset()}
          keyboardShouldPersistTaps={'always'}>
          <Text style={styles.submit}>Clear</Text>
        </TouchableOpacity> */}
      </View>
      </ScrollView>
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
    backgroundColor: 'green',

    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 10,
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
  },
  phoneInput: {
    borderWidth: 1,
    backgroundColor: 'grey',
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

  touch: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderRadius: 50,
  },
  submit: {
    width: 280,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
