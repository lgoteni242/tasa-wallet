import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomModalPicker from '../components/CustomModalPicker';




const HomeScreen = ({ navigation }) => {

    // let [fontsLoaded] = useFonts({
    //     Pacifico_400Regular
    // });

    const flag = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [verifInscription, setVerifInscription] = useState(true);

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

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
    };

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

                        <View style={styles.inputContainer3}>
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
                        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                            <Text style={styles.buttonText}>S'inscrire</Text>
                        </TouchableOpacity>
                        <Text style={styles.signupText} onPress={() => setVerifInscription(true)}>
                            Avez-vous deja un compte ? Si oui, veillez-vous connecter.
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
        // fontFamily: 'Pacifico_400Regular',
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
        borderRadius: 3,
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
        borderRadius: 3,
    },
    inputContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 5,
        borderRadius: 3,
    },
    iconStyle: {
        paddingHorizontal: 10,
        color: 'grey'
    },
    input: {
        flex: 1,
        height: 55,
        paddingHorizontal: 10,
        // fontFamily: 'Pacifico_400Regular',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 7,
        // fontFamily: 'Pacifico_400Regular',
    },
    passwordInput: {
        flex: 1,
        height: 55,
        paddingHorizontal: 10,
        // fontFamily: 'Pacifico_400Regular',
    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 3,
    },
    buttonText: {
        color: default_color.white,
        fontSize: 15,
        paddingVertical: 4
        // fontFamily: 'Pacifico_400Regular',
    },
    mdp: {
        color: 'gray',
        fontSize: 10,
        // fontStyle:'italic',
        marginVertical: 10,
        textAlign: 'right',
        // fontFamily: 'Pacifico_400Regular',
    },
    signupText: {
        marginTop: 20,
        textAlign: 'center',
        color: default_color.orange,
        fontSize: 12,
        // fontFamily: 'Pacifico_400Regular',
    },
    slogan: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 13,
        // fontFamily: 'Pacifico_400Regular',

    }
});

export default HomeScreen;
