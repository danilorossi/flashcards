import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Toast, Button, Header, Body, Text, Title, Content, Form, Item, Input, Label } from 'native-base';
import * as Color from '../globals/colors';

import {
  addCard
} from '../ducks/deck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },
  containerContent: {
    flex: 1,
    justifyContent: 'center'
  },
  formTitle: {
    marginTop: 20,
    marginBottom: 'auto'
  },
  formInput: {
    marginBottom: 20
  },
  button: {
    marginBottom: 'auto'
  }
})

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

    setTimeout(() => Toast.show({
        text: `New question added to ${deck.name}!`,
        position: 'bottom',
        type: 'success',
        duration: 2000
      }),
      500
    );
  }

  render() {

    const { answer, question } = this.state;

    const submitDisabled =
      answer.trim().length <= 0 ||
      question.trim().length <= 0;

    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.containerContent}>
          <Text style={styles.formTitle}>
            Create a new question
          </Text>
          <Form style={styles.formInput}>
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
            style={[styles.button, { backgroundColor: submitDisabled ? Color.DISABLED_BUTTON : Color.SUCCESS_BUTTON }]}
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
