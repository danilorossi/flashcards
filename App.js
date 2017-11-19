import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import CreateDeck from './views/CreateDeck';
import DeckDetails from './views/DeckDetails';
import Decks from './views/Decks';
import { FontAwesome } from '@expo/vector-icons'

const HomeTabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: () => <FontAwesome name='plus-square' size={30}/>
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: () => <FontAwesome name='plus-square' size={30}/>
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

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainNavigator />
      </View>
    );
  }
}
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
