import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';

import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [verifInscription, setVerifInscription] = useState(true);

    const handelChange = () => {

    }
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
                    <Text style={styles.icon}>T'wallet</Text>

                    {verifInscription ?
                        <Text style={styles.connexion}>Connexion au compte tasa wallet</Text> :

                        <Text style={styles.connexion}>Creation d'un compte tasa walet</Text>
                    }
                </View>
            </View>
            {
                verifInscription ?
                    <ScrollView style={styles.container_form}>
                        <View style={styles.inputContainer}>
                            <Icon name="envelope" size={15} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer2}>
                            <Icon name="lock" size={20} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Mot de passe"
                                secureTextEntry={!passwordVisible}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.mdp} onPress={() => navigation.navigate('MotPasseOublier')}>
                            Mot de passe oublier
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                            <Text style={styles.buttonText}>Se connecter</Text>
                        </TouchableOpacity>

                        <Text style={styles.signupText} onPress={() => setVerifInscription(false)}>
                            Vous n'avez pas de compte ? Inscrivez-vous
                        </Text>
                        <View>
                            <Text style={styles.slogan}>"Tasa, the power of your money is in your hands"</Text>
                        </View>
                    </ScrollView>
                    :
                    <ScrollView style={styles.container_form}>
                        <View style={styles.inputContainer}>
                            <Icon name="user" size={15} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nom complet"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="envelope" size={15} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Mot de passe"
                                secureTextEntry={!passwordVisible}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={20} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmer votre mot de passe"
                                secureTextEntry={!passwordVisible}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                            <Text style={styles.buttonText}>S'inscrire</Text>
                        </TouchableOpacity>

                        <Text style={styles.signupText} onPress={() => setVerifInscription(true)}>
                            Si vous avez deja un compte, veillez-vous connecter.
                        </Text>
                        <View>
                            <Text style={styles.slogan}>"Tasa, the power of your money is in your hands"</Text>
                        </View>
                    </ScrollView>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container_logo: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    icon: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 70,
    },
    container_image: {
        flex: 0.4,
        justifyContent: 'flex-start',
        backgroundColor: default_color.orange,
        borderBottomLeftRadius: 70,
        // marginBottom:70

    },
    connexion: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 17,
        fontFamily: 'Pacifico_400Regular',
        color: 'white'
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 7,
        fontFamily: 'Pacifico_400Regular',
    },
    passwordInput: {
        flex: 1,
        height: 55,
        paddingHorizontal: 10,
        fontFamily: 'Pacifico_400Regular',
    },
    eyeIcon: {
        padding: 10,
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
    mdp: {
        color: 'gray',
        fontSize: 10,
        // fontStyle:'italic',
        marginVertical: 10,
        textAlign: 'right',
        fontFamily: 'Pacifico_400Regular',
    },
    signupText: {
        marginTop: 20,
        textAlign: 'center',
        color: default_color.principal,
        fontSize: 12,
        fontFamily: 'Pacifico_400Regular',
    },
    slogan: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 13,
        fontFamily: 'Pacifico_400Regular',

    }
});

export default HomeScreen;
