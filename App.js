/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {FlatList} from 'react-native';
import Post from './src/components/Post';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fotos: []
    };
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
        .then(response => response.json())
        .then(fotos => this.setState({fotos}));
  }

  render() {
    return (
        <FlatList data={this.state.fotos}
                  renderItem={({item}) => <Post foto={item} />}
                  keyExtractor={foto => foto.id.toString()}
        />
    );
  }
}

