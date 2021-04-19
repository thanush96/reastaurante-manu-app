import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CardContact = ({id, contactItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.conatiner}
      // onPress={() => {
      //   navigation.navigate('ContactDetails', {id: id});
      // }}
    >
      <View>
        <Text style={styles.name}>{contactItem.name}</Text>
        <Text style={styles.age}>{contactItem.age}</Text>
        {/* <Text style={styles.address}>{contactItem.address}</Text> */}
      </View>
      {/* <View style={styles.icon}>
        <FontAwesomeIcon
          icon={faEdit}
          color={'orange'}
          size={25}
          onPress={() => {
            navigation.navigate('EditContact', {id: id});
          }}
        />
        <FontAwesomeIcon
          icon={faTimes}
          color={'red'}
          size={25}
          onPress={() => {
            removeData(id);
          }}
        />
      </View> */}
    </TouchableOpacity>
  );
};

export default CardContact;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.85,
  },
  name: {fontWeight: 'bold', fontSize: 16},
  age: {
    fontSize: 12,
    color: 'gray',
  },
  address: {
    fontSize: 12,
    color: 'gray',
  },

  icon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});