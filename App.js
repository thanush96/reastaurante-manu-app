import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/const/colors';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import BottomNavigator from './src/views/navigation/BottomNavigation';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BoardScreen" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import React, {Component} from 'react';
// import {
//   Platform,
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// export default class Myapp extends Component<{}> {
//   constructor() {
//     super();
//     this.state = {
//       isVisible: true,
//     };
//   }
//   Hide_Splash_Screen = () => {
//     this.setState({
//       isVisible: false,
//     });
//   };

//   componentDidMount() {
//     var that = this;
//     setTimeout(function () {
//       that.Hide_Splash_Screen();
//     }, 5000);
//   }

//   render() {
//     let Splash_Screen = (
//       <View style={styles.SplashScreen_RootView}>
//         <View style={styles.SplashScreen_ChildView}>
//           <Image
//             source={{
//               uri:
//                 'https://static.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png',
//             }}
//             style={{width: '100%', height: '100%', resizeMode: 'contain'}}
//           />
//         </View>
//       </View>
//     );
//     return (
//       <View style={styles.MainContainer}>
//         <Text style={{textAlign: 'center'}}> Splash Screen Example</Text>
//         {this.state.isVisible === true ? Splash_Screen : null}
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: Platform.OS === 'ios' ? 20 : 0,
//   },

//   SplashScreen_RootView: {
//     justifyContent: 'center',
//     flex: 1,
//     margin: 10,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },

//   SplashScreen_ChildView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#00BCD4',
//     flex: 1,
//   },
// });
