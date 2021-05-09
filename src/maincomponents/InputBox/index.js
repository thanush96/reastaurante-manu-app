import React from 'react';
import {StyleSheet,TextInput} from 'react-native';

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
        placeholderTextColor="#D3D3D3"
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
    height: 45,
    marginVertical: 10,
    fontSize: 14,
    padding: 10,
    color: 'black',
    backgroundColor: 'grey',
    textAlign:'center',
    // textAlignVertical : 'center'
  },
});
