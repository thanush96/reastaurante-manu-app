import React from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../const/colors';
import {PrimaryButton} from '../components/Button';

const {width} = Dimensions.get('window');
const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{
          height: 400,
        }}>
        <Image
          style={{
            width: width,
            resizeMode: 'center',
            top: -400,
            alignContent: 'center',
          }}
          source={require('../../assets/logo.png')}
        />
      </View>

      <View style={style.textContainer}>
        <View>
          <Text
            style={{
              fontSize: 32,
              textAlign: 'center',
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Rasanam Food
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: COLORS.secondary,
            }}>
            Best & Tasty food in Jaffna
          </Text>
        </View>
        <View style={style.indicatorContainer}>
          <View style={style.currentIndicator} />
        </View>
        <PrimaryButton
          onPress={() => navigation.navigate('Home')}
          title="Get Started"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  //   indicator: {
  //     height: 12,
  //     width: 12,
  //     borderRadius: 6,
  //     backgroundColor: COLORS.grey,
  //     marginHorizontal: 5,
  //   },
});

export default OnBoardScreen;
