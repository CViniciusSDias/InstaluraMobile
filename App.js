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

  like(fotoId) {
    const foto = this.state.fotos.find(foto => foto.id === fotoId);

    const likerList = foto.likeada
        ? foto.likers.filter(liker => liker.login !== 'meuUsuario')
        : foto.likers.concat({login: 'meuUsuario'});

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: likerList
    };

    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);

    this.setState({fotos});
  }

  addComment(fotoId, commentText) {
    if (commentText.trim() === '') {
      return;
    }

    const foto = this.state.fotos.find(foto => foto.id === fotoId);

    const comments = foto.comentarios.concat({
      id: commentText,
      login: 'meuUsuario',
      texto: commentText
    });
    const fotoAtualizada = {
      ...foto,
      comentarios: comments
    };
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);

    this.setState({fotos});
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
        .then(response => response.json())
        .then(fotos => this.setState({fotos}));
  }

  render() {
    return (
        <FlatList data={this.state.fotos}
                  renderItem={({item}) => <Post foto={item} like={this.like.bind(this)} addComment={this.addComment.bind(this)} />}
                  keyExtractor={foto => foto.id.toString()}
        />
    );
  }
}

