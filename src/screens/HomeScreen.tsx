import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
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


    const loginError = useSelector(state => state.auth.error);
    const isLogged = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLogged) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Menu' }],
            });
        } else {
            navigation.navigate('Home');
        }
    }, [isLogged]);


    const handleLogin = async () => {
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
    };


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

    // const checkLogin = async () => {
    //     try {
    //         const response = await axios.post('https://walet.tasa.pro/api/auth', {
    //             country_code: codePays,
    //             phone: username,
    //             pin: password
    //         });
    //         const data = response.data;
    //         console.error(data)
    //         navigation.navigate('Menu');
    //         // authStore.login();

    //     } catch (error) {
    //         console.error("Cela marche de chez o")
    //         // console.warn(error); 
    //         throw error;
    //     }
    // }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <Text style={styles.icon}>Tasa wallet</Text>

                    {verifInscription ?
                        <Text style={styles.connexion}>Connexion au compte tasa wallet</Text> :

                        <Text style={styles.connexion}>Creation d'un compte tasa walet</Text>
                    }
                </View>
            </View>
            {
                verifInscription ?
                    <ScrollView style={styles.container_form}>
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
                        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                            <Text style={styles.buttonText}>Se connecter</Text>
                        </TouchableOpacity> */}

                        <Text style={styles.signupText} onPress={() => setVerifInscription(false)}>
                            Vous n'avez pas de compte ? Inscrivez-vous
                        </Text>
                        <View>
                            <Text style={styles.slogan}>Tasa, the power of your money is in your hands</Text>
                        </View>
                    </ScrollView>
                    :
                    <ScrollView style={styles.container_form}>
                        <View style={styles.inputContainer}>
                            <Icon name="user" size={15} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nom(s)"
                                keyboardType="default"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="user" size={15} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Prenom(s)"
                                keyboardType="default"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="mars" size={15} color="grey" style={styles.iconStyle} />
                            <TextInput
                                style={styles.input}
                                placeholder="Sexe"
                                keyboardType="default"
                                autoCapitalize="none"
                            />
                        </View>
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
                            {selectedOption == "Republique du Congo" ?
                                <Text style={styles.iconStyle}>+242 |</Text>
                                :
                                selectedOption == "Senegal" ?
                                    <Text style={styles.iconStyle}>+221 |</Text> :
                                    <Icon name="phone" size={15} color="grey" style={styles.iconStyle} />


                            }
                            <TextInput
                                style={styles.input}
                                placeholder="Telephone"
                                keyboardType="phone-pad"
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
                                secureTextEntry={!passwordVisible2}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setPasswordVisible2(!passwordVisible2)}
                            >
                                <Icon name={passwordVisible2 ? 'eye' : 'eye-slash'} size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>S'inscrire</Text>
                        </TouchableOpacity>
                        <Text style={styles.signupText} onPress={() => setVerifInscription(true)}>
                            Avez-vous deja un compte ? Si oui, veillez-vous connecter.
                        </Text>
                        <View>
                            <Text style={styles.slogan}>Tasa, the power of your money is in your hands</Text>
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
        borderBottomLeftRadius: 70,
    },
    container_image: {
        // flex: "",
        height: "20%",
        justifyContent: 'flex-start',
        backgroundColor: default_color.orange,
        borderBottomLeftRadius: 70,
        // marginBottom:70

    },
    connexion: {
        textAlign: 'center',
        marginVertical: 0,
        fontSize: 12,
        fontFamily: 'RobotoSerif_400Regular',
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
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 100,
    },
    inputContainer5: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        borderColor: 'gray',

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 3,
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 7,
        fontFamily: 'RobotoSerif_400Regular',

    },
    passwordInput: {
        flex: 1,
        height: 55,
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
    }),
    // Mappez les actions Redux aux props du composant
    (dispatch) => bindActionCreators({ login }, dispatch)
)(HomeScreen);

