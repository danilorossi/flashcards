import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { Toast, Container, Button, Header, Body, Text, Title, Content, Form, Item, Input, Label } from 'native-base';

import {
  createDeck
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

class CreateDeck extends React.Component {

  state = {
    text: ''
  };

  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onCreatePressed = this.onCreatePressed.bind(this);
  }

  onChangeHandler(text) {
    this.setState({
      text
    });
  }

  onCreatePressed() {
    this.props.onCreateDeck(this.state.text);
    const deckName = this.state.text;
    this.setState({ text: '' });
    this.props.navigation.navigate('Decks');
    setTimeout(() => Toast.show({
        text: `Deck "${deckName}" succesfully created!`,
        position: 'top',
        type: 'success',
        duration: '2000'
      }),
      500
    );

  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.containerContent}>
          <Text style={styles.formTitle}>
            What is the title of your new deck?
          </Text>

          <Form style={styles.formInput}>
            <Item floatingLabel>
              <Label>Deck title</Label>
              <Input onChangeText={this.onChangeHandler} value={this.state.text}/>
            </Item>
          </Form>

          <Button
            style={styles.button}
            full
            success
            disabled={this.state.text.trim().length <= 0}
            onPress={this.onCreatePressed}>
            <Text>Create</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}

function mapDispatchToProps (dispatch) {
  return {
    onCreateDeck: (name) => dispatch(createDeck(name)),
  }
}

export default connect (null, mapDispatchToProps)(CreateDeck);

// export default CreateDeck;
