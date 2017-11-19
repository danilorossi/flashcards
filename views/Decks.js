import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Decks ({ navigation }) {
  return (
    <View>
      <Text>HOME PAGE</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DeckDetails')}>
        <Text>Press here for the Dashboard</Text>
      </TouchableOpacity>
    </View>
  )
}
