import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CardContact = ({id, contactItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
    // onPress={() => {
    //   navigation.navigate('ContactDetails', {id: id});
    // }}
    >
      <LinearGradient
        colors={['#614385', '#516395']}
        style={styles.linearGradient}>
        <View>
          <Text style={styles.name}>{contactItem.name}</Text>
          <Text style={styles.age}>{contactItem.age}</Text>
          <Text style={styles.age}>{contactItem.address}</Text>
        </View>
        <View style={styles.imgBody}>
          <Image
            style={styles.img}
            source={{
              uri: contactItem.imgUrl,
            }}
          />
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
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CardContact;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
  },
  name: {fontWeight: 'bold', fontSize: 16, color: 'white'},
  age: {
    fontSize: 12,
    color: 'white',
  },
  address: {
    fontSize: 12,
    color: 'white',
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },

  imgBody: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
