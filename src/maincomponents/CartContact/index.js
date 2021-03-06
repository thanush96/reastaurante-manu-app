import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../const/colors';

const CardContact = ({id, contactItem, navigation, removeData}) => {
  return (
    // onPress={() => {
    //   navigation.navigate('ContactDetails', {id: id});
    // }}

    <LinearGradient
      colors={['#CABAA5', '#CABAA5']}
      style={styles.linearGradient}>
      <View style={styles.imgBody}>
        <Image
          style={styles.img}
          source={{
            uri: contactItem.imgUrl,
          }}
        />
        {/* <Text style={styles.address}>{contactItem.address}</Text> */}
      </View>
      <View style={styles.TextBody}>
        <Text style={styles.name}>{contactItem.name}</Text>
        <Text style={styles.price}>Rs {contactItem.unitPrice}.00</Text>
        <Text style={styles.description}>{contactItem.description}</Text>
        {/* <Text style={styles.description}>{contactItem.category}</Text>
        <Text style={styles.description}>{contactItem.category2}</Text>
        <Text style={styles.description}>{contactItem.category3}</Text>
        <Text style={styles.description}>{contactItem.category4}</Text>
        <Text style={styles.description}>{contactItem.category5}</Text> */}
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
  );
};

export default CardContact;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    flexDirection: 'row',
    // padding: 15,
    // borderRadius: 15,
    marginBottom: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  name: {fontWeight: 'bold', fontSize: 30, color: COLORS.secondary},
  price: {
    fontSize: 18,
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: 'black',
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
  },

  imgBody: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor:'green'
  },

  TextBody: {
    flex: 3,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
});
