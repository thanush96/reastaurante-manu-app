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
import PhoneInput from 'react-native-phone-number-input';

export default function PhoneNumber(props) {
  const [name, setName] = useState(null);
  const [seats, setSeats] = useState(null);
  const [isDate, setDate] = useState(null);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

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
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />

          <TextInput
            style={styles.input}
            value={seats}
            onChangeText={setSeats}
            placeholder="Seats"
            keyboardType="number-pad"
          />
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
              setDate(date);
              // console.log(new Date().toDateString());
            }}
          />

          <PhoneInput
            defaultValue={value}
            defaultCode="LK"
            layout="first"
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            containerStyle={{
              backgroundColor: 'grey',
              borderRadius: 50,
              width: 300,
              height: 45,
              marginTop: 20,
            }}
            textContainerStyle={{backgroundColor: 'grey', borderRadius: 50}}
            // textInputStyle={{backgroundColor: 'red'}}
            textInputProps={{maxLength: 9, padding: 0}}
            // withDarkTheme
            // withShadow
          />

          <TouchableOpacity
            style={styles.touch}
            onPress={() => props.onSubmit(name, formattedValue, seats, isDate)}
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
    borderRadius: 50,
    width: 300,
    height: 45,
    marginVertical: 10,
    fontSize: 14,
    padding: 10,
    color: 'black',
    backgroundColor: 'grey',
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
    marginTop: 20,
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
