import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import COLORS from '../../const/colors';

const BulkOrder = () => {
  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.header}>
        <Text style={styles.title}>Bulk Order</Text>
      </View>
    </SafeAreaView>
  );
};

export default BulkOrder;

const styles = StyleSheet.create({
  conatiner: {flex: 1, backgroundColor: COLORS.white},
  header: {
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    top: 50,
  },
});