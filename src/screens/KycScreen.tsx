import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircles from '../components/ProgressCircles';
import RadioButtonCustom from '../components/RadioButtonCustom';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const KycScreen = ({ navigation }) => {

    const [selectedOption, setSelectedOption] = useState("CNI");
    let [fontsLoaded] = useFonts({
        Pacifico_400Regular
    });

    const [progress, setProgresse] = useState(true)
    const [versoPiece, setVersoPiece] = useState(null);
    const [rectoPiece, setRectoPiece] = useState(null);
    const [selfie, setSelfie] = useState(null);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const takeUserPhoto = async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                if (!result.canceled) {
                    const { uri } = result.assets[0];
                    setRectoPiece(uri);
                    console.error(rectoPiece)
                }
            } else {
                console.log('Permission denied for camera');
            }
        } catch (error) {
            console.error('Erreur lors de la prise de la photo de l\'utilisateur :', error);
        }
    };

    const takeUserPhotoSelfie = async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                if (!result.canceled) {
                    const { uri } = result.assets[0];
                    setSelfie(uri);
                    console.error(rectoPiece)
                }
            } else {
                console.log('Permission denied for camera');
            }
        } catch (error) {
            console.error('Erreur lors de la prise de la photo de l\'utilisateur :', error);
        }
    };

    const handleDeletePhoto = (imageType: string) => {
        // if (imageType === 'id') {
        // setIdImage(null);
        // } else if (imageType === 'user') {
        // setUserImage(null);
        if (imageType === 'recto') {
            setRectoPiece(null);
        } else if (imageType === 'selfie') {
            setSelfie(null);
        }
    };

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="dark-content" />
            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={styles.iconStyleRetour}
                    >
                        <Icon name="arrow-left" size={20} color="gray" />
                    </TouchableOpacity>
                    {/* <Text style={styles.icon}>T'wallet</Text> */}
                    <Text style={styles.connexion}></Text>
                </View>
                {
                    progress ?
                        <>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/kyc.jpg')} style={styles.image} />
                            </View>
                            <View style={{ marginBottom: 200 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'RobotoSerif_700Bold', fontSize: 16, color: default_color.orange }}>
                                    Verification de votre identite !
                                </Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'RobotoSerif_400Regular', fontSize: 11, color: "gray", }}>
                                    L'identitification, est un processus réglementaire que nous devons suivre en tant qu’institution financière pour vérifier l’identité de nos clients avant de fournir des services.
                                </Text>
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }} >
                                <ProgressCircles currentStep={1} />
                            </View>
                            <View>
                                <TouchableOpacity style={styles.button} onPress={() => setProgresse(false)}>
                                    <Text style={styles.buttonText}>Suivant</Text>
                                </TouchableOpacity>
                            </View>
                        </>

                        :

                        <>
                            <View style={{ marginBottom: 30 }}>
                                <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 19, color: default_color.orange }}>
                                    Preuve d’identité
                                </Text>
                                <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 10, color: "gray" }}>
                                    Pour compléter votre inscription, veuillez télécharger une copie de votre pièce d’identité avec un selfie clair pour prouver que vous êtes le détenteur du document
                                </Text>

                            </View>
                            <View>
                                <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 11, color: "gray" }}>Choisir le moyen d'identification</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <RadioButtonCustom label="CNI" selected={selectedOption === "CNI"} onSelect={() => handleSelect("CNI")} />
                                    <RadioButtonCustom label="Passport" selected={selectedOption === 'Passport'} onSelect={() => handleSelect('Passport')} />
                                    <RadioButtonCustom label="Permis de conduite" selected={selectedOption === 'Permis de conduite'} onSelect={() => handleSelect('Permis de conduite')} />
                                </View>
                            </View>

                            <View>
                                {!rectoPiece &&
                                    <TouchableOpacity style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onPress={takeUserPhoto}>
                                        <View style={{ width: "70%" }} >
                                            <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 12, color: default_color.orange }}>Telecharger votre piece</Text>
                                            <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 11, color: "gray" }}>Nous acceptons que</Text>
                                            <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 8, color: "gray" }}>CNI, Passeport,Permis de conduite</Text>
                                        </View>
                                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/images/id.jpg')} style={styles.imageId} />
                                        </View>
                                    </TouchableOpacity>

                                }
                                {rectoPiece && (
                                    <View style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={styles.selectedOptions}>
                                            <Text style={{ color: 'gray', textAlign: 'center' }} >{selectedOption}</Text>
                                            <TouchableOpacity
                                                style={[styles.closeButton3]}
                                                onPress={() => handleDeletePhoto('recto')}>
                                                <Text style={{ fontSize: 12, color: default_color.orange, textAlign: 'center' }}>Supprimer</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Image source={{ uri: rectoPiece }} style={{ width: 150, height: 100, borderRadius: 10 }} />
                                        </View>
                                    </View>
                                )}

                            </View>
                            <View>
                                <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 13, color: "gray" }}>Un selfie avec votre pieces identité</Text>
                                <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 9, color: "gray" }}>Veuillez vous assurer que chaque détail du document d’identité soit clairement visible.</Text>

                                {
                                    !selfie &&
                                    <TouchableOpacity style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onPress={takeUserPhotoSelfie}>
                                        <View style={{ width: "70%" }}>
                                            <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 9, color: default_color.orange }}>Prenez un selfie avec votre piece d'identité</Text>
                                            <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 9, color: "gray" }}>Veuillez noter que les captures d’écran, les factures de téléphone mobile et les assurances ne sont pas acceptées pour la vérification.</Text>
                                        </View>
                                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/images/selfie.png')} style={styles.imageId} />
                                        </View>
                                    </TouchableOpacity>
                                }
                                {
                                    selfie &&

                                    <View style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={styles.selectedOptions}>
                                            <Text style={{ color: 'gray', textAlign: 'center' }} >Selfie avec piece</Text>
                                            <TouchableOpacity
                                                style={[styles.closeButton3]}
                                                onPress={() => handleDeletePhoto('selfie')}>
                                                <Text style={{ fontSize: 12, color: default_color.orange, textAlign: 'center' }}>Supprimer</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Image source={{ uri: selfie }} style={{ width: 150, height: 100, borderRadius: 10 }} />
                                        </View>
                                    </View>
                                }

                            </View>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }} >
                                <ProgressCircles currentStep={2} />
                            </View>
                            <View>
                                <TouchableOpacity style={styles.button} >
                                    <Text style={styles.buttonText}>Envoyer</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }
            </View>
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
        // left: 20,
        zIndex: 2,
        // padding:10
    },
    container_logo: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    icon: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white'
    },

    container_image: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: "white",
        padding: 20
        // backgroundColor: default_color.orange,
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
        fontSize: 13,
        fontFamily: 'RobotoSerif_400Regular',

    },
    slogan: {
        textAlign: 'center',
        marginTop: 13,
        fontSize: 10,
        fontFamily: 'RobotoSerif_400Regular',


    },
    connexion: {
        // textAlign: 'center',
        marginLeft: 40,
        marginTop: 40,
        marginBottom: 20,
        fontSize: 13,
        fontFamily: 'RobotoSerif_400Regular',

        color: 'black'
    },
    image: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        // borderRadius: 100
    },
    imageId: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        // borderRadius: 100
    },
    selectedOptions: {
        width: "40%",
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%'

    },
    closeButton3: {
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        borderColor: default_color.orange,
        borderWidth: 0.5
    },
});

export default KycScreen;
