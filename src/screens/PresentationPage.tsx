import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import {
    RobotoSerif_400Regular,
    RobotoSerif_100Thin,
    useFonts,
} from "@expo-google-fonts/roboto-serif";
import default_color from '../styles/color';
import { CommonActions } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';


const PresentationPage = ({ navigation }) => {

    NavigationBar.setBackgroundColorAsync('white');

    const animation = useRef(null);
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    let [fontsLoaded] = useFonts({
        RobotoSerif_400Regular,
        RobotoSerif_100Thin,

    });
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const handleConnect = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
    }


    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.container}>
                        {/* <Text style={styles.title}>Étape 1</Text> */}
                        {/* <Text style={styles.description}>BIENVENUE SUR TASA WALLET</Text> */}

                        <LottieView
                            autoPlay
                            ref={animation}
                            loop={false}
                            style={{
                                width: 300,
                                height: 300,
                                // backgroundColor: '#eee',

                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../animations/lotties/hello.json')}
                        />
                        <Text style={styles.description}>BIENVENUE SUR TASA WALLET</Text>
                        <View style={styles.buttonContainer1}>
                            <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                                <Text style={styles.buttonText}>Suivant</Text>
                                {/* <Icon name="arrow-right" size={20} color="white" /> */}

                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>Apportez la joie dans vos familles</Text>
                        <LottieView
                            autoPlay
                            ref={animation}
                            loop={false}
                            style={{
                                width: 300,
                                height: 450,
                                // backgroundColor: '#eee',

                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../animations/lotties/explication.json')}
                        />
                        <Text style={styles.description2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos hic explicabo sequi consequuntur tenetur at laboriosam enim repudiandae sint suscipit, placeat nobis neque nisi ab facere cum numquam sed necessitatibus.</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                                <Text style={styles.buttonText}>Précédent</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                                <Text style={styles.buttonText}>Suivant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>Tasa votre partenaire le plus proche</Text>
                        <LottieView
                            autoPlay
                            ref={animation}
                            loop={false}
                            style={{
                                width: 300,
                                height: 450,
                                // backgroundColor: '#eee',

                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../animations/lotties/explication2.json')}
                        />
                        <Text style={styles.description2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos hic explicabo sequi consequuntur tenetur at laboriosam enim repudiandae sint suscipit, placeat nobis neque nisi ab facere cum numquam sed necessitatibus.</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handlePreviousStep}>
                                <Text style={styles.buttonText}>Précédent</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleConnect} >
                                <Text style={styles.buttonText}>Commencer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return renderStepContent();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 15,
        // fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'RobotoSerif_100Thin',

    },
    description: {
        fontSize: 17,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'RobotoSerif_100Thin',
        color: default_color.orange
    },
    description2: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'justify',
        fontFamily: 'RobotoSerif_100Thin',
        // color: default_color.orange
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        // paddingHorizontal: 20,
    }, buttonContainer1: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        // paddingHorizontal: 20,
    },
    button: {
        paddingHorizontal: 20,
        backgroundColor: default_color.orange,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 100,
        // borderRadius: 2,
        fontFamily: 'RobotoSerif_100Thin',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        // fontWeight: 'bold',
        fontFamily: 'RobotoSerif_100Thin',

    },
});

export default PresentationPage;
