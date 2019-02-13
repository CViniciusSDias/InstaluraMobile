import React, { Component } from 'react';
import {Text, View, StyleSheet} from "react-native";

export default class Comment extends Component {
    render() {
        const { comentario } = this.props;
        return (
            <View style={styles.comment}>
                <Text style={styles.commentTitle}>
                    {comentario.login}
                </Text>
                <Text>
                    {comentario.texto}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    comment: {
        flexDirection: 'row'
    },
    commentTitle: {
        fontWeight: 'bold',
        marginRight: 5
    }
});
