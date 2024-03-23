import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, Image, ToastAndroid } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import default_color from '../styles/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomModalPicker from '../components/CustomModalPicker';
import { connect, useSelector } from 'react-redux';
import { login } from '../store/actions/authActions';
import { bindActionCreators } from 'redux';
import NetInfo from '@react-native-community/netinfo';
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import Loader1 from '../components/Loader1';
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_300Light,
    RobotoSerif_100Thin,
    useFonts,
} from "@expo-google-fonts/roboto-serif";
import * as NavigationBar from 'expo-navigation-bar';




const HomeScreen = ({ navigation, login }: { navigation: any, login: any }) => {

    NavigationBar.setBackgroundColorAsync('white');

    // const flag = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));
    // const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));
    const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt(0)));


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [codePays, setCodePays] = useState('');
    const [isConnected, setIsConnected] = useState<any | null>(false);
    const [isLoading, setIsLoading] = useState(false)
    const animation = useRef(null);


    const loginError = useSelector((state: any) => state.auth.error);
    const isLogged = useSelector((state: any) => state.auth.isLoggedIn);

    // const [options, setOptions] = useState([])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogin = async () => {

        if (username && password && codePays) {
            // Vérifier la connectivité internet
            if (isConnected) {
                try {
                    // Dispatch login action
                    setIsLoading(true)
                    await login(username, password, codePays).then((result: any) => {
                        if (result) {
                            // if (isLogged) {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'Menu' }],
                                })
                            );
                            // }
                        }
                    });
                    // dispa
                    setIsLoading(false)
                    // Si la connexion réussit, naviguez vers l'écran de tableau de bord
                    if (!isLogged) {
                        // Gestion erreur
                    }
                } catch (error: any) {
                    setIsLoading(false)
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

    let [fontsLoaded] = useFonts({
        RobotoSerif_400Regular,
        RobotoSerif_300Light,
        RobotoSerif_100Thin,
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const options = [{
        label: 'Congo',
        value: 242,
        flag: 'cg'
    },
    {
        label: 'Senegal',
        value: 221,
        flag: 'sn'
    }];


    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
        if (option == 'Congo') {
            setCodePays("CG")

        } else {
            setCodePays("SN")
        }
    };


    const playAnimation = () => {
        animation.current?.play();
    };


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="dark-content" />
            <View style={styles.container_form}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "50%" }}>
                    {/* <Image source={require('../../assets/images/login.png')} style={styles.image} /> */}
                    <TouchableOpacity onPress={playAnimation} activeOpacity={1}>
                        <LottieView
                            ref={animation}
                            loop={false}
                            style={{
                                width: 300,

                            }}

                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../animations/lotties/hello.json')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', fontFamily: 'RobotoSerif_400Regular', marginBottom: 15, color: '#7f7f7f', fontSize: 12 }}>CONNEXION AU COMPTE TASA WALLET</Text>
                {/* </View> */}
                <View style={{ paddingHorizontal: 20 }}>
                    {loginError && <Text style={{ color: 'red', fontSize: 7.5, fontFamily: 'RobotoSerif_400Regular', textAlign: 'center', marginBottom: 10 }}>Les donnees d'authentification sont invalides, veillez recommencer</Text>}
                    <View style={styles.inputContainer2}>
                        {selectedOption == "" ?
                            <View style={styles.iconStyle2}>
                                <Icon name="globe" size={25} color="white" />
                            </View>
                            :
                            selectedOption == "Congo" ?
                                <View style={styles.iconStyle3}>
                                    <Text >{flag('cg')}</Text>
                                </View>
                                :
                                <View style={styles.iconStyle3}>
                                    <Text>{flag('sn')}</Text>
                                </View>

                        }
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: "100%" }}>
                            {selectedOption == "" ? (<Text style={{ color: '#7f7f7f', marginLeft: 10, fontFamily: 'RobotoSerif_400Regular' }}>Pays de residence</Text>) : <Text style={{ color: 'black', marginLeft: 10, fontFamily: 'RobotoSerif_400Regular' }}>{selectedOption}</Text>}
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
                        <View style={styles.iconStyle}>
                            <Icon name="phone" size={25} color="white" />
                        </View>
                        {/* <Icon name="phone" size={15} color="grey" style={styles.iconStyle} /> */}
                        <TextInput
                            style={styles.input}
                            placeholder="Numero de telephone"
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            placeholderTextColor='#7f7f7f'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        {/* <Icon name="lock" size={20} color="grey" style={styles.iconStyle} /> */}
                        <View style={styles.iconStyle}>
                            <Icon name="lock" size={25} color="white" />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            keyboardType="phone-pad"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor='#7f7f7f'

                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.mdp} onPress={() => navigation.navigate('MotPasseOublier')}>
                            Mot de passe oublier
                        </Text>
                        <Text style={[styles.mdp]} onPress={() => navigation.navigate('register')}>
                            Creer un compte Tasa Wallet
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.slogan}>Tasa, the power of your money is in your hands</Text>
                    </View>
                    <Modal
                        // coverScreen={fontsLoaded}
                        backdropOpacity={0.2}
                        isVisible={isLoading}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                    >
                        <View style={styles.modalContainerChargement}>
                            <View style={styles.modalContentChargement}>
                                <Loader1 />
                                {/* <LottieView
                                    autoPlay
                                    ref={animation}
                                    loop={false}
                                    style={{
                                        width: 300,
                                        height: 350,
                                        // backgroundColor: '#eee',

                                    }}
                                    // Find more Lottie files at https://lottiefiles.com/featured
                                    source={require('../animations/lotties/chargement3.json')}
                                /> */}
                            </View>
                        </View>
                    </Modal>
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
        // marginBottom: 30
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
        height: 55,
        width: '100%',
        borderRadius: 100,
    },
    iconStyle: {
        backgroundColor: '#7f7f7f',
        height: '105%',
        justifyContent: 'center',
        width: '15%',
        alignItems: 'center',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        borderRadius: 100,

    },
    iconStyle2: {
        backgroundColor: 'gray',
        height: '230%',
        justifyContent: 'center',
        width: '15%',
        alignItems: 'center',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        borderRadius: 100,

    },
    iconStyle3: {
        // backgroundColor: 'white',
        height: '230%',
        justifyContent: 'center',
        width: '15%',
        alignItems: 'center',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        // borderRightWidth: 0.5
    },

    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 20,
        paddingVertical: 15,
        borderRadius: 100,
        // borderRadius: 2,
        height: 55,

    },
    inputContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 5,
        borderRadius: 100,
    },
    // iconStyle: {
    //     paddingHorizontal: 10,
    //     color: 'grey'
    // },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: 'RobotoSerif_400Regular',
        // color: '#7f7f7f'

    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 100,
        // borderRadius: 2,
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
        color: default_color.orange
    },

    modalContainerChargement: {
        // position: 'absolute',
        backgroundColor: "transparent",
        // borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContentChargement: {
        backgroundColor: "transparent",
        // padding: 23,
        // borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default connect(
    // Mappez l'état de Redux aux props du composant
    (state: any) => ({
        isLoggedIn: state.auth.isLoggedIn, // Supposant que "auth" est le nom de votre reducer d'authentification
        accessCode: state.auth.accessCode, // Supposant que "auth" est le nom de votre reducer d'authentification
        isCodeAcces: state.auth.isCodeAcces, // Supposant que "auth" est le nom de votre reducer d'authentification
    }),
    // Mappez les actions Redux aux props du composant
    (dispatch) => bindActionCreators({ login }, dispatch)
)(HomeScreen);

