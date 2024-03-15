import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import default_color from '../styles/color';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';



const { width } = Dimensions.get('window');
const headerHeight = 180;
const headerFinalHeight = 100;
const imageSize = (headerHeight / 3.5) * 2;



export default function ScrollViewAnimatedHeader({ navigation }) {

    const user = useSelector(state => state.auth.user);
    const isCodeAcces = useSelector(state => state.auth.isCodeAcces);

    const scrollY = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);
    const offset = headerHeight - headerFinalHeight;
    const translateHeader = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -offset],
        extrapolate: 'clamp',
    });
    const translateImageX = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [
            0,
            -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
        ],
        extrapolate: 'clamp',
    });
    const translateImageY = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
        extrapolate: 'clamp',
    });
    const scaleImage = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, headerFinalHeight / headerHeight],
        extrapolate: 'clamp',
    });
    const translateName = scrollY.interpolate({
        inputRange: [0, offset / 2, offset],
        outputRange: [0, 10, -width / 2 + textWidth / 2 + headerFinalHeight],
        extrapolate: 'clamp',
    });
    const scaleName = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}>
                <View style={styles.aujourdhui}>
                    {/* <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Compte</Text> */}
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <Icon name="user" color="grey" size={20} style={{ marginRight: 18 }} />

                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", fontSize: 12 }}>{user && user.prenom} {user && user.name}</Text>
                                <Text style={{ textTransform: 'uppercase', color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Nom(s) et prenom(s)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <Icon name="phone" color="grey" size={20} style={{ marginRight: 18 }} />
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>{user && user.phone}</Text>
                                <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Numero de telephone</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transcationListe}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                            <Icon name="envelope" color="grey" size={18} style={{ marginRight: 18 }} />
                            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>{user && user.email}</Text>
                                <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Adresse email</Text>
                            </View>
                        </View>
                    </View>
                    {isCodeAcces ?
                        <TouchableOpacity style={styles.transcationListe} onPress={() => navigation.navigate('CodeVerif')}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: "center", width: "90%" }}>
                                <Icon name="lock" color="grey" size={20} style={{ marginRight: 18 }} />
                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: "center", width: "100%" }}>
                                    <Text style={{ fontFamily: "RobotoSerif_400Regular" }}>Code d'accès</Text>
                                    <Text style={{ color: default_color.orange, fontSize: 12, fontFamily: "RobotoSerif_400Regular" }}>Activée</Text>
                                </View>
                            </View>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.transcationListe} onPress={() => navigation.navigate('CodeAcces')}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center", width: "100%" }}>
                                <Icon name="lock" color="grey" size={20} style={{ marginRight: 18 }} />
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: "center", width: "90%" }}>
                                    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>Définir un code de sécurité.</Text>
                                        <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Le code de sécurité protege votre application</Text>
                                    </View>
                                    <Icon name="chevron-right" color="grey" size={12} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('CodeVerif')}>
                        <View style={styles.transcationListe}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                                <Icon name="key" color="grey" size={18} style={{ marginRight: 18 }} />
                                <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>Voir sa clé de sécurité</Text>
                                    <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>La clé de sécurité permet de reinitialiser le mot de passe</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Kyc')}>
                        <View style={styles.transcationListe}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
                                <Icon name="money" color="grey" size={18} style={{ marginRight: 18 }} />
                                <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: "RobotoSerif_400Regular", }}>Augmenter votre seuil</Text>
                                    <Text style={{ color: 'gray', fontSize: 8, fontFamily: "RobotoSerif_400Regular" }}>Votre present seuil est de 500.000 Fcfa</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 14, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Mettre a jour le code pin</Text>
                    {/* <View style={styles.transcationListe}> */}
                    {/* <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.</Text> */}

                    <View style={styles.inputContainer}>
                        <Icon
                            name="lock"
                            size={15}
                            color="grey"
                            style={styles.iconStyle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Code pin actuel"
                            keyboardType="numeric"
                            autoCapitalize="none"
                        // value={montant}
                        // onChangeText={setMontant}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon
                            name="lock"
                            size={15}
                            color="grey"
                            style={styles.iconStyle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nouveau code pin"
                            keyboardType="numeric"
                            autoCapitalize="none"
                        // value={montant}
                        // onChangeText={setMontant}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon
                            name="lock"
                            size={15}
                            color="grey"
                            style={styles.iconStyle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmer le code pin"
                            keyboardType="numeric"
                            autoCapitalize="none"
                        // value={montant}
                        // onChangeText={setMontant}
                        />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sauvegarder</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Authentification en deux étapes</Text>
                    <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Lorsque l’authentification à deux facteurs est activée, un jeton aléatoire sécurisé vous sera demandé pendant l’authentification. Vous pouvez récupérer ce jeton à partir de l’application Google Authenticator de votre téléphone.</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Activer</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.aujourdhui}>
                    <Text style={{ marginBottom: 5, color: default_color.orange, fontSize: 13, fontFamily: "RobotoSerif_700Bold", }}>Sessions de navigateur</Text>
                    <Text style={{ color: 'gray', fontSize: 10, marginBottom: 10, textAlign: 'justify', fontFamily: "RobotoSerif_400Regular" }}>Si nécessaire, vous pouvez vous déconnecter de toutes vos autres sessions de navigateur sur tous vos appareils. Certaines de vos sessions récentes sont énumérées ci-dessous; cependant, cette liste peut ne pas être exhaustive. Si vous pensez que votre compte a été compromis, vous devez également mettre à jour votre mot de passe.</Text>
                    <TouchableOpacity style={styles.buttonEnd} >
                        <Text style={styles.buttonTextEnd}>Se deconnecter des autres sessions du navigateur</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ textAlign: 'center', color: 'gray', fontFamily: "RobotoSerif_100Thin", fontSize: 10 }}>
                        Tasa wallet v.1.0
                    </Text>
                </View>
            </ScrollView >
            <Animated.View
                pointerEvents='none'
                style={[styles.header, { transform: [{ translateY: translateHeader }] }]}>
                <Animated.View
                    style={[
                        styles.image,
                        {
                            transform: [
                                { translateY: translateImageY },
                                // { translateX: translateImageX },
                                { scale: scaleImage },
                            ],
                        },
                    ]}>
                    <Text style={{ color: default_color.orange, fontSize: 40 }}>{user && user.name[0]}</Text>
                </Animated.View>
                <Animated.Text
                    onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
                    style={[
                        styles.name,
                        {
                            transform: [
                                { scale: scaleImage },
                                // { translateX: translateName },

                            ],
                        },

                    ]}>
                    {user && user.prenom} {user && user.name}
                </Animated.Text>
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: headerHeight,
        backgroundColor: default_color.orange,
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15

    },
    scrollContainer: {
        paddingTop: headerHeight + 0,
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: headerHeight,
        backgroundColor: '#fff',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
        // marginBottom: 8
    },
    img: {
        height: '100%',
        width: '100%',
    },
    name: {
        marginTop: 15,
        fontSize: 11,
        color: 'white',
        textAlignVertical: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
        position: 'absolute',
        bottom: 0
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
        height: 140,
        justifyContent: 'center',
        backgroundColor: default_color.orange,
        padding: 20,
        alignItems: 'center'
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 100,
        width: "100%",
    },

    input: {
        // flex: 1,
        // height: 50,
        // paddingHorizontal: 10,
        // fontSize: 10,
        // fontFamily: 'RobotoSerif_400Regular'
        flex: 1,
        height: 45,
        // paddingHorizontal: 10,
        fontFamily: "RobotoSerif_400Regular",

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
    iconStyle: {
        paddingHorizontal: 10,
        color: "grey",
    },
});