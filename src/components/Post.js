import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from "react-native";
import Comentario from "./Comentario";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto,
            commentText: ''
        };
    }

    like() {
        const likerList = this.state.foto.likeada
            ? this.state.foto.likers.filter(liker => liker.login !== 'meuUsuario')
            : this.state.foto.likers.concat({login: 'meuUsuario'});

        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: likerList
        };

        this.setState({foto: fotoAtualizada});
    }

    showLikes(likers) {
        if (likers.length <= 0) {
            return;
        }

        return (
            <Text style={styles.boldStyle}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );
    }

    get likeIcon() {
        return this.state.foto.likeada
            ? require('../../resources/img/s2-checked.png')
            : require('../../resources/img/s2.png');
    }

    showCaption(comentario, loginUsuario) {
        if (!comentario) {
            return;
        }

        return (<Comentario comentario={{login: loginUsuario, texto: comentario}}/>);
    }

    addComment() {
        if (this.state.commentText.trim() === '') {
            return;
        }

        const comments = this.state.foto.comentarios.concat({
            id: this.state.commentText,
            login: 'meuUsuario',
            texto: this.state.commentText
        });
        this.setState({
            foto: {
                ...this.state.foto,
                comentarios: comments
            },
            commentText: ''
        });
        this.commentInput.clear();
    }

    render() {
        const { foto } = this.state;
        return (
            <View>
                <View style={styles.header}>
                    <Image source={{uri: foto.urlPerfil}} style={styles.profilePicture} />
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image style={styles.image} source={{uri: foto.urlFoto}} />

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.likeButton} onPress={this.like.bind(this)}>
                        <Image style={styles.likeButton} source={this.likeIcon} />
                    </TouchableOpacity>

                    {this.showLikes(foto.likers)}
                    {this.showCaption(foto.comentario, foto.loginUsuario)}

                    <FlatList data={foto.comentarios}
                              keyExtractor={comentario => comentario.id.toString()}
                              renderItem={({item}) => <Comentario comentario={item} />} />

                    <View style={styles.newComment}>
                        <TextInput placeholder="Adicione um comentário"
                                   style={styles.input}
                                   ref={input => this.commentInput = input}
                                   onChangeText={text => this.setState({commentText: text})} />

                        <TouchableOpacity onPress={this.addComment.bind(this)}>
                            <Image style={styles.sendIcon}
                                   source={require('../../resources/img/send.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    image: {
        width: screenWidth,
        height: screenWidth
    },
    likeButton: {
        width: 30,
        height: 30
    },
    footer: {
        margin: 10
    },
    boldStyle: {
        fontWeight: 'bold'
    },
    newComment: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    input: {
        flexGrow: 1,
        height: 40
    },
    sendIcon: {
        width: 30,
        height: 30
    }
});
