import React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import BulkOrder from '../screens/BulkOrder';
import SeatReservation from '../screens/auth';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 50,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: COLORS.secondary,
        },
        showLabel: false,
        activeTintColor: COLORS.white,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="food-bank" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="Bulk-Order"
        component={BulkOrder}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="Booking"
        component={SeatReservation}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="event-seat" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
