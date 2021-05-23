import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const InputData = ({
  placeholder,
  keyboardType,
  onChangeText,
  nameState,
  value,
}) => {
  return (
    <>
      <TextInput
        placeholderTextColor="#C7C7CD"
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={keyboardType}
        onChangeText={text => onChangeText(nameState, text)}
        value={value}
      />
    </>
  );
};

export default InputData;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 50,
    width: 300,
    height: 45,
    marginVertical: 8,
    fontSize: 14,
    padding: 10,
    color: 'black',
    backgroundColor: 'grey',
    // textAlign: 'center',
    // textAlignVertical : 'center'
  },
});
