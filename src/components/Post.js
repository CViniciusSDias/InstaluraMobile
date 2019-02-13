import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList} from "react-native";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import Likes from "./Likes";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto
        };
    }

    render() {
        const { foto, like, addComment } = this.props;
        return (
            <View>
                <View style={styles.header}>
                    <Image source={{uri: foto.urlPerfil}} style={styles.profilePicture} />
                    <Text>{foto.loginUsuario}</Text>
                </View>

                <Image style={styles.image} source={{uri: foto.urlFoto}} />

                <View style={styles.footer}>
                    <Likes foto={foto} like={() => like(foto.id)} />

                    {foto.comentario.length > 0 && (<Comment comentario={{login: foto.loginUsuario, texto: foto.comentario}} />)}


                    <FlatList data={foto.comentarios}
                              keyExtractor={comentario => comentario.id.toString()}
                              renderItem={({item}) => <Comment comentario={item} />} />

                    <CommentInput addComment={addComment} fotoId={foto.id} />
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
    footer: {
        margin: 10
    }
});
