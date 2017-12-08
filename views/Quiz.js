import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Content, View, Card, H1, H3, CardItem, Left, Body, Text, Icon } from 'native-base';
import { NavigationActions } from 'react-navigation';

import {
  startQuiz,
  submitAnswer
} from '../ducks/quiz';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Quiz'
  });

  state = {
    showAnswer: false
  };

  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.answerOk = this.answerOk.bind(this);
    this.answerKo = this.answerKo.bind(this);
  }

  answerOk() {
    // this._deckSwiper._root.swipeRight();
    this.setState({ showAnswer: false });
    this.props.onSubmitAnswer(true);
  }
  answerKo() {
    // this._deckSwiper._root.swipeLeft();
    this.setState({ showAnswer: false });
    this.props.onSubmitAnswer(false);
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

    // <Content>
    //
    //   <Text>Question {questionIndex + 1}/{totalCards}</Text>
    //   <Text>{currentCard && currentCard.question}</Text>
    //   <Text>HIDE THIS: {currentCard && currentCard.answer}</Text>
    //
    //   <Button rounded danger
    //     onPress={() => this.props.onSubmitAnswer(false)}>
    //     <Text>Incorrect</Text>
    //   </Button>
    //   <Button rounded success
    //     onPress={() => this.props.onSubmitAnswer(true)}>
    //     <Text>Correct</Text>
    //   </Button>
    //
    // </Content>

    return (
        <Container style={{ flex: 1 }}>

          <Content contentContainerStyle={{ flex: 1, justifyContent: 'space-between'  }}>

            <View style={{ flex: 3 }}>
              {!finished &&
                <Card>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>Card {questionIndex + 1} of {totalCards}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem style={{ height: 100, alignSelf: 'center' }}>
                    <H1>{currentCard.question}</H1>
                  </CardItem>
                  <CardItem style={{ alignSelf: 'center' }}>
                    <Button small bordered primary onPress={() => this.setState({ showAnswer: !this.state.showAnswer })}>
                      <Text>{ this.state.showAnswer ? 'Hide' : 'Show' } answer</Text>
                    </Button>
                  </CardItem>

                  {this.state.showAnswer &&
                    <CardItem style={{ alignSelf: 'center' }}>
                      <H3>{currentCard.answer}</H3>
                    </CardItem>
                  }

                </Card>
              }
              {finished &&
                <Card>

                  <CardItem>
                    <Left>
                      <Body>
                        <Text>Quiz finished!</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <CardItem style={{ height: 100, alignSelf: 'center' }}>
                    <H1>{((correctAnswers/totalCards)*100).toFixed(2)}%</H1>
                  </CardItem>

                  <CardItem style={{ alignSelf: 'center' }}>
                    <Text>{`(${correctAnswers} of ${totalCards})`}</Text>
                  </CardItem>

                </Card>
              }
            </View>


              {!finished &&
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: '5%' }}>
                 <Button iconLeft danger onPress={() => this.answerKo()} style={{alignSelf: 'flex-end'}}>
                   <Icon name="arrow-back" />
                   <Text>Incorrect</Text>
                 </Button>
                 <Button iconRight success onPress={() => this.answerOk()} style={{alignSelf: 'flex-end'}}>

                   <Text>Correct</Text>

                   <Icon name="arrow-forward" />
                 </Button>
                </View>
              }

              {finished &&
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: '5%' }}>
                  <Button success onPress={() => this.goHome()} style={{alignSelf: 'flex-end'}}>
                    <Text>Home</Text>
                  </Button>
                  <Button onPress={() => this.startQuiz(deck)} style={{alignSelf: 'flex-end'}}>
                    <Text>Restart Quiz</Text>
                  </Button>
                </View>
              }

         </Content>

        {/*finished &&
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
        */}
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
