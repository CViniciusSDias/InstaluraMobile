import React, { Component } from 'react';
import {Image, TouchableOpacity, View, StyleSheet, Text} from "react-native";

export default class Likes extends Component {
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
        return this.props.foto.likeada
            ? require('../../resources/img/s2-checked.png')
            : require('../../resources/img/s2.png');
    }

    render() {
        const  { foto } = this.props;
        return (
            <View>
                <TouchableOpacity style={styles.likeButton} onPress={this.props.like}>
                    <Image style={styles.likeButton} source={this.likeIcon} />
                </TouchableOpacity>

                {this.showLikes(foto.likers)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    likeButton: {
        width: 30,
        height: 30
    },
    boldStyle: {
        fontWeight: 'bold'
    }
});
