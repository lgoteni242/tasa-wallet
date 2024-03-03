import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import default_color from '../styles/color';
import CustomModalPicker from '../components/CustomModalPicker';

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



    const iconeTaille = 20


    const handleNextStep = () => {
        // Vérifier si le numéro de téléphone ne contient que des chiffres
        const isPhoneNumberValid = /^\d+$/.test(telephone);

        // Vérifier si l'e-mail est au format valide
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Vérifier si tous les champs sont remplis et si le numéro de téléphone et l'e-mail sont valides
        if (step === 1 && nom && prenom && telephone && isPhoneNumberValid) {
            setStep(step + 1);
        } else if (step === 2 && email && selectedOption && genre && isEmailValid) {
            setStep(step + 1);
        } else {
            // Afficher le toast en fonction des champs manquants ou des données invalides
            if (!isPhoneNumberValid) {
                ToastAndroid.show('Le numéro de téléphone ne doit contenir que des chiffres', ToastAndroid.SHORT);
            } else if (!isEmailValid) {
                ToastAndroid.show('Veuillez saisir une adresse e-mail valide.', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Veuillez remplir tous les champs avant de continuer', ToastAndroid.SHORT);
            }
        }
    };


    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
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
                            <TouchableOpacity style={styles.button} onPress={handleNextStep}  >
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
                            <TouchableOpacity style={styles.button} onPress={handleNextStep} >
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
                                placeholder="Saisir votre mot de passe"
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
                                placeholder="Confirmer le mot de passe"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={confirmationMotDePasse}
                                onChangeText={setConfirmationMotDePasse}
                                secureTextEntry={true}
                            />

                        </View>
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
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: "50%" }}>
                    <Image source={require('../../assets/images/register.png')} style={styles.image} resizeMode="cover" />
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
        padding: 15,
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
});

export default RegistrationForm;