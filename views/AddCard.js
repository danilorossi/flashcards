import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Header, Body, Text, Title, Content, Form, Item, Input, Label } from 'native-base';

import {
  addCard
} from '../ducks/deck';

class Quiz extends Component {

  state = {
    answer: '',
    question: ''
  };

  constructor(props) {
    super(props);
    this.onChangeQuestionHandler = this.onChangeQuestionHandler.bind(this);
    this.onChangeAnswerHandler = this.onChangeAnswerHandler.bind(this);
    this.onAddPressed = this.onAddPressed.bind(this);
  }

  onChangeQuestionHandler(question) {
    this.setState({
      question
    });
  }

  onChangeAnswerHandler(answer) {
    this.setState({
      answer
    });
  }

  onAddPressed() {
    const { navigation } = this.props;
    const { question, answer } = this.state;
    const { deck } = navigation.state.params;

    this.props.onAddCard(question, answer, deck.id);

    this.setState({
      question: '',
      answer: ''
    });
    
    this.props.navigation.goBack();
  }

  render() {

    const { answer, question } = this.state;

    const submitDisabled =
      answer.trim().length <= 0 ||
      question.trim().length <= 0;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Add Card</Title>
          </Body>
        </Header>
        <Content>

          <Form>
            <Item floatingLabel>
              <Label>Question</Label>
              <Input onChangeText={this.onChangeQuestionHandler} value={this.state.question}/>
            </Item>
            <Item floatingLabel>
              <Label>Answer</Label>
              <Input onChangeText={this.onChangeAnswerHandler} value={this.state.answer}/>
            </Item>
          </Form>
          <Button
            full
            success
            disabled={submitDisabled}
            onPress={this.onAddPressed}>
            <Text>Add</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onAddCard: (question, answer, deckId) => dispatch(addCard(question, answer, deckId)),
  }
}
export default connect(null, mapDispatchToProps)(Quiz);
