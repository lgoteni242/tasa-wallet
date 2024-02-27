import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
import { Roboto_700Bold, Roboto_100Thin, Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_100Thin,
} from "@expo-google-fonts/roboto-serif";


const CodeAccesConfigScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        RobotoSerif_400Regular,
        RobotoSerif_100Thin,
        RobotoSerif_700Bold,
    });
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="light-content" />
            <View style={styles.container_image}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" size={10} color="white" style={{ fontSize: 15, fontWeight: '100', marginRight: 30 }} />
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 12, fontFamily: 'RobotoSerif_400Regular' }}>Code d'accès</Text>
            </View>
            <View>

            </View>
            <View >
                <View style={styles.aujourdhui}>
                    {/* <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Compte</Text> */}
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <Text style={{ color: 'black', fontSize: 14, fontFamily: "RobotoSerif_400Regular" }}>Modifier le code d'accès</Text>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>{user && user.phone}</Text> */}
                                <Text style={{ color: 'black', fontSize: 14, fontFamily: "RobotoSerif_400Regular" }}>Déverrouiller avec empreinte digitale</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>{user && user.email}</Text> */}
                                <Text style={{ color: default_color.orange, fontSize: 14, fontFamily: "RobotoSerif_400Regular" }}>Désactiver le code d'acccès</Text>
                            </View>
                        </View>
                    </View>

                </View>

            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container_logo: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 70,
        padding: 20
    },
    icon: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white'
    },

    container_image: {
        paddingTop: 40,
        height: '13%',
        // justifyContent: 'center',
        backgroundColor: default_color.orange,
        padding: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 100,
    },

    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        fontSize: 10,
        fontFamily: 'RobotoSerif_400Regular'

    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 7,
        alignItems: 'center',
        borderRadius: 100,
        marginBottom: 10,
        width: '40%',

    },
    buttonEnd: {
        backgroundColor: default_color.orange,
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: 100,
        marginBottom: 10,
        width: '100%',

    },
    buttonText: {
        color: default_color.white,
        fontSize: 13,
        fontFamily: 'RobotoSerif_400Regular',
    },
    buttonTextEnd: {
        color: default_color.white,
        fontSize: 10,
        fontFamily: 'RobotoSerif_400Regular',
    },
    aujourdhui: {
        marginBottom: 10,
        elevation: 5, // pour Android
        shadowColor: '#000', // pour iOS
        shadowOffset: { width: 0, height: 2 }, // 
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    transcationListe: {
        marginTop: 1,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#ccc',


    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 100
    },


});

export default CodeAccesConfigScreen