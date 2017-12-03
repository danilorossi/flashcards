import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button, Container, Text, Icon } from 'native-base';

import {
  startQuiz
} from '../ducks/quiz';

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
    }} transparent danger><Icon name="trash"/></Button>,

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
      <Container>
        <Text>{deck && deck.cards.length} cards</Text>

        <Button
          rounded light
          onPress={() => navigation.navigate('AddCard', { deck })}
        >
          <Text>Add Card</Text>
        </Button>
        <Button
          rounded success
          disabled={disableQuiz}
          onPress={() => this.startQuiz(deck)}
        >
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
