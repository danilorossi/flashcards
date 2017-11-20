import React, { Component } from 'react';
import { Container, Button, Header, Body, Text, Title, Content, Form, Item, Input, Label } from 'native-base';

export default function CreateDeck () {
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
            <Input />
          </Item>
        </Form>
        <Button full success>
          <Text>Create</Text>
        </Button>
      </Content>
    </Container>
  )
}
