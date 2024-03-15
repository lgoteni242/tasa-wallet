import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_100Thin,
    useFonts
} from "@expo-google-fonts/roboto-serif";
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';






const CodeDeblockAppScreen = ({ navigation }) => {

    const accessCode = useSelector(state => state.auth.accessCode);

    const [inputText, setInputText] = useState('');
    const [hidenText, setHidenText] = useState('')
    const [nombreDeCaracteres, setNombreDeCaracteres] = useState(0);
    const elementRef2 = useRef(null);

    const handleButtonClick = (value: string) => {
        if (nombreDeCaracteres < 3) {
            setInputText(inputText + value);
            setNombreDeCaracteres(inputText.length);
        }
    }

    const handlePress2 = () => {
        if (elementRef2.current) {
            elementRef2.current.shake(1000);
        }
    };

    const onButtonPress = () => {
        // Durée de la vibration en millisecondes
        const DURATION = 300;
        // Déclenche la vibration
        Vibration.vibrate(DURATION);

    };

    useEffect(() => {
        if (nombreDeCaracteres == 3) {
            if (inputText == accessCode) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Menu' }],
                    })
                );
                setInputText('')
            } else {
                setInputText('')
                setNombreDeCaracteres(0)
                handlePress2()
                onButtonPress()
                setHidenText("Le code d'acces ne correspond pas, veuillez ressayer")
                setTimeout(() => {
                    setHidenText('');
                }, 1500);
            }
        }
    }, [nombreDeCaracteres])

    const handleClear = () => {
        setInputText('');
    };


    const handleBackspace = () => {
        setInputText(inputText.slice(0, -1));
    };

    return (
        <View style={styles.section70}>
            <StatusBar barStyle="dark-content" />
            <StatusBar translucent backgroundColor="transparent" />

            <View style={styles.container3}>
                <View style={{ position: 'absolute', top: 5 }}>
                    <Icon name="lock" size={50} color="gray" />
                </View>
                <View style={styles.container3}>
                    <Animatable.View ref={elementRef2}>
                        <Text style={{ color: 'black', marginBottom: 10, fontSize: 12 }}>Entrez votre code d'accès tasa wallet</Text>
                    </Animatable.View>
                    <Text style={{ color: 'gray', textAlign: 'center', fontSize: 10 }}>Réinitialisez votre application en cas d'oubli de mot de passe.</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={inputText}
                            placeholderTextColor="#333"
                            style={styles.input}
                            editable={false}
                            textAlign='center'
                            maxLength={4}
                            secureTextEntry={true}
                        />
                    </View>
                    <Text style={{ color: 'red', fontSize: 8 }}>{hidenText}</Text>
                </View>
                <View style={styles.container2}>
                    {[[1, 2, 3], [4, 5, 6], [7, 8, 9], ['c', '0', 'x']].map((row, rowIndex) => (
                        <View style={styles.row} key={rowIndex} >
                            {row.map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    style={styles.button}
                                    onPress={() => {
                                        if (num === 'c') {
                                            handleClear();
                                        } else if (num === 'x') {
                                            handleBackspace();
                                        } else {
                                            handleButtonClick(num.toString())
                                        }
                                    }}
                                >
                                    <Text style={styles.buttonText}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    section70: {
        flex: 1,
        backgroundColor: "white",
        padding: 30,
        resizeMode: 'cover', // Ajuste la taille de l'image pour couvrir tout l'écran
        justifyContent: 'center'
    },
    input: {
        width: 280,
        fontSize: 35,
        color: 'gray',
        fontWeight: 'bold',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        // fontFamily: 'RobotoSerif_400Regular'


    },
    buttonContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        margin: 1,
        alignItems: 'center',
    },
    button: {
        margin: 2,
    },
    buttonText: {
        fontSize: 25,
        // borderWidth: 0.5,
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 40,
        color: 'gray',
        borderColor: 'white',
        backgroundColor: '#ecece9b0',
        // fontFamily: 'RobotoSerif_400Regular'


    },
    container3: {
        marginTop: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        // marginBottom: 50
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 90
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textInputContainer: {
        marginBottom: 2,
    },
    roundedTextInput: {
        width: 40, // Ajustez la largeur selon votre besoin
        height: 40, // Ajustez la hauteur selon votre besoin
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center',
        fontSize: 20,
    },

});

export default CodeDeblockAppScreen;