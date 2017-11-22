import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Content, Text } from 'native-base';

import {
  submitAnswer
} from '../ducks/quiz';

class Quiz extends React.Component {

  render() {

    const {
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

            <Button
              rounded error
              onPress={() => this.props.onSubmitAnswer(false)}
            >
              <Text>Incorrect</Text>
            </Button>
            <Button
              rounded success
              onPress={() => this.props.onSubmitAnswer(true)}
            >
              <Text>Correct</Text>
            </Button>
          </Content>
        }
        {finished &&
          <Content>
            <Text>Finished</Text>
            <Text>{correctAnswers} right / {incorrectAnswers} wrong</Text>
            <Button
              rounded light
              onPress={() => navigation.navigate('Home')}
            >
              <Text>Home</Text>
            </Button>
          </Content>
        }
      </Container>
    )
  }

}


function mapDispatchToProps (dispatch) {
  return {
    onSubmitAnswer: (answer) => dispatch(submitAnswer(answer)),
  }
}

function mapStateToProps (state) {

  const totalCards = state.quiz.deck.cards.length;
  const correctAnswers = state.quiz.answers.filter(a => a).length;
  const incorrectAnswers = totalCards - correctAnswers;
  return {
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
