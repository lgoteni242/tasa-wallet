import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import default_color from '../styles/color';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Roboto_700Bold } from '@expo-google-fonts/roboto';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { RobotoSerif_400Regular, useFonts } from '@expo-google-fonts/roboto-serif';

import Icon from 'react-native-vector-icons/FontAwesome';

const DashBoardScreen = ({ navigation }) => {

    const [soldeVisible, setSoldeVisible] = useState(false);

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
        RobotoSerif_400Regular,
        Roboto_700Bold,
        PlayfairDisplay_400Regular
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient
                colors={[default_color.orange, 'gray']}
                start={{ x: 0, y: 0.3 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.container_image}
            >
                <View style={styles.container_logo}>
                    <TouchableOpacity >
                        <Icon name='user' size={25} color='white' />
                    </TouchableOpacity>
                    <Text style={styles.welcomMessage}>Bienvenue sur Tasa wallet</Text>
                    <TouchableOpacity >
                        <Icon name='bell' size={25} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={styles.barShow}>
                    <View style={styles.hautBarShow}>
                        <View style={styles.hautBarShowBalance}>
                            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', color: 'black' }}>Balance compte</Text>
                        </View>
                        <View style={styles.hautBarShowBalance}>
                            {
                                soldeVisible
                                    ?
                                    <Text style={{ fontFamily: 'Roboto_700Bold', color: 'gray', fontSize: 30 }}>$ 1.245.192</Text>
                                    :
                                    <Text style={{ fontFamily: 'Roboto_700Bold', color: 'gray', fontSize: 30 }}>$ XXXXXXX</Text>
                            }
                            <TouchableOpacity
                                onPress={() => setSoldeVisible(!soldeVisible)}
                            >
                                <Icon name={soldeVisible ? 'eye' : 'eye-slash'} size={40} color='gray' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.basBarShow}>
                        <View>
                            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', color: 'white' }}>18/2023</Text>
                            <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', color: 'white' }}>Levi Goteni</Text>
                        </View>

                        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', color: 'white' }}>Congo</Text>
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.option}>
                        <TouchableOpacity style={styles.iconShowbar}>
                            <Icon name='send' size={30} color='gray' />
                        </TouchableOpacity>
                        <Text style={styles.textShowbar}>Envoyer</Text>
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity style={styles.iconShowbar}>
                            <Icon name='money' size={30} color='gray' />
                        </TouchableOpacity>
                        <Text style={styles.textShowbar}>Retirer</Text>
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity style={styles.iconShowbar}>
                            <View style={{paddingHorizontal:2.4}}>

                            <Icon name='plus' size={30} color='gray' />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.textShowbar}>Crediter</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.transaction}>
                <View style={styles.transcationTexte}>
                    <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', fontSize: 15 }}>Transactions</Text>
                    <View style={styles.transactionPillule}>
                        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular', color: 'white', fontSize: 12, marginHorizontal: 15 }}>Aujourd'hui</Text>
                    </View>
                </View>
                <ScrollView style={{ marginBottom: 60 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom:10 }}>
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name='user' size={30} color='gray' />
                            </TouchableOpacity>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>Levi Goteni</Text>
                                <Text style={{ color: 'gray', fontFamily: 'PlayfairDisplay_400Regular' }}>12:15 PM</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>1124 Fcfa</Text>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom:10 }}>
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name='user' size={30} color='gray' />
                            </TouchableOpacity>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>Levi Goteni</Text>
                                <Text style={{ color: 'gray', fontFamily: 'PlayfairDisplay_400Regular' }}>12:15 PM</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>1124 Fcfa</Text>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row',marginBottom:10 }}>
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name='user' size={30} color='gray' />
                            </TouchableOpacity>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>Levi Goteni</Text>
                                <Text style={{ color: 'gray', fontFamily: 'PlayfairDisplay_400Regular' }}>12:15 PM</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>1124 Fcfa</Text>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom:10 }}>
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name='user' size={30} color='gray' />
                            </TouchableOpacity>
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>Levi Goteni</Text>
                                <Text style={{ color: 'gray', fontFamily: 'PlayfairDisplay_400Regular' }}>12:15 PM</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'PlayfairDisplay_400Regular' }}>1124 Fcfa</Text>
                    </View>
                </ScrollView>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    container_logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 30,
        width: '100%'
    },
    welcomMessage: {
        fontFamily: 'PlayfairDisplay_400Regular',
        color: 'white',
        fontSize: 15
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
        flex: 0.6,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: default_color.orange,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // elevation: 10, // pour Android
        // shadowColor: '#000', // pour iOS
        // shadowOffset: { width: 0, height: 2 }, // pour iOS
    },
    barShow: {
        height: 170,
        width: '100%',
        backgroundColor: 'white',
        // bottom: -30,
        marginTop: 30,
        borderRadius: 20,
        elevation: 5, // pour Android
        shadowColor: '#000', // pour iOS
        shadowOffset: { width: 0, height: 2 }, // pour iOS
        display: 'flex',
    },
    basBarShow: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
        backgroundColor: 'gray',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    hautBarShow: {
        flex: 0.7,
        // backgroundColor: default_color.orange,
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    hautBarShowBalance: {
        height: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionContainer: {
        width: '100%',
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconShowbar: {
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 25,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    iconShowbarTransaction: {
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 10,
        paddingHorizontal: 13,
        // paddingVertical: 2,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    textShowbar: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'PlayfairDisplay_400Regular',
    },
    option: {
        display: 'flex',
        alignItems: 'center',
    },
    transaction: {
        flex: 0.4,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    transcationTexte: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    transactionPillule: {
        justifyContent: 'center',
        display: 'flex',
        // padding:1,
        backgroundColor: 'gray',
        borderRadius: 20
    },
    transcationListe: {
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    }

});

export default DashBoardScreen;
