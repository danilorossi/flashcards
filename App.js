import React from 'react';
import { Root, StyleProvider, Toast } from 'native-base';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Font, Constants } from 'expo';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import { deleteDeck } from './ducks/deck';

import configureStore from './store/configureStore';
import initialState from './store/initialState';

import { setLocalNotification } from './utils/notifications';

import * as Color from './globals/colors';
import CreateDeck from './views/CreateDeck';
import DeckDetails from './views/DeckDetails';
import Decks from './views/Decks';
import AddCard from './views/AddCard';
import Quiz from './views/Quiz';



// Init redux store with initial state
const store = configureStore(initialState);

// -------- create test data
// store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 1' });
// store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 2' });
// store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 3' });
// store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 4' });
// store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 5' });
// --------------------------------

const HomeTabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: () => <MaterialCommunityIcons name='cards' color={Color.DEFAULT_TEXT} size={30}/>
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: () => <MaterialCommunityIcons name='plus' color={Color.DEFAULT_TEXT} size={30}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    showIcon: true,
    style: {
      backgroundColor: Color.PRIMARY
    },
    labelStyle: {
      color: Color.DEFAULT_TEXT,
      fontSize: 13
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeTabs
  },
  DeckDetails: {
    screen: DeckDetails
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: Color.PRIMARY
    },
    headerTitleStyle: {
      color: Color.DEFAULT_TEXT
    },
    headerTintColor: Color.DEFAULT_TEXT
  }
});

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


export default class App extends React.Component {
  state = {
    isReady: false
  };

  constructor(props) {
    super(props);
    // this.deleteDeck = this.deleteDeck.bind(this);
  }

  deleteDeck(deck) {

    return new Promise((resolve, reject) => {
      Alert.alert(
        'Delete deck',
        `Are you sure you want to delete deck ${deck.name}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              store.dispatch(deleteDeck(deck));
              setTimeout(() => Toast.show({
                  text: `Deck "${deck.name}" succesfully deleted.`,
                  position: 'bottom',
                  type: 'success',
                  duration: 2000
                }),
                500
              );
              resolve();
            }
          },
        ],
        { cancelable: false }
      )
    })

  }

  componentDidMount() {
    setLocalNotification();
  }

  async componentWillMount() {

    persistStore(store, {
      storage: AsyncStorage,
      whitelist: ['decks']
    });

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root>
          <View style={{ flex: 1 }}>
            <FlashcardsStatusBar backgroundColor={Color.PRIMARY} barStyle="light-content" />
            <MainNavigator
              screenProps={{ deleteDeck: this.deleteDeck }}/>
          </View>
        </Root>
      </Provider>
    );
  }
}
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
