import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import COLORS from '../../const/colors';

// const CardContact = ({id, contactItem, navigation, removeData}) => {
const CategoryCard = ({category, triggerData}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('ContactDetails', {id: id});
        triggerData(category.categoryName);
      }}>
      <Text style={styles.categories}>{category.categoryName}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categories: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    width: 100,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderRadius: 50,
  },
});
