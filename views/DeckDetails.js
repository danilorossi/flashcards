import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button, Container, Content, H1, Text, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import * as Color from '../globals/colors';

import {
  startQuiz
} from '../ducks/quiz';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: '2%',
  },

  text: {

  }
})

class DeckDetails extends React.Component {


  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.item.name,
    headerRight: <Button onPress={() => {
      screenProps
        .deleteDeck(navigation.state.params.item)
        .then(() => {
          navigation.dispatch(
            NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home'}),
              ]
            })
          );
        });
    }} transparent><Icon style={{ color: Color.DANGER }} name="md-trash"/></Button>,

  });

  constructor(props) {
    super(props);
    this.startQuiz = this.startQuiz.bind(this);
  }

  startQuiz(deck) {
    this.props.onStartQuiz(deck);
    this.props.navigation.navigate('Quiz', { deck })
  }

  render() {

    const { navigation, deck } = this.props;
    const disableQuiz = !deck || deck.cards.length <= 0;

    return (
      <Container style={styles.container}>

          <H1 style={[styles.text, { marginTop: 'auto' }]}>{deck && deck.name}</H1>
          <Text style={styles.text}>{deck && deck.cards.length} cards</Text>

          <Button style={[styles.button, { marginTop: 'auto' }]}
            block light
            onPress={() => navigation.navigate('AddCard', { deck })}>
            <Text>Add Card</Text>
          </Button>
          <Button style={styles.button}
            block success
            disabled={disableQuiz}
            onPress={() => this.startQuiz(deck)}>
            <Text>Start Quiz</Text>
          </Button>

      </Container>
    )
  }

}


function mapDispatchToProps (dispatch) {
  return {
    onStartQuiz: (deck) => dispatch(startQuiz(deck)),
  }
}
function mapStateToProps (state, ownProps) {
  const { navigation } = ownProps;
  const { item } = navigation.state.params;
  return {
    deck: state.decks.filter(deck => deck.id === item.id)[0]
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails);
