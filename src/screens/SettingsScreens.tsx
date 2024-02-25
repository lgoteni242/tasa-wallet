import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
import { Roboto_700Bold, Roboto_100Thin, Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_100Thin,
} from "@expo-google-fonts/roboto-serif";
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { retrieveValue } from '../../utils/utils.js'


const SettingsScreens = ({ navigation }) => {

    const user = useSelector(state => state.auth.user);
    const [passwordVisible, setPasswordVisible] = useState(false);

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_100Thin,
        RobotoSerif_400Regular,
        RobotoSerif_100Thin,
        RobotoSerif_700Bold,
        Roboto_400Regular
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const handleSignIn = () => {
        // Logique de connexion ici
    };

    const getCodeAccesVerif = (async () => {
        return SecureStore.getItemAsync('codeAccesVerif');
    })();


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="light-content" />

            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <View style={{ borderColor: 'white', borderWidth: 2, borderRadius: 100 }}>
                        <Image source={require('../../assets/images/user.jpg')} style={styles.image} />
                    </View>
                </View>
                <Text style={{ color: 'white', fontSize: 12, fontFamily: 'RobotoSerif_400Regular', marginBottom: 20, textTransform: 'uppercase' }}>{user && user.prenom} {user && user.name}</Text>
            </View>

            <ScrollView style={{ backgroundColor: '#E7E7E7' }}>
                <View style={styles.aujourdhui}>
                    {/* <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Compte</Text> */}
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <Icon name="user" color="grey" size={20} style={{ marginRight: 18 }} />

                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", fontSize: 12 }}>{user && user.prenom} {user && user.name}</Text>
                                <Text style={{ textTransform: 'uppercase', color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Nom(s) et prenom(s)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <Icon name="phone" color="grey" size={20} style={{ marginRight: 18 }} />

                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>{user && user.phone}</Text>
                                <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Numero de telephone</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <Icon name="envelope" color="grey" size={20} style={{ marginRight: 18 }} />
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>{user && user.email}</Text>
                                <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Adresse email</Text>
                            </View>
                        </View>
                    </View>
                    {retrieveValue('codeAccesVerif') ?
                        <TouchableOpacity style={styles.transcationListe} onPress={() => navigation.navigate('CodeVerif')}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: "center", width: "90%" }}>
                                <Icon name="lock" color="grey" size={20} style={{ marginRight: 18 }} />
                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: "center", width: "100%" }}>
                                    <Text style={{ fontFamily: "RobotoSerif_400Regular" }}>Code d'accès</Text>
                                    <Text style={{ color: default_color.orange, fontSize: 12, fontFamily: "RobotoSerif_400Regular" }}>Activée</Text>
                                </View>
                            </View>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.transcationListe} onPress={() => navigation.navigate('CodeAcces')}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center", width: "100%" }}>
                                <Icon name="lock" color="grey" size={20} style={{ marginRight: 18 }} />
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: "center", width: "90%" }}>
                                    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>Définir un code de sécurité.</Text>
                                        <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Le code de sécurité protege votre application.</Text>
                                    </View>
                                    <Icon name="chevron-right" color="grey" size={12} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    }

                </View>
                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 14, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Mettre a jour le mot de passe</Text>
                    {/* <View style={styles.transcationListe}> */}
                    <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe actuel"
                            secureTextEntry={!passwordVisible}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nouveau mot de passe"
                            secureTextEntry={!passwordVisible}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmez le mot de passe"
                            secureTextEntry={!passwordVisible}
                        />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sauvegarder</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Authentification en deux étapes</Text>
                    <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Lorsque l’authentification à deux facteurs est activée, un jeton aléatoire sécurisé vous sera demandé pendant l’authentification. Vous pouvez récupérer ce jeton à partir de l’application Google Authenticator de votre téléphone.</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Activer</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Sessions de navigateur</Text>
                    <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Si nécessaire, vous pouvez vous déconnecter de toutes vos autres sessions de navigateur sur tous vos appareils. Certaines de vos sessions récentes sont énumérées ci-dessous; cependant, cette liste peut ne pas être exhaustive. Si vous pensez que votre compte a été compromis, vous devez également mettre à jour votre mot de passe.</Text>
                    <TouchableOpacity style={styles.buttonEnd} >
                        <Text style={styles.buttonTextEnd}>Se deconnecter des autres sessions du navigateur</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ textAlign: 'center', color: 'gray', fontFamily: "RobotoSerif_100Thin", fontSize: 10 }}>
                        Tasa wallet v.1.0
                    </Text>
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
    container_logo: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 70,
        padding: 20
    },
    icon: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white'
    },

    container_image: {
        // flex: 0.4,
        height: 140,
        justifyContent: 'center',
        backgroundColor: default_color.orange,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        padding: 20,
        alignItems: 'center'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 100,
    },

    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        fontSize: 10,
        fontFamily: 'RobotoSerif_400Regular'

    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 100,
        marginBottom: 10,
        width: '40%',

    },
    buttonEnd: {
        backgroundColor: default_color.orange,
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 100,
        marginBottom: 10,
        width: '100%',

    },
    buttonText: {
        color: default_color.white,
        fontSize: 13,
        fontFamily: 'RobotoSerif_400Regular',
    },
    buttonTextEnd: {
        color: default_color.white,
        fontSize: 10,
        fontFamily: 'RobotoSerif_400Regular',
    },
    aujourdhui: {
        marginBottom: 10,
        elevation: 5, // pour Android
        shadowColor: '#000', // pour iOS
        shadowOffset: { width: 0, height: 2 }, // 
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    transcationListe: {
        marginTop: 1,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#ccc',


    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100
    },


});

export default SettingsScreens;
