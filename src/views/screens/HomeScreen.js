import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import FIREBASE from '../../config/FIREBASE';
import {CardContact} from '../../maincomponents';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../const/colors';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: {},
      contactKey: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.MountData();
    console.log('Load And Refreshing');
  }

  MountData() {
    FIREBASE.database()
      .ref('contact')
      .once('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let contactItem = {...data};

        this.setState({
          contact: contactItem,
          contactKey: Object.keys(contactItem),
          refreshing: false,
        });

        this.state.contactKey.map(key =>
          console.log(this.state.contact[key].MenuFoodStatus),
        );
      });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount();
  };

  render() {
    const {contact, contactKey} = this.state;
    return (
      <View style={styles.conatiner}>
        <View style={styles.mainheader}>
          <Text style={styles.headertitle}>
            <Icon name="home-filled" size={26} />
            Menu
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }

          >
          <View style={styles.page}>
            {contactKey.length > 0 ? (
              contactKey.map(key =>
                contact[key].MenuFoodStatus == true ? (
                  <CardContact
                    key={key}
                    contactItem={contact[key]}
                    id={key}
                    {...this.props}
                    removeData={this.removeData}
                  />
                ) : null,
              )
            ) : (
              <Text> loading...</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {flex: 1, backgroundColor: COLORS.white},
  mainheader: {
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.primary,
  },
  headertitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    top: 50,
  },

  page: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 15,
  },

  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  grid: {
    borderWidth: 1,
    marginTop: 10,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },

  btn: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});


