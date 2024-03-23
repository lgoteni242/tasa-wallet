import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, ToastAndroid } from 'react-native';
import default_color from '../styles/color';
import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircles from '../components/ProgressCircles';
import RadioButtonCustom from '../components/RadioButtonCustom';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { convertImageToBlob, generateUniqueImageName } from '../utils/utils';
import { useSelector } from "react-redux";
import axios from 'axios';
import Modal from "react-native-modal";


const KycScreen = ({ navigation }: { navigation: any }) => {

    const token = useSelector((state: any) => state.auth.token);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("CNI");

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular
    });

    const [progress, setProgresse] = useState(true)
    const [versoPiece, setVersoPiece] = useState<any | null>(null);
    const [rectoPiece, setRectoPiece] = useState<any | null>(null);
    const [selfie, setSelfie] = useState<any | null>(null);
    const [piece, setPiece] = useState<any | null>(null)
    const [succesModal, setSuccessModal] = useState(false);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const formeA = async () => {
        try {
            // Créez un objet FormData pour les données à envoyer
            // const token = await getAuthToken();
            const formeData = new FormData();
            const imageName = generateUniqueImageName('tasa');
            console.error(selfie)

            if (selectedOption == "CNI") {

                const dataSelfie = {
                    uri: selfie,
                    name: imageName, // Nom de l'image, vous pouvez personnaliser cela
                    type: 'image/jpeg', // Type de l'image, assurez-vous qu'il correspond au type réel de l'image
                }

                const dataRectoPiece = {
                    uri: rectoPiece,
                    name: imageName, // Nom de l'image, vous pouvez personnaliser cela
                    type: 'image/jpeg', // Type de l'image, assurez-vous qu'il correspond au type réel de l'image
                }

                const dataVersoPiece = {
                    uri: versoPiece,
                    name: imageName, // Nom de l'image, vous pouvez personnaliser cela
                    type: 'image/jpeg', // Type de l'image, assurez-vous qu'il correspond au type réel de l'image
                }

                formeData.append('type_doc', selectedOption);
                formeData.append('doc_one', dataSelfie);
                formeData.append('doc_two', dataRectoPiece);
                formeData.append('doc_three', dataVersoPiece);

            } else {
                formeData.append('type_doc', selectedOption);
                const dataSelfie = {
                    uri: selfie,
                    name: imageName, // Nom de l'image, vous pouvez personnaliser cela
                    type: 'image/jpeg', // Type de l'image, assurez-vous qu'il correspond au type réel de l'image
                }
                const dataPiece = {
                    uri: piece,
                    name: imageName, // Nom de l'image, vous pouvez personnaliser cela
                    type: 'image/jpeg', // Type de l'image, assurez-vous qu'il correspond au type réel de l'image
                }

                formeData.append('doc_one', dataSelfie);
                formeData.append('doc_two', dataPiece);
            }
            const response = await axios.post('https://walet.tasa.pro/api/senddoc', formeData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Assurez-vous que le format de votre token est correct
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                },
                transformRequest: (data: FormData) => {
                    return data;
                }
            });
            setIsLoading(false)
            setSuccessModal(true)
            // Faites quelque chose avec la réponse si nécessaire
            console.log('Réponse de l\'API :', response.data);
        } catch (error) {
            // if (error.response) {
            //     // Une réponse a été reçue du serveur, y compris une erreur HTTP (par exemple, 400)
            //     console.error('Erreur lors de la requête à l\'API :', error.response.status);
            //     console.error('Réponse du serveur :', error.response.data);
            // } else if (error.request) {
            //     // Aucune réponse du serveur n'a été reçue (peut être dû à une absence de connexion)
            //     console.error('Aucune réponse du serveur');
            // } else {
            //     // Une erreur s'est produite lors de la configuration de la requête
            //     console.error('Erreur lors de la configuration de la requête :', error.message);
            // }
        }
        finally {
            setIsLoading(false); // Désactiver l'indicateur de chargement, que la requête réussisse ou échoue
        }
        // setValiD(true)
    }

    const handleSubmit = () => {
        if (selectedOption == "CNI") {

            if (versoPiece && rectoPiece && selfie) {
                setIsLoading(true);
                formeA()
            } else {
                ToastAndroid.show('Veuillez remplir tous les champs', ToastAndroid.SHORT);
                return;
            }
        } else {
            if (piece && selfie) {
                setIsLoading(true);
                formeA()
            } else {
                ToastAndroid.show('Veuillez remplir tous les champs', ToastAndroid.SHORT);
                return;
            }
        }
    }
    // const formeA = async () => {
    //     try {
    //         const formeData = new FormData();
    //         const imageName = generateUniqueImageName('tasa');

    //         if (selectedOption === "CNI") {
    //             formeData.append('tyep_doc', 'image/jpeg');

    //             const docOneBlob = await convertImageToBlob(selfie);
    //             formeData.append('doc_one', docOneBlob, imageName);

    //             const docTwoBlob = await convertImageToBlob(rectoPiece);
    //             formeData.append('doc_two', docTwoBlob, imageName);

    //             const docThreeBlob = await convertImageToBlob(versoPiece);
    //             formeData.append('doc_three', docThreeBlob, imageName);
    //         } else {
    //             formeData.append('tyep_doc', 'image/jpeg');

    //             const docOneBlob = await convertImageToBlob(selfie);
    //             formeData.append('doc_one', docOneBlob, imageName);

    //             const docTwoBlob = await convertImageToBlob(piece);
    //             formeData.append('doc_two', docTwoBlob, imageName);
    //         }
    //         const response = await axios.post('https://walet.tasa.pro/api/senddoc', formeData, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'multipart/form-data',
    //             }
    //         });
    //         console.log('Réponse de l\'API :', response.data);
    //     } catch (error) {
    //         // Gestion des erreurs
    //         console.error("Erreur des donnees")
    //     } finally {
    //         setIsLoading(false); // Désactiver l'indicateur de chargement, que la requête réussisse ou échoue
    //     }
    // };


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
                    setPiece(uri);
                }
            } else {
                console.log('Permission denied for camera');
            }
        } catch (error) {
            console.error('Erreur lors de la prise de la photo de l\'utilisateur :', error);
        }
    };

    const takeUserPhotoRecto = async () => {
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
                }
            } else {
                console.log('Permission denied for camera');
            }
        } catch (error) {
            console.error('Erreur lors de la prise de la photo de l\'utilisateur :', error);
        }
    };

    const takeUserPhotoVerso = async () => {
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
                    setVersoPiece(uri);
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
                }
            } else {
                console.log('Permission denied for camera');
            }
        } catch (error) {
            console.error('Erreur lors de la prise de la photo de l\'utilisateur :', error);
        }
    };

    const handleDeletePhoto = (imageType: string) => {

        if (imageType === 'recto') {
            setRectoPiece(null);
        } else if (imageType === 'selfie') {
            setSelfie(null);
        } else if (imageType === 'verso') {
            setVersoPiece(null)
        }
        else if (imageType === 'piece') {
            setPiece(null)
        }
    };

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
    };

    const handleSucces = () => {
        navigation.goBack()
        setSuccessModal(false)
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.container_image}>
                <View style={styles.container_logo}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
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
                                <Image source={require('../animations/assets/images/kyc.jpg')} style={styles.image} />
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
                                    <RadioButtonCustom label="PASSPORT" selected={selectedOption === 'PASSPORT'} onSelect={() => handleSelect('PASSPORT')} />
                                    <RadioButtonCustom label="PERMIS DE CONDUITE" selected={selectedOption === 'DRIVERS'} onSelect={() => handleSelect('DRIVERS')} />
                                </View>
                            </View>
                            {selectedOption == "CNI" ?
                                <>
                                    <View>
                                        {!rectoPiece &&
                                            <TouchableOpacity style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onPress={takeUserPhotoRecto}>
                                                <View style={{ width: "70%" }} >
                                                    <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 12, color: default_color.orange }}>Telecharger votre piece</Text>
                                                    <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 12, color: default_color.orange }}>CNI RECTO</Text>
                                                    <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 11, color: "gray" }}>Nous acceptons que</Text>
                                                    <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 8, color: "gray" }}>CNI, Passeport,Permis de conduite</Text>
                                                </View>
                                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={require('../animations/assets/images/id.jpg')} style={styles.imageId} />
                                                </View>
                                            </TouchableOpacity>

                                        }
                                        {rectoPiece && (
                                            <View style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={styles.selectedOptions}>
                                                    <Text style={{ color: 'gray', textAlign: 'center' }} >{selectedOption} RECTO</Text>
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
                                        {!versoPiece &&
                                            <TouchableOpacity style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onPress={takeUserPhotoVerso}>
                                                <View style={{ width: "70%" }} >
                                                    <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 12, color: default_color.orange }}>Telecharger votre piece</Text>
                                                    <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 12, color: default_color.orange }}>CNI VERSO</Text>
                                                    <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 11, color: "gray" }}>Nous acceptons que</Text>
                                                    <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 8, color: "gray" }}>CNI, Passeport,Permis de conduite</Text>
                                                </View>
                                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={require('../animations/assets/images/id.jpg')} style={styles.imageId} />
                                                </View>
                                            </TouchableOpacity>

                                        }
                                        {versoPiece && (
                                            <View style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={styles.selectedOptions}>
                                                    <Text style={{ color: 'gray', textAlign: 'center' }} >{selectedOption} VERSO</Text>
                                                    <TouchableOpacity
                                                        style={[styles.closeButton3]}
                                                        onPress={() => handleDeletePhoto('verso')}>
                                                        <Text style={{ fontSize: 12, color: default_color.orange, textAlign: 'center' }}>Supprimer</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <Image source={{ uri: versoPiece }} style={{ width: 150, height: 100, borderRadius: 10 }} />
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </>
                                :
                                <View>
                                    {!piece &&
                                        <TouchableOpacity style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onPress={takeUserPhoto}>
                                            <View style={{ width: "70%" }} >
                                                <Text style={{ fontFamily: 'RobotoSerif_700Bold', fontSize: 12, color: default_color.orange }}>Telecharger votre piece</Text>

                                                <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 11, color: "gray" }}>Nous acceptons que</Text>
                                                <Text style={{ fontFamily: 'RobotoSerif_400Regular', fontSize: 8, color: "gray" }}>CNI, Passeport,Permis de conduite</Text>
                                            </View>
                                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../animations/assets/images/id.jpg')} style={styles.imageId} />
                                            </View>
                                        </TouchableOpacity>
                                    }
                                    {piece && (
                                        <View style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={styles.selectedOptions}>
                                                <Text style={{ color: 'gray', textAlign: 'center' }} >{selectedOption}</Text>
                                                <TouchableOpacity
                                                    style={[styles.closeButton3]}
                                                    onPress={() => handleDeletePhoto('piece')}>
                                                    <Text style={{ fontSize: 12, color: default_color.orange, textAlign: 'center' }}>Supprimer</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <Image source={{ uri: piece }} style={{ width: 150, height: 100, borderRadius: 10 }} />
                                            </View>
                                        </View>
                                    )}
                                </View>
                            }

                            {/* <View>
                                {!versoPiece &&
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
                                {versoPiece && (
                                    <View style={{ height: 140, marginVertical: 20, borderWidth: 2, borderRadius: 10, borderColor: 'gray', borderStyle: 'dashed', padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={styles.selectedOptions}>
                                            <Text style={{ color: 'gray', textAlign: 'center' }} >{selectedOption}</Text>
                                            <TouchableOpacity
                                                style={[styles.closeButton3]}
                                                onPress={() => handleDeletePhoto('verso')}>
                                                <Text style={{ fontSize: 12, color: default_color.orange, textAlign: 'center' }}>Supprimer</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Image source={{ uri: versoPiece }} style={{ width: 150, height: 100, borderRadius: 10 }} />
                                        </View>
                                    </View>
                                )}

                            </View> */}
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
                                            <Image source={require('../animations/assets/images/selfie.png')} style={styles.imageId} />
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
                                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} >
                                    <Text style={styles.buttonText}>Envoyer</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }

                <Modal
                    coverScreen={fontsLoaded}
                    backdropOpacity={0.3}
                    isVisible={isLoading}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                >
                    <View style={styles.modalContainerChargement}>
                        <View style={styles.modalContentChargement}>
                            <ActivityIndicator
                                size={80}
                                color={default_color.orange}
                                animating={isLoading}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    coverScreen={true}
                    backdropOpacity={0.3}
                    isVisible={succesModal}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <View style={styles.modalContainerSend}>
                        <View style={styles.modalContentSend2}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "rgba(16,17,17,0.84)",
                                    fontFamily: "RobotoSerif_400Regular",
                                    // textAlign: 'justify'
                                }}
                            >
                                Vos données ont été envoyées avec succès. Nous les traiterons et activerons votre compte dans les 24 heures suivantes. Pour l'instant, vous n'êtes pas en mesure d'effectuer des opérations. Cela ne sera possible qu'une fois votre identité vérifiée et confirmée. Merci.
                            </Text>
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
                                    onPress={() => handleSucces()}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.buttonText2}>Accueil</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
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
        // justifyContent: 'flex-start',
        backgroundColor: "white",
        padding: 20,
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
        marginBottom: 50
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
    modalContentSend2: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonRetour: {
        backgroundColor: "white",
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 100,
        width: "40%",
        // borderWidth: 0.5,
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

export default KycScreen;
