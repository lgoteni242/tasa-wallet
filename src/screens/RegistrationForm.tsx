import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import default_color from '../styles/color';


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


    const iconeTaille = 25

    const handleNextStep = () => {
        if (step === 1 && nom && prenom && telephone) {
            setStep(step + 1);
        } else if (step === 2 && email && genre && pays) {
            setStep(step + 1);
        }
    };


    const handlePreviousStep = () => {
        setStep(step - 1);
    };


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
                                keyboardType="phone-pad"
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
                                keyboardType="phone-pad"
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
                            <TouchableOpacity style={{ backgroundColor: default_color.orange, width: '17%', justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }} onPress={() => navigation.goBack()}>
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
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="venus-mars" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Choisir votre genre"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={genre}
                                onChangeText={setGenre}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="globe" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Choisir votre pays"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={pays}
                                onChangeText={setPays}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: default_color.orange, width: '17%', justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }} onPress={handlePreviousStep}>
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
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconStyle}>
                                <Icon name="lock" size={iconeTaille} color="white" />
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmer votre mot de passe"
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                value={confirmationMotDePasse}
                                onChangeText={setConfirmationMotDePasse}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: default_color.orange, width: '17%', justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }} onPress={handlePreviousStep}>
                                <Icon name="arrow-left" size={15} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}  >
                                <Text style={styles.buttonText}>S'inscrire</Text>
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
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "35%" }}>
                <Image source={require('../../assets/images/register.png')} style={styles.image} resizeMode="cover" />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <View style={styles.buttons}>
                    <View style={{ position: "absolute", height: 5, width: '38%', backgroundColor: 'gray', left: 30, top: '40%' }}></View>
                    <View style={{ position: "absolute", height: 5, width: '38%', backgroundColor: 'gray', right: 30, top: '40%' }}></View>
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
            <View style={styles.containerInput}>
                {renderStepContent()}
            </View>
            <View>
                <Text style={styles.slogan}>Tasa, the power of your money is in your hands</Text>
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
        alignItems: 'center',
        padding: 12,
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
        backgroundColor: 'gray',
        paddingHorizontal: 5,
        paddingVertical: 5,
        // borderRadius: 100,
    },
    number: {
        fontSize: 11,
        color: 'white',
        fontFamily: 'RobotoSerif_400Regular',
        // backgroundColor: 'white',
        paddingHorizontal: 8.23,
        paddingVertical: 3,
        // borderRadius: 50
    },
    numberFocus: {
        fontSize: 11,
        color: 'gray',
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
        width: '90%',
        // borderRadius: 100,
    },
    iconStyle: {
        backgroundColor: 'gray',
        height: '100%',
        justifyContent: 'center',
        width: '20%',
        alignItems: 'center',
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
        backgroundColor: '#7f7f7f',
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 2,
        fontFamily: 'RobotoSerif_400Regular',
        width: '80%',
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
});

export default RegistrationForm;