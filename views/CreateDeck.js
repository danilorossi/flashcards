import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Header, Body, Text, Title, Content, Form, Item, Input, Label } from 'native-base';

import {
  createDeck
} from '../ducks/deck';

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
    this.setState({ text: '' });
    this.props.navigation.navigate('Decks');
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>New Deck</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={this.onChangeHandler} value={this.state.text}/>
            </Item>
          </Form>
          <Button
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
