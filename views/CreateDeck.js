import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Toast, Container, Button, Header, Body, Text, Title, Content, Form, Item, Input, Label } from 'native-base';
import * as Color from '../globals/colors';

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
    // this.props.navigation.navigate('Decks');
    setTimeout(() => Toast.show({
        text: `Deck "${deckName}" succesfully created!`,
        position: 'bottom',
        duration: 2000
      }),
      500
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.decks.length === this.props.decks.length + 1) {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'DeckDetails', params: { item: nextProps.decks[0] } }), // deck
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {

    const submitDisabled = this.state.text.trim().length <= 0;

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
            style={[styles.button, { backgroundColor: submitDisabled ? Color.DISABLED_BUTTON : Color.SUCCESS_BUTTON }]}
            full
            success
            disabled={submitDisabled}
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

function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}


export default connect (mapStateToProps, mapDispatchToProps)(CreateDeck);

// export default CreateDeck;
