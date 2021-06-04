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
  Dimensions,
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {CardContact, CategoryCard} from '../../maincomponents';
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
      category: {},
      categoryKey: [],
      refreshing: false,
      categoryCheesed: false,
      choosedCategortName: '',
      categoryArray: [],
      allFoods: true,
    };
  }

  componentDidMount() {
    this.MountData();
    this.MountCategory();
  }

  triggerData = category => {
    let foodCategory = category;
    // console.log('trigger');
    this.setState({
      categoryCheesed: true,
      allFoods: false,
      choosedCategortName: foodCategory,
    });
    // let foodCategory = category;
    // let conn = FIREBASE.database().ref('contact');
    // let query = conn.orderByChild('category').equalTo(foodCategory);
    // query.once('value', querySnapShot => {
    //   console.log('Exe');
    //   let data = querySnapShot.val() ? querySnapShot.val() : {};
    //   let contactItem = {...data};
    //   this.setState({
    //     contact: contactItem,
    //     contactKey: Object.keys(contactItem),
    //     refreshing: false,
    //   });
    // });
  };

  MountData() {
    this.setState({
      categoryCheesed: false,
      allFoods: true,
    });
    // FIREBASE.database()
    //   .ref('contact')
    //   .orderByChild('category')
    //   // .equalTo('Lunch')
    //   .on('child_added', function (data) {
    //     console.log('Equal to filter: ' + data.val().name);
    //   });

    FIREBASE.database()
      .ref('contact')
      .once('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let contactItem = {...data};

        this.setState({
          contact: contactItem,
          contactKey: Object.keys(contactItem),
          refreshing: false,
          categoryArray: contactItem.category,
        });
      });
  }

  MountCategory() {
    // console.log(this.state.contactKey);

    FIREBASE.database()
      .ref('categories')
      .once('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let categoryItem = {...data};

        this.setState({
          category: categoryItem,
          categoryKey: Object.keys(categoryItem),
          // refreshing: false,
        });
      });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount();
  };

  render() {
    const {category, categoryKey, contact, contactKey} = this.state;
    return (
      <View style={styles.conatiner}>
        <View style={styles.mainheader}>
          {this.state.allFoods ? (
            <Text style={styles.headertitle}>All Food For You</Text>
          ) : (
            <Text style={styles.headertitle}>
              {this.state.choosedCategortName} For You
            </Text>
          )}
        </View>

        <View style={styles.categorieItems}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                this.MountData();
              }}>
              <Text style={styles.categories}>All</Text>
            </TouchableOpacity>
            {categoryKey.length > 0
              ? categoryKey.map(key => (
                  <CategoryCard
                    category={category[key]}
                    key={key}
                    triggerData={this.triggerData}
                  />
                ))
              : null}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.page}>
            {this.state.categoryCheesed == false ? (
              contactKey.length > 0 ? (
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
                <View
                  style={{
                    height: Dimensions.get('window').width,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.secondary,
                      fontWeight: 'bold',
                    }}>
                    Sorry! No Foods Available
                  </Text>
                </View>
              )
            ) : contactKey.length > 0 ? (
              contactKey.map(key =>
                (contact[key].MenuFoodStatus == true &&
                  contact[key].category[0] == this.state.choosedCategortName) ||
                contact[key].category[1] == this.state.choosedCategortName ||
                contact[key].category[2] == this.state.choosedCategortName ||
                contact[key].category[3] == this.state.choosedCategortName ||
                contact[key].category[4] == this.state.choosedCategortName ||
                contact[key].category[5] == this.state.choosedCategortName ||
                contact[key].category[6] == this.state.choosedCategortName ? (
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
              <View
                style={{
                  height: Dimensions.get('window').width,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontWeight: 'bold',
                  }}>
                  Sorry! No Foods Available
                </Text>
              </View>
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
    color: COLORS.light,
    top: 50,
  },

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

  categorieItems: {
    flexDirection: 'row',
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
