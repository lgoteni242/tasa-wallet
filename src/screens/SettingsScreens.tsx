import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsScreens = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const handleSignIn = () => {
        // Logique de connexion ici
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.iconStyleRetour}
                    
                    >
                        <Icon name="arrow-left" size={20} color="white"  />
                    </TouchableOpacity>
                    {/* <Text style={styles.icon}>T'wallet</Text> */}
                    <Text style={styles.connexion}>Mot de passe oublier</Text>
                </View>
            </View>

            <ScrollView style={styles.container_form}>
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={15} color="grey" style={styles.iconStyle} />
                    <TextInput
                        style={styles.input}
                        placeholder="Veillez saisir votre addresse email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Envoyer</Text>
                </TouchableOpacity>

                <View>
                    <Text style={styles.slogan}>"Tasa, the power of your money is in your hands"</Text>
                </View>
            </ScrollView>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    iconStyleRetour: {
        position: "absolute",
        left: 20,
        zIndex:2,
        // padding:10
    },
    container_logo: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 20,
        padding: 20
    },
    icon: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white'
    },

    container_image: {
        flex: 0.4,
        justifyContent: 'flex-start',
        backgroundColor: default_color.orange,
    },
    container_form: {
        flex: 0.6,
        padding: 20,
        // justifyContent:'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 7,
    },
    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 7,
    },
    iconStyle: {
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 55,
        paddingHorizontal: 10,
        fontFamily: 'Pacifico_400Regular',
    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 7,
    },
    buttonText: {
        color: default_color.white,
        fontSize: 15,
        fontFamily: 'Pacifico_400Regular',
    },
    slogan: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 13,
        fontFamily: 'Pacifico_400Regular',

    },
    connexion: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 17,
        fontFamily: 'Pacifico_400Regular',
        color: 'white'
    },
});

export default SettingsScreens;
