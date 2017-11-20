import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import initialState from './store/initialState';

import CreateDeck from './views/CreateDeck';
import DeckDetails from './views/DeckDetails';
import Decks from './views/Decks';

// Init redux store with initial state
const store = configureStore(initialState);

// -------- create test data
store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 1' });
store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 2' });
store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 3' });
store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 4' });
store.dispatch({ type: 'flashcards/decks/CREATE_DECK', name: 'Deck 5' });
// --------------------------------

const HomeTabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: () => <MaterialCommunityIcons name='cards' size={30}/>
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: () => <MaterialCommunityIcons name='plus' size={30}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeTabs
  },
  DeckDetails: {
    screen: DeckDetails
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
  render() {
    const decks = store.getState().decks;

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar backgroundColor="grey" barStyle="light-content" />
          <MainNavigator screenProps={{ decks }}/>
        </View>
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
