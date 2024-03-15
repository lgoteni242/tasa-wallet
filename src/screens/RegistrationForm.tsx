import React, { useRef, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ToastAndroid, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import default_color from '../styles/color';
import CustomModalPicker from '../components/CustomModalPicker';
import axios from 'axios';
import Loader1 from '../components/Loader1';
import Modal from "react-native-modal";
import * as Clipboard from 'expo-clipboard';
import LottieView from 'lottie-react-native';


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

const genreListe = [{
    label: 'Masculin',
    value: 'masculin',
    // flag: 'cg'

},
{
    label: 'Feminin',
    value: 'feminin',
    // flag: 'cg'

}];

const RegistrationForm = ({ navigation }) => {
    const [step, setStep] = useState(1);

    // Variables d'état pour enregistrer les données
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [genre, setGenre] = useState('');
    const [pays, setPays] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionGenre, setSelectedOptionGenre] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [codePays, setCodePays] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [modalClock, setModalClock] = useState(false);
    const [erreur, setErreur] = useState('')
    const [key, setKey] = useState('')

    const animation = useRef(null);
    const animation2 = useRef(null);

    const playAnimation = () => {
        animation.current?.play();
    };



    const copyResetKeyToClipboard = () => {
        Clipboard.setString('resetKey');
        ToastAndroid.show('Clé de réinitialisation copiée dans le presse-papiers !', ToastAndroid.SHORT);
    };


    const iconeTaille = 20

    const handleNextStep1 = () => {
        // Vérifier si le numéro de téléphone ne contient que des chiffres
        const isPhoneNumberValid = /^\d+$/.test(telephone);

        if (step === 1 && nom && prenom) {
            if (!isPhoneNumberValid) {
                ToastAndroid.show('Le numéro de téléphone ne doit contenir que des chiffres', ToastAndroid.SHORT);
            } else {
                setStep(step + 1);
                // Durée de la vibration en millisecondes
                const DURATION = 100;
                // Déclenche la vibration
                Vibration.vibrate(DURATION);
            }
        } else {
            ToastAndroid.show('Veuillez remplir tous les champs avant de continuer', ToastAndroid.SHORT);
        }
    };

    const handleNextStep2 = () => {

        // Vérifier si l'e-mail est au format valide
        // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Vérifier si tous les champs sont remplis et si le numéro de téléphone et l'e-mail sont valides
        if (step === 2 && selectedOption && genre) {
            // if (!isEmailValid) {
            //     ToastAndroid.show('Veuillez saisir une adresse e-mail valide.', ToastAndroid.SHORT);
            // } else {
            setStep(step + 1);
            // Durée de la vibration en millisecondes
            const DURATION = 100;
            // Déclenche la vibration
            Vibration.vibrate(DURATION);
            // }
        } else {
            ToastAndroid.show('Veuillez remplir tous les champs avant de continuer', ToastAndroid.SHORT);
        }
    };

    const login = async () => {
        setIsLoading(true)
        try {
            // Make API call to authenticate user
            const response = await axios.post('https://walet.tasa.pro/api/create_user', {
                name: nom,
                prenom: prenom,
                email: email,
                genre: genre,
                code: codePays,
                phone: telephone,
                country: pays,
                pin: motDePasse,
                pin_confirmation: confirmationMotDePasse,
            });
            // Dispatch login success action with user data
            setIsLoading(false)
            setModalClock(true)
            console.warn(response)
            return response
        } catch (error) {
            setIsLoading(false)
            if (error.response && error.response.data && error.response.data.errors) {
                const errorDetails = error.response.data.errors;
                // Traiter les erreurs spécifiques
                if (errorDetails.email) {
                    console.error('Erreurs Email:', errorDetails.email);
                    // Afficher le message d'erreur d'email
                }
                if (errorDetails.phone) {
                    // console.error('Erreurs Phone:', errorDetails.phone);
                    setErreur(errorDetails.phone)
                    // Afficher le message d'erreur de téléphone
                }
                // Autres traitements d'erreur si nécessaire
            } else {
                console.error('Erreur inattendue:', error.message);
                // Gérer les erreurs inattendues
            }
        }
    };

    const handleLockModal = () => {
        setModalClock(false);
        setEmail('')
        setGenre('')
        setMotDePasse('')
        setNom('')
        setPays('')
        setPrenom('')
        setTelephone('')
        setConfirmationMotDePasse('')
        navigation.goBack()
    };


    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
        setPays(option)
        if (option == 'Republique du Congo') {
            setCodePays("CG")
        } else {
            setCodePays("SN")
        }

    };

    const handleSelectGenre = (option: React.SetStateAction<string>) => {
        setSelectedOptionGenre(option);
        setGenre(option)
    };

    const isPasswordMatch = motDePasse === confirmationMotDePasse;

    const handleTerminer = () => {
        if (!isPasswordMatch) {
            ToastAndroid.show('Les mots de ne correspondent pas', ToastAndroid.SHORT);
        } else {
            console.error(pays)
            login()
        }
    }

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="user" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Saisir votre nom"
                                keyboardType="default"
                                autoCapitalize="none"
                                value={nom}
                                onChangeText={setNom}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="user" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Saisir votre prénom"
                                keyboardType="default"
                                autoCapitalize="none"
                                value={prenom}
                                onChangeText={setPrenom}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="phone" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Numero de telephone"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={telephone}
                                onChangeText={setTelephone}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: 'gray', width: '20%', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, borderRadius: 100 }} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" size={15} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleNextStep1}  >
                                <Text style={styles.buttonText}>Continuer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="envelope" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Saisir votre adresse email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor='#7f7f7f'

                            />
                        </View>
                        <View style={styles.inputContainer2}>
                            <View style={styles.iconStyle2}>
                                <Icon name="globe" size={25} color="white" />
                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: "100%" }}>
                                {selectedOption == "" ? (<Text style={{ color: '#7f7f7f', marginLeft: 20, fontFamily: 'RobotoSerif_400Regular' }}>Pays de residence</Text>) : <Text style={{ color: 'black', marginLeft: 20, fontFamily: 'RobotoSerif_400Regular' }}>{selectedOption}</Text>}
                            </TouchableOpacity>
                            <CustomModalPicker
                                options={options}
                                onSelect={handleSelect}
                                visible={modalVisible}
                                onClose={() => setModalVisible(false)}
                                titre="Choisir le pays de residence"
                            />
                        </View>
                        <View style={styles.inputContainer2}>
                            <View style={styles.iconStyle2}>
                                <Icon name="venus-mars" size={25} color="white" />
                            </View>

                            <TouchableOpacity onPress={() => setModalVisible2(true)} style={{ width: "100%" }}>
                                {selectedOptionGenre == "" ? (<Text style={{ color: '#7f7f7f', marginLeft: 20, fontFamily: 'RobotoSerif_400Regular' }}>Choisir votre sexe</Text>) : <Text style={{ color: 'black', marginLeft: 20, fontFamily: 'RobotoSerif_400Regular' }}>{selectedOptionGenre}</Text>}
                            </TouchableOpacity>
                            <CustomModalPicker
                                options={genreListe}
                                onSelect={handleSelectGenre}
                                visible={modalVisible2}
                                onClose={() => setModalVisible2(false)}
                                titre="Choisir votre genre"
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: 'gray', width: '20%', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, borderRadius: 100 }} onPress={handlePreviousStep}>
                                <Icon name="arrow-left" size={15} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleNextStep2} >
                                <Text style={styles.buttonText}>Continuer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="lock" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Saisir le code pin"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={motDePasse}
                                onChangeText={setMotDePasse}
                                secureTextEntry={true}

                            />
                        </View>
                        <View style={[styles.inputContainer, !isPasswordMatch && confirmationMotDePasse !== '' && styles.inputError]}>
                            <View style={[styles.iconStyle, !isPasswordMatch && confirmationMotDePasse !== '' && styles.inputErrorB]}>
                                <Icon name="lock" size={iconeTaille} color="white" />
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
                        <Text style={{ color: default_color.orange, fontSize: 10, marginBottom: 10, textAlign: 'center', fontFamily: 'RobotoSerif_400Regular', textTransform: 'capitalize' }}>
                            {erreur}
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: 'gray', width: '20%', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, borderRadius: 100 }} onPress={handlePreviousStep}>
                                <Icon name="arrow-left" size={15} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleTerminer()}  >
                                <Text style={styles.buttonText}>Terminer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container1}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="dark-content" />
            <View style={styles.containerInput}>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: "40%" }}>
                    {/* <Image source={require('../../assets/images/register.png')} style={styles.image} resizeMode="cover" /> */}
                    <TouchableOpacity onPress={playAnimation} activeOpacity={1}>
                        <LottieView
                            ref={animation}
                            loop={false}
                            style={{
                                width: 300,
                                // height: 350,
                                // backgroundColor: '#eee',

                            }}

                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../animations/lotties/hello.json')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 40 }}>
                    <View style={styles.buttons}>
                        <View style={{ position: "absolute", height: 5, width: '38%', backgroundColor: '#e1e1e1', left: 30, top: '40%' }}></View>
                        <View style={{ position: "absolute", height: 5, width: '38%', backgroundColor: '#e1e1e1', right: 30, top: '40%' }}></View>
                        <View style={styles.stepCircle}>
                            <Text style={[styles.number, step == 1 ? styles.numberFocus : null]}>1</Text>
                        </View>
                        <View style={styles.stepCircle}>
                            <Text style={[styles.number, step == 2 ? styles.numberFocus : null]}>2</Text>
                        </View>
                        <View style={styles.stepCircle}>
                            <Text style={[styles.number, step == 3 ? styles.numberFocus : null]}>3</Text>
                        </View>
                    </View>
                </View>
                {renderStepContent()}
                <View>
                    <Text style={styles.slogan}>Tasa, the power of your money is in your hands</Text>
                </View>
            </View>
            <Modal
                // coverScreen={fontsLoaded}
                backdropOpacity={0.1}
                isVisible={isLoading}
                animationIn="fadeIn"
                animationOut="fadeOut"
            >
                <View style={styles.modalContainerChargement}>
                    <View style={styles.modalContentChargement}>
                        {/* <Loader1 /> */}
                        <LottieView
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
                        />
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
                            Votre compte a été créé avec succès. Vous pouvez vous connecter en utilisant votre numéro de téléphone et votre code d'accès.
                        </Text>
                        <Text style={{ fontFamily: "RobotoSerif_400Regular", fontSize: 13 }}>Clef de reinitialisation du code pin</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: default_color.black, padding: 10, marginTop: 10, borderRadius: 10, alignItems: 'center', }}>
                            <Text style={{ fontFamily: "RobotoSerif_400Regular", fontSize: 13, color: 'white' }}>
                                lsdkslkdskssxcxxcxccxx
                            </Text>
                            <TouchableOpacity style={{ backgroundColor: 'gray', padding: 5, borderRadius: 10 }} onPress={copyResetKeyToClipboard}>
                                <Text style={{ color: 'white' }}>Copier</Text>
                            </TouchableOpacity>
                        </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    containerInput: {
        flex: 1,
        // alignItems: 'center',
        padding: 12,
        justifyContent: 'flex-end'
    },
    container1: {
        flex: 1,
        // padding: 15,
        paddingHorizontal: 5,
        width: '100%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    stepCircle: {
        backgroundColor: '#e1e1e1',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 100,
    },
    number: {
        fontSize: 11,
        color: 'white',
        fontFamily: 'RobotoSerif_400Regular',
        // backgroundColor: 'white',
        paddingHorizontal: 8.23,
        paddingVertical: 3,
        borderRadius: 50
    },
    numberFocus: {
        fontSize: 11,
        color: '#e1e1e1',
        backgroundColor: 'white',
    },
    logo: {
        fontFamily: 'RobotoSerif_400Regular',
        fontSize: 15,
        marginBottom: 15,
        color: 'gray',
        textTransform: 'uppercase'
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
        backgroundColor: 'gray',
        height: '103%',
        justifyContent: 'center',
        width: '15%',
        alignItems: 'center',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
    },
    input: {
        // flex: 1,
        height: 50,
        paddingHorizontal: 20,
        fontFamily: 'RobotoSerif_400Regular',
        width: '100%'

    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        paddingVertical: 4,
        fontFamily: 'RobotoSerif_400Regular',
    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 50,
        fontFamily: 'RobotoSerif_400Regular',
        width: '78%',
        borderColor: 'gray',
        borderWidth: 0.6,
    },
    slogan: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 10,
        fontFamily: 'RobotoSerif_100Thin',
        color: default_color.orange
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        marginBottom: 30
    },
    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 20,
        paddingVertical: 15,
        borderRadius: 100,
        height: 55,
        width: '100%',

    },
    iconStyle2: {
        backgroundColor: 'gray',
        height: '230%',
        justifyContent: 'center',
        width: '15%',
        alignItems: 'center',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
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
    inputError: {
        borderColor: default_color.orange,
    },
    inputErrorB: {
        backgroundColor: default_color.orange,
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
    modalContainerSend: {
        backgroundColor: "white.orange",
        borderRadius: 10,
        // padding: 20,
    },
    buttonRetour: {
        backgroundColor: "white",
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 100,
        width: "40%",
        fontFamily: "RobotoSerif_400Regular",
    },
    buttonTextAnnul: {
        color: "black",
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: "center",
        fontFamily: "RobotoSerif_400Regular",
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
    buttonText2: {
        color: "black",
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: "center",
        fontFamily: "RobotoSerif_400Regular",
    },
});

export default RegistrationForm;