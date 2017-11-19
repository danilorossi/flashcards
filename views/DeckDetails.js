import React, { Component } from 'react';
import { Container, Text } from 'native-base';



export default class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Deck "${navigation.state.params.item.name}"`
  });

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Text>Details</Text>
      </Container>
    )
  }

}
