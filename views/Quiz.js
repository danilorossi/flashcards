import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Content, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

import {
  startQuiz,
  submitAnswer
} from '../ducks/quiz';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Quiz'
  });
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  goHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
      ]
    });

    this.props.navigation.dispatch(resetAction)
  }
  startQuiz(deck) {
    this.props.onStartQuiz(deck);

    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckDetails', params: { item: deck } }), // deck
        NavigationActions.navigate({ routeName: 'Quiz', params: { deck } }) // deck
      ]
    });

    this.props.navigation.dispatch(resetAction)

  }

  render() {

    const {
      deck,
      finished,
      questionIndex,
      currentCard,
      totalCards,
      correctAnswers,
      incorrectAnswers,
      navigation
    } = this.props;

    return (
      <Container>
        {!finished &&
          <Content>

            <Text>Question {questionIndex + 1}/{totalCards}</Text>
            <Text>{currentCard && currentCard.question}</Text>
            <Text>HIDE THIS: {currentCard && currentCard.answer}</Text>

            <Button rounded danger
              onPress={() => this.props.onSubmitAnswer(false)}>
              <Text>Incorrect</Text>
            </Button>
            <Button rounded success
              onPress={() => this.props.onSubmitAnswer(true)}>
              <Text>Correct</Text>
            </Button>

          </Content>
        }
        {finished &&
          <Content>

            <Text>Finished</Text>
            <Text>{((correctAnswers/totalCards)*100).toFixed(2)}% ({correctAnswers}/{incorrectAnswers})</Text>

            <Button rounded light
              onPress={() => this.goHome()}>
              <Text>Home</Text>
            </Button>

            <Button rounded light
              onPress={() => this.startQuiz(deck)}>
              <Text>Restart Quiz</Text>
            </Button>

          </Content>
        }
      </Container>
    )
  }

}


function mapDispatchToProps (dispatch) {
  return {
    onStartQuiz: (deck) => dispatch(startQuiz(deck)),
    onSubmitAnswer: (answer) => dispatch(submitAnswer(answer)),
  }
}

function mapStateToProps (state) {

  const totalCards = state.quiz.deck.cards.length;
  const correctAnswers = state.quiz.answers.filter(a => a).length;
  const incorrectAnswers = totalCards - correctAnswers;
  return {
    deck: state.quiz.deck,
    currentCard: state.quiz.finished ? null : state.quiz.deck.cards[state.quiz.questionIndex],
    questionIndex: state.quiz.questionIndex,
    finished: state.quiz.finished,
    totalCards,
    correctAnswers,
    incorrectAnswers
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
