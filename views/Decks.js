import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

export default function Decks ({ navigation }) {
  return (
    // <View>
    //   <Text>HOME PAGE</Text>
    //   <TouchableOpacity onPress={() => navigation.navigate('DeckDetails')}>
    //     <Text>Press here for the Dashboard</Text>
    //   </TouchableOpacity>
    // </View>

    <Container>

      <Content>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
        <Button rounded success onPress={() => navigation.navigate('DeckDetails')}>
          <Text>Success</Text>
        </Button>
      </Content>
    </Container>
  )
}
