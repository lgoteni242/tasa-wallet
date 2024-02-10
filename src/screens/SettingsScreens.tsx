import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
import { Roboto_700Bold, Roboto_100Thin,Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_300Light,
    RobotoSerif_100Thin,
} from "@expo-google-fonts/roboto-serif";
const SettingsScreens = ({ navigation }) => {

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

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />

            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <Text style={styles.welcomMessage}>Profil</Text>
                </View>

                <Text style={{ color: 'white', fontSize: 18, fontFamily: 'RobotoSerif_400Regular' }}>LEVI CHRIST GOTENI</Text>
            </View>

            <ScrollView style={{ backgroundColor: '#E7E7E7' }}>
                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Compte</Text>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", fontSize: 12 }}>LEVI CHRIST GOTENI</Text>
                                <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Nom(s) et prenom(s)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>+242 068676562</Text>
                                <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Numero de telephone</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>lgoteni00@gmail.com</Text>
                                <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Adresse email</Text>
                            </View>
                        </View>
                    </View>

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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                        <Text style={styles.buttonText}>Sauvegarder</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Authentification en deux étapes</Text>
                    <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Lorsque l’authentification à deux facteurs est activée, un jeton aléatoire sécurisé vous sera demandé pendant l’authentification. Vous pouvez récupérer ce jeton à partir de l’application Google Authenticator de votre téléphone.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                        <Text style={styles.buttonText}>Activer</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Sessions de navigateur</Text>
                    <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Si nécessaire, vous pouvez vous déconnecter de toutes vos autres sessions de navigateur sur tous vos appareils. Certaines de vos sessions récentes sont énumérées ci-dessous; cependant, cette liste peut ne pas être exhaustive. Si vous pensez que votre compte a été compromis, vous devez également mettre à jour votre mot de passe.</Text>
                    <TouchableOpacity style={styles.buttonEnd} onPress={() => navigation.navigate('Menu')}>
                        <Text style={styles.buttonTextEnd}>Se deconnecter des autres sessions du navigateur</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 60 }}>
                    <Text style={{ textAlign: 'center', color: 'rgba(151,34,13,1)', fontFamily: "RobotoSerif_100Thin", fontSize: 10 }}>
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
    iconStyleRetour: {
        position: "absolute",
        left: 20,
        zIndex: 2,
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
        // flex: 0.4,
        height: 150,
        justifyContent: 'center',
        backgroundColor: default_color.orange,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        padding: 20,
        alignItems: 'center'
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
        borderWidth: 0.4,
        marginBottom: 20,
        borderRadius: 3,
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
        fontSize: 10,
        fontFamily: 'RobotoSerif_400Regular'

    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 3,
        marginBottom: 10,
        width: '40%',

    },
    buttonEnd: {
        backgroundColor: default_color.orange,
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 3,
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

    welcomMessage: {
        fontFamily: 'RobotoSerif_400Regular',
        color: 'white',
        fontSize: 15
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
        borderColor: '#ccc'

    },
    transcationListeEnd: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomWidth: 0.3,
        borderColor: '#ccc'

    },


});

export default SettingsScreens;
