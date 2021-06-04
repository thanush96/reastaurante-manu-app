import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import COLORS from '../../const/colors';

// const CardContact = ({id, contactItem, navigation, removeData}) => {
const CategoryCard = ({category, triggerData}) => {
  return (
    <TouchableOpacity
      style={styles.categories}
      onPress={() => {
        // navigation.navigate('ContactDetails', {id: id});
        triggerData(category.categoryName);
      }}>
      <Icon name="fastfood" color={COLORS.primary} size={15} />
      <Text style={{color: COLORS.secondary}}>{category.categoryName}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categories: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    width: 100,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
