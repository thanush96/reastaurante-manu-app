import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/const/colors';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import BottomNavigator from './src/views/navigation/BottomNavigation';
// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

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



// //import React in our code
// import React, {useState} from 'react';

// //import all the components we are going to use
// import {
//   SafeAreaView,
//   Text,
//   View,
//   StyleSheet,
//   Button
// } from 'react-native';

// import Spinner from 'react-native-loading-spinner-overlay';

// const App = () => {
//   const [loading, setLoading] = useState(false);

//   const startLoading = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 5000);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <Spinner
//           //visibility of Overlay Loading Spinner
//           visible={loading}
//           //Text with the Spinner
//           textContent={'Loading...'}
//           //Text style of the Spinner Text
//           textStyle={styles.spinnerTextStyle}
//         />
//         <Text style={{textAlign: 'center', fontSize: 20}}>
//           Spinner Overlay Example
//         </Text>
//         <Button
//           title="Start Loading"
//           onPress={startLoading}>
//         </Button>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     textAlign: 'center',
//     paddingTop: 30,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
// });

// export default App;