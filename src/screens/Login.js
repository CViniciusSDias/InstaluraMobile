import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Platform, Button, Text, AsyncStorage } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            senha: '',
            errorMessage: ''
        };
    }

    doLogin() {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.login,
                senha: this.state.senha
            }),
            headers: {
                'Content-type': 'application/json'
            }
        };
        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao realizar login');
                }

                return response.text();
            })
            .then(token => {
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.login);
            })
            .catch(e => {
                this.setState({errorMessage: e.message});
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Instalura</Text>

                <View style={styles.form}>
                    <TextInput style={styles.input}
                               placeholder="Usuário"
                               autoCapitalize="none"
                               onChangeText={texto => this.setState({login: texto})} />

                    <TextInput style={styles.input}
                               placeholder="Senha"
                               secureTextEntry={true}
                               onChangeText={texto => this.setState({senha: texto})} />
                </View>

                <Button title="Login" onPress={this.doLogin.bind(this)} />

                <Text style={styles.message}>
                    {this.state.errorMessage}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    form: {
        width: '80%',
        marginBottom: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26
    },
    message: {
        color: '#e74c3c',
        marginTop: 10
    }
});
