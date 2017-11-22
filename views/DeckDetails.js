import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Text } from 'native-base';

import {
  startQuiz
} from '../ducks/quiz';

class DeckDetails extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name
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
    const disableQuiz = deck.cards.length <= 0;

    return (
      <Container>
        <Text>{deck.cards.length} cards</Text>

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
