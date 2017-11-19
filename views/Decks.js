import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

export default function Decks ({ navigation, screenProps }) {

  // function CardItem(deckData) {
  //   return (
  //     <Card>
  //       <CardItem>
  //         <Body>
  //           <Text>{ deckData.name }</Text>
  //         </Body>
  //       </CardItem>
  //     </Card>
  //   );
  // }

  return (
    // <View>
    //   <Text>HOME PAGE</Text>
    //   <TouchableOpacity onPress={() => navigation.navigate('DeckDetails')}>
    //     <Text>Press here for the Dashboard</Text>
    //   </TouchableOpacity>
    // </View>


    // renderItem={({item}) => (
    //   <Button rounded success onPress={() => navigation.navigate('DeckDetails', { item })}>
    //     <Text>{ item.name }</Text>
    //   </Button>
    // )}
    <Container>

      <Content>

        <FlatList
          data={screenProps.decks}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Button block success onPress={() => navigation.navigate('DeckDetails', { item })}>
              <Text>{ item.name }</Text>
            </Button>
          )}
        />

      </Content>
      
    </Container>
  )

}
