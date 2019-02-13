import React, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";

export default class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
        };
    }

    render() {
        return (
            <View style={styles.newComment}>
                <TextInput placeholder="Adicione um comentário"
                           style={styles.input}
                           ref={input => this.commentInput = input}
                           onChangeText={text => this.setState({commentText: text})} />

                <TouchableOpacity onPress={() => {
                    this.props.addComment(this.state.commentText);
                    this.commentInput.clear();
                }}>
                    <Image style={styles.sendIcon}
                           source={require('../../resources/img/send.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
