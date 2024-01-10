import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator,ImageBackground } from 'react-native';
import default_color from '../styles/color';
import { useFonts, DancingScript_400Regular } from '@expo-google-fonts/dancing-script';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        DancingScript_400Regular,
        Pacifico_400Regular
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const handleSignIn = () => {
        // Logique de connexion ici
    };

    return (
        <ImageBackground 
            source={require('../../assets/images/home.jpeg')} 
            style={styles.container}
        >

        <View style={styles.container2}>
            <StatusBar translucent backgroundColor="transparent" />
            {/* <View style={styles.container_image}>
                <Image source={require('../../assets/images/home.jpeg')} style={styles.image} />
            </View> */}
            <View style={styles.container_form}>
                <Text style={styles.connexion}>Formulaire de connexion</Text>
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={15} color="orange" style={styles.iconStyle} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="orange" 
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="orange" style={styles.iconStyle} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        secureTextEntry={!passwordVisible}
                        placeholderTextColor="orange" 
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="orange" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
                <Text style={styles.signupText} onPress={() => navigation.navigate('Inscription')}>
                    Vous n'avez pas de compte ? Inscrivez-vous
                </Text>
                <View>
                    <Text style={styles.slogan}>"Tasa, the power of your money is in your hands"</Text>
                </View>
            </View>
        </View>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex: 1,
        // backgroundColor: default_color.white,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginBottom:'20%',
        marginTop:'20%',
        marginHorizontal:10,
        borderRadius:10
        // paddingLeft:10,
        // paddingRight:10
    },
    image: {
        height: 350,
        width: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 70,
    },
    container_image: {
        justifyContent: 'flex-start',
    },
    connexion: {
        textAlign: 'center',
        marginBottom: 20,
        // marginTop: 60,
        fontSize: 25,
        fontFamily: 'Pacifico_400Regular',
        color: 'orange'
    },
    container_form: {
        flex: 1,
        padding: 10,
        justifyContent:'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'orange',
        borderWidth: 1,
        marginBottom: 20,
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
        color:'white'
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
        alignItems: 'center',
        borderRadius: 7,
    },
    buttonText: {
        color: default_color.white,
        fontSize: 15,
        fontFamily: 'Pacifico_400Regular',
    },
    signupText: {
        marginTop: 20,
        textAlign: 'center',
        color: default_color.principal,
        fontSize: 12,
        fontFamily: 'Pacifico_400Regular',
    },
    slogan:{
        textAlign:'center',
        marginTop:15,
        fontSize:12,
        fontFamily: 'Pacifico_400Regular',
        color:'white'

    }
});

export default HomeScreen;
