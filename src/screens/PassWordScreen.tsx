import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, ToastAndroid } from 'react-native';
import default_color from '../styles/color';
// import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Modal from "react-native-modal";
import Loader1 from '../components/Loader1';


const PassWordScreen = ({ navigation }) => {

    const [code, setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1);
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [erreur, setErreur] = useState('')
    const [modalClock, setModalClock] = useState(false);


    const iconeTaille = 20


    // let [fontsLoaded] = useFonts({
    //     Pacifico_400Regular
    // });

    // if (!fontsLoaded) {
    //     return <ActivityIndicator size="large" />;
    // }

    const handleSendCode = () => {
        if (code.length < 14) {
            ToastAndroid.show('La clé de reinitialisation doit contenir 14 caracteres', ToastAndroid.SHORT);
        } else {
            checkData()
        }
    };

    const checkData = async () => {
        (async () => {
            setIsLoading(true)
            console.error(code)
            try {
                const response = await axios.get("https://walet.tasa.pro/api/securevalidate", {
                    params: {
                        secure_code: code // Ajoutez vos paramètres de requête ici
                    }
                });
                setIsLoading(false);
                setStep(step + 1);
                // console.error(response)
            } catch (error) {
                setIsLoading(false);
                // console.log("levi goteni verification", error.response.message);
            }
        })();
    };
    const isPasswordMatch = motDePasse === confirmationMotDePasse;


    const handleTerminer = () => {
        if (!isPasswordMatch) {
            ToastAndroid.show('Les mots de ne correspondent pas', ToastAndroid.SHORT);
        } else {
            (async () => {
                setIsLoading(true)
                console.log(code, motDePasse, confirmationMotDePasse)
                try {
                    const response = await axios.post("https://walet.tasa.pro/api/reset_pin", {
                        secure_code: code, // Ajoutez vos paramètres de requête ici
                        pin: motDePasse,
                        pin_confirmation: confirmationMotDePasse
                    });
                    setIsLoading(false);
                    setModalClock(true)
                    // console.error(response)
                } catch (error) {
                    setIsLoading(false);
                    // console.log("levi goteni verification", error);
                }
            })();
        }
    }

    const handleLockModal = () => {
        setModalClock(false);
        setMotDePasse('')
        setConfirmationMotDePasse('')
        setCode('')
        navigation.goBack()
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.container_form}>
                        <View style={styles.inputContainer}>

                            {/* <Icon name="key" size={25} color="grey" style={styles.iconStyle} /> */}
                            <View style={styles.iconStyle2}>
                                <Icon name="key" size={25} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Saisir votre clé de reinitialisation"
                                keyboardType="default"
                                autoCapitalize="none"
                                value={code}
                                onChangeText={(text) => setCode(text)}
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                            <Text style={styles.buttonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.container_form}>
                        <Text style={{ textAlign: 'center', marginBottom: 20, fontFamily: 'RobotoSerif_400Regular', color: 'gray' }}>Saisir un nouveau mot code pin</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="lock" size={iconeTaille} color="gray" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Saisir un nouveau code pin"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={motDePasse}
                                onChangeText={setMotDePasse}
                                secureTextEntry={true}

                            />
                        </View>
                        <View style={[styles.inputContainer, !isPasswordMatch && confirmationMotDePasse !== '' && styles.inputError]}>
                            <View style={[styles.iconStyle, !isPasswordMatch && confirmationMotDePasse !== '' && styles.inputErrorB]}>
                                <Icon name="lock" size={iconeTaille} color="gray" />
                            </View>
                            <TextInput
                                style={[styles.input]}
                                placeholder="Confirmer le code pin"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={confirmationMotDePasse}
                                onChangeText={setConfirmationMotDePasse}
                                secureTextEntry={true}
                            />
                        </View>
                        <Text style={{ color: default_color.orange, fontSize: 10, textAlign: 'center', fontFamily: 'RobotoSerif_400Regular', textTransform: 'capitalize' }}>
                            {erreur}
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleTerminer()} >
                            <Text style={styles.buttonText}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="light-content" />

            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.iconStyleRetour}
                    >
                        <Icon name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                    {/* <Text style={styles.icon}>T'wallet</Text> */}
                    <Text style={styles.connexion}>Code pin oublier</Text>
                </View>
            </View>

            {renderStepContent()}



            <Modal
                // coverScreen={fontsLoaded}
                backdropOpacity={0.3}
                isVisible={isLoading}
                animationIn="fadeIn"
                animationOut="fadeOut"
            >
                <View style={styles.modalContainerChargement}>
                    <View style={styles.modalContentChargement}>
                        <Loader1 />
                    </View>
                </View>
            </Modal>

            <Modal
                coverScreen={true}
                backdropOpacity={0.3}
                isVisible={modalClock}
                // isVisible={true}
                animationIn="fadeIn" // Animation d'entrée du haut
                animationOut="fadeOut"
            >
                <View style={styles.modalContainerSend}>
                    <View style={styles.modalContentSend2}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: "rgba(16,17,17,0.84)",
                                fontFamily: "RobotoSerif_400Regular",
                                textAlign: 'justify'
                            }}
                        >
                            Votre code pin a été initialiser avec succès. Vous pouvez vous connecter en utilisant votre nouveau code pin
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                borderTopColor: "gray",
                                marginTop: 5,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.buttonEnvoie}
                                onPress={() => handleLockModal()}
                                disabled={isLoading}
                            >
                                <Text style={styles.buttonText2}>Connexion</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
        height: "20%",
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
        borderWidth: 0.6,
        marginBottom: 20,
        height: 55,
        width: '100%',
        borderRadius: 100,
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
        height: 50,
        paddingHorizontal: 10,
        fontFamily: 'RobotoSerif_400Regular',
        fontSize: 12,


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
        fontFamily: 'RobotoSerif_400Regular',

    },
    slogan: {
        textAlign: 'center',
        marginTop: 13,
        fontSize: 10,
        fontFamily: 'RobotoSerif_400Regular',


    },
    connexion: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 17,
        fontFamily: 'RobotoSerif_400Regular',

        color: 'white'
    },
    modalContainerChargement: {
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
    inputError: {
        borderColor: default_color.orange,
    },
    inputErrorB: {
        backgroundColor: default_color.orange,
    },
    buttonText2: {
        color: "black",
        fontSize: 12,
        paddingVertical: 4,
        width: "100%",
        textAlign: "center",
        fontFamily: "RobotoSerif_400Regular",
    },
    modalContainerSend: {
        backgroundColor: "white.orange",
        borderRadius: 10,
        // padding: 20,
    },
    modalContentSend2: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonEnvoie: {
        // backgroundColor: default_color.orange,
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 100,
        width: "40%",
    },
    iconStyle2: {
        backgroundColor: '#7f7f7f',
        height: '105%',
        justifyContent: 'center',
        width: '15%',
        alignItems: 'center',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        borderRadius: 100,

    },
});

export default PassWordScreen;
