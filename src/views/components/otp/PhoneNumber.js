import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function PhoneNumber(props) {
  // const [name, setName] = useState(null);
  // const [seats, setSeats] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isDate, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  return (
    <View style={styles.screen}>
      {/* <Text style={styles.text}>Enter Your Name</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.text}>How Many Seats</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={seats}
        onChangeText={setSeats}
      />

      <Text style={styles.text}>Booking Date</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={isDate}
        // onPressIn={showDatePicker}
        // onChangeText={setDate}
      />
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}

      <Text style={styles.text}>Enter Phone Number</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button
        title="Phone Number Sign In"
        onPress={() => props.onSubmit(phoneNumber)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

// import React, {Component} from 'react';
// import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
// // import InputData from '../../../maincomponents/Input/inpuBox';

// export class PhoneNumber extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: '',
//       seats: '',
//       phoneNumber: '',
//       isDate: '',
//       isDatePickerVisible: false,
//     };

//     showDatePicker = () => {
//       this.setState({
//         isDatePickerVisible: true,
//       });
//     };

//     hideDatePicker = () => {
//       this.setState({
//         isDatePickerVisible: false,
//       });
//     };

//     handleConfirm = date => {
//       console.log('A date has been picked: ', date);
//       this.setState({
//         isDate: date,
//       });
//       console.log(isDate);
//       hideDatePicker();
//     };

//     // // If useing for props then
//     // onChangeText = (nameState, value) => {
//     //   this.setState({
//     //     [nameState]: value,
//     //   });
//     // };
//   }
//   render() {
//     return (
//       <View style={styles.screen}>
//         <Text style={styles.text}>Enter Your Name</Text>
//         <TextInput
//           autoFocus
//           style={styles.input}
//           value={this.state.name}
//           onChangeText={text => this.setState({name: text})}
//         />

//         <Text style={styles.text}>How Many Seats</Text>
//         <TextInput
//           autoFocus
//           style={styles.input}
//           value={this.state.seats}
//           onChangeText={text => this.setState({seats: text})}
//         />

//         {/* <Text style={styles.text}>Booking Date</Text>
//         <TextInput
//           autoFocus
//           style={styles.input}
//           value={isDate}
//           // onPressIn={showDatePicker}
//           // onChangeText={setDate}
//         />
//         <Button title="Show Date Picker" onPress={showDatePicker} />
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           onConfirm={handleConfirm}
//           onCancel={hideDatePicker}
//         /> */}

//         <Text style={styles.text}>Enter Phone Number</Text>
//         <TextInput
//           autoFocus
//           style={styles.input}
//           value={this.state.phoneNumber}
//           onChangeText={text => this.setState({phoneNumber: text})}
//         />

//         <Button
//           title="Phone Number Sign In"
//           onPress={() => onSubmit(this.state.phoneNumber)}
//         />
//       </View>
//     );
//   }
// }

// export default PhoneNumber;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   input: {
//     color: 'black',
//     borderWidth: 1,
//     borderColor: 'lightblue',
//     width: 300,
//     marginVertical: 10,
//     fontSize: 18,
//     padding: 10,
//     borderRadius: 8,
//   },
//   text: {
//     fontSize: 18,
//   },
// });
