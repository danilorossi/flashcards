import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Text } from 'native-base';



class DeckDetails extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name
  });

  render() {

    const { navigation, deck } = this.props;

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
          onPress={() => navigation.navigate('Quiz', { deck })}
        >
          <Text>Start Quiz</Text>
        </Button>
      </Container>
    )
  }

}

function mapStateToProps (state, ownProps) {
  const { navigation } = ownProps;
  const { item } = navigation.state.params;
  return {
    deck: state.decks.filter(deck => deck.id === item.id)[0]
  }
}

export default connect(mapStateToProps)(DeckDetails);
