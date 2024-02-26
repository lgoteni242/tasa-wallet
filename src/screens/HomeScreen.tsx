import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image, ToastAndroid } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import default_color from '../styles/color';
import {
    RobotoSerif_400Regular,
    RobotoSerif_100Thin,
    useFonts,
} from "@expo-google-fonts/roboto-serif";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomModalPicker from '../components/CustomModalPicker';
// import authStore from '../../store/authStore';
import { connect, useSelector } from 'react-redux';
import { login } from '../store/actions/authActions';
import { bindActionCreators } from 'redux';
import NetInfo from '@react-native-community/netinfo';



const HomeScreen = ({ navigation, login }) => {



    const flag = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [verifInscription, setVerifInscription] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [codePays, setCodePays] = useState('');
    const [isConnected, setIsConnected] = useState(false);


    const loginError = useSelector(state => state.auth.error);
    const isLogged = useSelector(state => state.auth.isLoggedIn);

    // useEffect(() => {
    //     if (isLogged) {
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'Menu' }],
    //         });
    //     } else {
    //         navigation.navigate('Home');
    //     }
    // }, [isLogged]);

    useEffect(() => {
        if (isLogged) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Menu' }],
                })
            );
        } else {
            navigation.navigate('Home');
        }
    }, [isLogged, navigation]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe(); // Nettoyer l'écouteur lorsque le composant est démonté
        };
    }, []);


    const handleLogin = async () => {

        if (username && password && codePays) {
            // Vérifier la connectivité internet
            if (isConnected) {
                try {
                    // Dispatch login action
                    await login(username, password, codePays);

                    // Si la connexion réussit, naviguez vers l'écran de tableau de bord
                    if (!isLogged) {
                        // Gestion erreur
                    }
                } catch (error) {
                    // Gérer les erreurs de connexion
                    console.error('Erreur de connexion :', error.message);
                }
            } else {
                showToast();
            }
        } else {
            // Afficher un message d'erreur pour informer l'utilisateur que tous les champs doivent être remplis
            ToastAndroid.show('Veuillez remplir tous les champs', ToastAndroid.SHORT);
        }

    };

    function showToast() {
        ToastAndroid.show('Vous n\'etes pas connecte a internet', ToastAndroid.SHORT);
    }


    const options = [{
        label: 'Republique du Congo',
        value: 242,
        flag: 'cg'
    },
    {
        label: 'Senegal',
        value: 221,
        flag: 'sn'
    }];

    let [fontsLoaded] = useFonts({
        RobotoSerif_400Regular,
        RobotoSerif_100Thin,

    });

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
        if (option == 'Republique du Congo') {
            setCodePays("CG")

        } else {
            setCodePays("SN")
        }
    };

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="dark-content" />
            <View style={styles.container_form}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "50%" }}>
                    <Image source={require('../../assets/images/login.png')} style={styles.image} />
                </View>
                {/* </View> */}
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.inputContainer2}>
                        {selectedOption == "" ?
                            <Icon name="globe" size={15} color="grey" style={styles.iconStyle} />
                            :
                            selectedOption == "Republique du Congo" ?
                                <Text style={styles.iconStyle}>{flag('cg')}</Text> :
                                <Text style={styles.iconStyle}>{flag('sn')}</Text>
                        }
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: "100%" }}>
                            {selectedOption == "" ? (<Text style={{ color: 'grey' }}>Pays de residence</Text>) : <Text>{selectedOption}</Text>}
                        </TouchableOpacity>
                        <CustomModalPicker
                            options={options}
                            onSelect={handleSelect}
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            titre="Choisir le pays de residence"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="phone" size={15} color="grey" style={styles.iconStyle} />
                        <TextInput
                            style={styles.input}
                            placeholder="Numero de telephone"
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>

                    <View style={styles.inputContainer3}>
                        <Icon name="lock" size={20} color="grey" style={styles.iconStyle} />
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            keyboardType="phone-pad"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {loginError && <Text style={{ color: 'red', fontSize: 7, fontFamily: 'RobotoSerif_400Regular', textAlign: 'center' }}>Les donnees d'authentification sont invalides, veillez recommencer</Text>}
                    <Text style={styles.mdp} onPress={() => navigation.navigate('MotPasseOublier')}>
                        Mot de passe oublier
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <Text style={styles.signupText} onPress={() => setVerifInscription(false)}>
                        Vous n'avez pas de compte ? Inscrivez-vous
                    </Text>
                    <View>
                        <Text style={styles.slogan}>Tasa, the power of your money is in your hands</Text>
                    </View>
                </View>
            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    icon: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'RobotoSerif_400Regular',
        marginBottom: 10

    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        marginBottom: 30
    },
    connexion: {
        textAlign: 'center',
        marginVertical: 0,
        fontSize: 12,
        fontFamily: 'RobotoSerif_400Regular',
        color: 'white'
    },
    container_form: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: "white",
        // padding: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 100,
    },

    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 20,
        paddingVertical: 15,
        borderRadius: 100,
    },
    inputContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 5,
        borderRadius: 100,
    },
    iconStyle: {
        paddingHorizontal: 10,
        color: 'grey'
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: 'RobotoSerif_400Regular',

    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 100,
        fontFamily: 'RobotoSerif_400Regular',


    },
    buttonText: {
        color: default_color.white,
        fontSize: 15,
        paddingVertical: 4,
        fontFamily: 'RobotoSerif_400Regular',

    },
    mdp: {
        color: 'gray',
        fontSize: 10,
        marginVertical: 10,
        textAlign: 'right',
        fontFamily: 'RobotoSerif_400Regular',
    },
    signupText: {
        marginTop: 20,
        textAlign: 'center',
        color: default_color.orange,
        fontSize: 12,
        fontFamily: 'RobotoSerif_400Regular',

    },
    slogan: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 10,
        fontFamily: 'RobotoSerif_100Thin',
        color: 'gray'


    }
});

export default connect(
    // Mappez l'état de Redux aux props du composant
    (state) => ({
        isLoggedIn: state.auth.isLoggedIn, // Supposant que "auth" est le nom de votre reducer d'authentification
        accessCode: state.auth.accessCode, // Supposant que "auth" est le nom de votre reducer d'authentification
        isCodeAcces: state.auth.isCodeAcces, // Supposant que "auth" est le nom de votre reducer d'authentification
    }),
    // Mappez les actions Redux aux props du composant
    (dispatch) => bindActionCreators({ login }, dispatch)
)(HomeScreen);

