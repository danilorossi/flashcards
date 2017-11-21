import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

class Decks extends React.Component {
// export default function Decks ({ navigation }) {

  render() {

    const {
      navigation,
      decks
    } = this.props;

    return (

      <Container>

        <Content>

          {decks &&
            <FlatList
              data={decks}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Button full success onPress={() => navigation.navigate('DeckDetails', { item })}>
                  <Text>{ item.name } ({ item.cards.length })</Text>
                </Button>
              )}
            />
          }

        </Content>

      </Container>
    )
  }
}


function mapStateToProps (state) {
  return {
    decks: state.decks
  }
}

export default connect (mapStateToProps)(Decks);
