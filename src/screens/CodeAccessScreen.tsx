import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, Vibration, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorDefault from '../styles/color';
// import * as NavigationBar from 'expo-navigation-bar';
// import { useAuth } from '../../AuthContext';
import * as Animatable from 'react-native-animatable';
import * as SecureStore from 'expo-secure-store';
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_100Thin,
    useFonts
} from "@expo-google-fonts/roboto-serif";


const CodeAccesScreen = ({ navigation }) => {


    const [inputText, setInputText] = useState('');
    const [inputText2, setInputText2] = useState('');
    const [nombreDeCaracteres, setNombreDeCaracteres] = useState(0);
    const [hidenText, setHidenText] = useState('')
    const [isVisible, setIsVisible] = useState(true);
    const elementRef = useRef(null);
    const elementRef2 = useRef(null);
    // const { setLock } = useAuth();


    let [fontsLoaded] = useFonts({
        RobotoSerif_400Regular,
        RobotoSerif_100Thin,
        RobotoSerif_700Bold,
    });
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }
    const handleButtonClick = (value: string) => {
        if (isVisible) {
            if (nombreDeCaracteres < 3) {
                setInputText(inputText + value);
                setNombreDeCaracteres(inputText.length);
                // Vibration.vibrate(100);
            }
        } else {
            if (inputText2.length <= 3) {
                // Vibration.vibrate(100);
                setInputText2(inputText2 + value);
            }
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

    if (inputText2.length == 4) {
        if (inputText != inputText2) {
            setInputText2('');
            setNombreDeCaracteres(0)
            handlePress2()
            onButtonPress()
            setHidenText("Les codes d'acces ne correspondent pas, veuillez ressayer")
            setTimeout(() => {
                setHidenText('');
            }, 1500);
        } else {
            (async () => {
                // await SecureStore.setItemAsync('codeAcces', inputText);
                // await SecureStore.setItemAsync('codeAccesVerif', 'true');
                // setLock(true)
            })();
        }
    }
    const handlePress = () => {
        if (elementRef.current) {
            elementRef.current.fadeOut(100).then(endState => setIsVisible(false));
        }
    };
    if (nombreDeCaracteres == 3) {
        handlePress()
    }

    const handleClear = () => {
        if (isVisible) {
            setInputText('');
            setNombreDeCaracteres(0)
        } else {
            setInputText2('');
        }
    };

    const handleBackspace = () => {
        if (isVisible) {
            setInputText(inputText.slice(0, -1));
            setNombreDeCaracteres(nombreDeCaracteres - 1)
        } else {
            setInputText2(inputText.slice(0, -1));
        }
    };

    return (
        <View style={styles.section70}>
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 30 }}>
                <Icon name="arrow-left" size={10} color="gray" style={{ fontSize: 20, position: 'absolute', left: -10, top: 25 }} />
            </TouchableOpacity>
            <View style={styles.container3}>
                <View style={{ position: 'absolute', top: 5 }}>
                    <Icon name="key" size={50} color="gray" />

                </View>
                {isVisible && (
                    <Animatable.View ref={elementRef} style={styles.container3}>
                        <Text style={{ color: 'black', marginBottom: 10, fontFamily: 'RobotoSerif_700Bold' }}>Créer un code d'accès</Text>
                        <Text style={{ color: 'gray', textAlign: 'center', fontFamily: 'RobotoSerif_400Regular', fontSize: 10 }}>Veuillez entrer 4 chiffres que vous utiliserez pour deverrouiller Tasa wallet</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={inputText}
                                placeholderTextColor="#333"
                                style={styles.input}
                                editable={false}
                                textAlign='center'
                                maxLength={4}
                                secureTextEntry={true}
                            // onChangeText={gererChangementDeTexte}
                            />
                        </View>
                    </Animatable.View>
                )}
                {!isVisible && (
                    <View style={styles.container3}>
                        <Animatable.View ref={elementRef2}>
                            <Text style={{ color: 'black', marginBottom: 10, fontFamily: 'RobotoSerif_700Bold', textAlign: 'center' }}>Saisissez a nouveau votre code d'accès</Text>
                        </Animatable.View>

                        <Text style={{ color: 'gray', textAlign: 'center', fontFamily: 'RobotoSerif_400Regular', fontSize: 10 }}>Si vous oubliez votre code d'accè, vous devrez vous déonnecter ou reinstallez l'application.</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={inputText2}
                                placeholderTextColor="#333"
                                style={styles.input}
                                editable={false}
                                textAlign='center'
                                maxLength={4}
                                secureTextEntry={true}
                            />
                        </View>
                        <Text style={{ color: 'red', fontSize: 8, fontFamily: 'RobotoSerif_700Bold' }}>{hidenText}</Text>
                    </View>
                )}
                <View style={styles.container2}>
                    {[[1, 2, 3], [4, 5, 6], [7, 8, 9], ['c', '0', 'x']].map((row, rowIndex) => (
                        <View style={styles.row} key={rowIndex} >
                            {row.map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    style={styles.button}
                                    onPress={() => {
                                        if (num === 'C') {
                                            handleClear();
                                        } else if (num === 'x') {
                                            handleBackspace();
                                        } else {
                                            handleButtonClick(num);
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
        fontFamily: 'RobotoSerif_400Regular'


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
        fontFamily: 'RobotoSerif_400Regular'


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

});

export default CodeAccesScreen;