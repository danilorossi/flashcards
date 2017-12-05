import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body, Container, SwipeRow, Content, Button, Text } from 'native-base';

const styles = StyleSheet.create({
  cardButton: {
    margin: '2%',
    marginBottom: 0,
    marginTop: 0,
  },
  card: {
    alignItems:'center'
  },
  text: {
    alignSelf: 'center'
  }

})

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

                // <Button full success onPress={() => navigation.navigate('DeckDetails', { item })}>
                //   <Text>{ item.name } ({ item.cards.length })</Text>
                // </Button>
                <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('DeckDetails', { item })}>
                  <Card style={styles.card}>

                    <CardItem header>
                      <Text style={[styles.card, {marginTop: 'auto'}]}>{ item.name }</Text>
                    </CardItem>
                    <CardItem>
                      <Text style={[styles.card, {marginBottom: 'auto', color: 'grey'}]}>{ item.cards.length ? `${item.cards.length} cards` : 'No cards yet'}</Text>
                    </CardItem>

                 </Card>
               </TouchableOpacity>
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
