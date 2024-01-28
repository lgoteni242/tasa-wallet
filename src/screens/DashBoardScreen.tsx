import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { PlayfairDisplay_400Regular } from "@expo-google-fonts/playfair-display";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import CustomModalPicker from "../components/CustomModalPicker";
import Toast from 'react-native-toast-message';
import {
    RobotoSerif_400Regular,
    useFonts,
} from "@expo-google-fonts/roboto-serif";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import default_color from "../styles/color";
import Modal from 'react-native-modal';
import Icon from "react-native-vector-icons/FontAwesome";




const DashBoardScreen = ({ navigation }) => {
    // =================Chargement============================
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState('');
    // =======================================================
    // ================Verify send money======================
    const [sendMoney, setSendMoney] = useState(false);
    const [notSendMoney, setNotSendMoney] = useState(false);
    // ======================================================
    const [soldeVisible, setSoldeVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [modalVisible, setModalVisible2] = useState(false);
    const [sendResumeModal, setSendResumeModal] = useState(false)
    const [crediterModal, setCrediterModal] = useState(false);
    const [retraitModal, setRetraitModal] = useState(false);
    // ==================Send money===================================
    const [solde, setSolde] = useState('1245192');
    const [numero, setNumero] = useState('');
    const [montant, setMontant] = useState('500');
    const [montantRetrait, setMontantRetrait] = useState('500');
    const [montantCrediter, setMontantCrediter] = useState('500');
    const [retrait, setRetrait] = useState(false);
    const [crediter, setCrediter] = useState(false);
    const [choixpayement, setChoixPayement] = useState("");
    // ================================================================

    const [verifPass, setVeerifPass] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false);

    // const flag = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));

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


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleCrediterModal = () => {
        setCrediterModal(!crediterModal);
    };

    const toggleRetraitModal = () => {
        setRetraitModal(!retraitModal);
    };

    function randomTrueOrFalse() {
        return Math.random() < 0.5;
    }

    const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
    };

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
        RobotoSerif_400Regular,
        Roboto_700Bold,
        PlayfairDisplay_400Regular,
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    const handlePress = () => {
        setIsLoading(true);
        // Simuler un appel à une API (remplacez cette partie par votre appel réel à l'API)
        setTimeout(() => {
            // Après un certain délai, obtenir la réponse de l'API (simulée ici)
            const response = 'Réponse de l\'API';
            setApiResponse(response);
            if (randomTrueOrFalse()) {
                setSendResumeModal(false)
                setIsLoading(false);
                toggleModal()
                setSendMoney(true)
            } else {
                setSendResumeModal(false)
                setIsLoading(false);
                toggleModal()
                setNotSendMoney(true)
            }
        }, 2000); // Temps de délai simulé pour la réponse de l'API (2 secondes)
    };
    const customStyles = {
        top: 0, // Positionner le toast en haut de l'écran
        left: 0, // Ajuster la position horizontale si nécessaire
        right: 0, // Ajuster la position horizontale si nécessaire
        // Ajoutez d'autres styles personnalisés au besoin
    };

    const showMessage = () => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Cette fonctionnalité est en cours de développement:',
            // bottomOffset: -1,
            topOffset: -1
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient
                colors={[default_color.orange, "gray"]}
                start={{ x: 0, y: 0.3 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.container_image}
            >
                <View style={styles.container_logo}>
                    <TouchableOpacity>
                        <Icon name="user" size={25} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.welcomMessage}>Bienvenue sur Tasa wallet</Text>
                    <TouchableOpacity>
                        <Icon name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.barShow}>
                    <View style={styles.hautBarShow}>
                        <View style={styles.hautBarShowBalance}>
                            <Text
                                style={{
                                    fontFamily: "Roboto_700Bold",
                                    color: "gray",
                                    fontSize: 15,
                                }}
                            >
                                Balance compte
                            </Text>
                        </View>
                        <View style={styles.hautBarShowBalance}>
                            {soldeVisible ? (
                                <Text
                                    style={{
                                        fontFamily: "Roboto_700Bold",
                                        color: "gray",
                                        fontSize: 30,
                                    }}
                                >
                                    $ {solde}
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        fontFamily: "Roboto_700Bold",
                                        color: "gray",
                                        fontSize: 30,
                                    }}
                                >
                                    $ XXXXXXX
                                </Text>
                            )}
                            <TouchableOpacity onPress={() => setSoldeVisible(!soldeVisible)}>
                                <Icon
                                    name={soldeVisible ? "eye" : "eye-slash"}
                                    size={40}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.basBarShow}>
                        <View>
                            <Text
                                style={{
                                    // fontFamily: "PlayfairDisplay_400Regular",
                                    color: "white",
                                }}
                            >
                                18/2023
                            </Text>
                            <Text
                                style={{
                                    // fontFamily: "PlayfairDisplay_400Regular",
                                    color: "white",
                                }}
                            >
                                Levi Goteni
                            </Text>
                        </View>
                        <Text
                            style={{
                                // fontFamily: "PlayfairDisplay_400Regular",
                                color: "white",
                            }}
                        >
                            Congo
                        </Text>
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.option}>
                        <TouchableOpacity style={styles.iconShowbar} onPress={toggleModal}>
                            <Icon name="send" size={30} color="gray" />
                        </TouchableOpacity>
                        <Text style={styles.textShowbar}>Envoyer</Text>
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity style={styles.iconShowbar} onPress={toggleCrediterModal}>
                            <Icon name="money" size={30} color="gray" />
                        </TouchableOpacity>
                        <Text style={styles.textShowbar}>Retirer</Text>
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity style={styles.iconShowbar} onPress={toggleRetraitModal}>
                            <View style={{ paddingHorizontal: 2.4 }}>
                                <Icon name="plus" size={30} color="gray" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.textShowbar}>Crediter</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.transaction}>
                <View style={styles.transcationTexte}>
                    <Text
                        style={{ fontSize: 15 }}
                    >
                        Transactions
                    </Text>
                    <View style={styles.transactionPillule}>
                        <Text
                            style={{
                                // fontFamily: "PlayfairDisplay_400Regular",
                                color: "white",
                                fontSize: 12,
                                marginHorizontal: 15,
                            }}
                        >
                            Aujourd'hui
                        </Text>
                    </View>
                </View>
                <ScrollView
                    style={{ marginBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 10,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
                            </TouchableOpacity>
                            <View
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <Text >
                                    Levi Goteni
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        // fontFamily: "PlayfairDisplay_400Regular",
                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text >
                            1124 Fcfa
                        </Text>
                    </View>
                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 10,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
                            </TouchableOpacity>
                            <View
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <Text >
                                    Levi Goteni
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        // fontFamily: "PlayfairDisplay_400Regular",
                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text>
                            1124 Fcfa
                        </Text>
                    </View>
                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 10,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
                            </TouchableOpacity>
                            <View
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <Text >
                                    Levi Goteni
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        // fontFamily: "PlayfairDisplay_400Regular",
                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text >
                            1124 Fcfa
                        </Text>
                    </View>
                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 10,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
                            </TouchableOpacity>
                            <View
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <Text >
                                    Levi Goteni
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        // fontFamily: "PlayfairDisplay_400Regular",
                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text >
                            1124 Fcfa
                        </Text>
                    </View>
                </ScrollView>
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal} // Cela fermera le modal lorsqu'on touche à l'extérieur
                swipeDirection="down" // Permet de fermer le modal en swipant vers le bas
                style={styles.modal}
                backdropOpacity={0.1}
            >
                <View style={styles.modalContent}>
                    <Text style={{ fontSize: 23, paddingBottom: 30, fontWeight: 'bold', color: 'gray', }}>Envoyer de l'argent</Text>
                    <View style={styles.inputContainer2}>
                        {selectedOption == "" ?
                            <Icon name="globe" size={15} color="grey" style={styles.iconStyle} />
                            :
                            selectedOption == "Republique du Congo" ?
                                <Text style={styles.iconStyle}>{flag('cg')}</Text> :
                                <Text style={styles.iconStyle}>{flag('sn')}</Text>
                        }
                        <TouchableOpacity onPress={() => setModalVisible2(true)} style={{ width: "88%" }}>
                            {selectedOption == "" ? (<Text style={{ color: 'grey' }}>Pays de residence</Text>) : <Text>{selectedOption}</Text>}
                        </TouchableOpacity>
                        <CustomModalPicker
                            options={options}
                            onSelect={handleSelect}
                            visible={modalVisible}
                            onClose={() => setModalVisible2(false)}
                            titre="Choisir le pays de destination"

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        {selectedOption == "Republique du Congo" ?
                            <Text style={styles.iconStyle}>+242 |</Text>
                            :
                            selectedOption == "Senegal" ?
                                <Text style={styles.iconStyle}>+221 |</Text> :
                                <Icon name="phone" size={15} color="grey" style={styles.iconStyle} />
                        }
                        <TextInput
                            style={styles.input}
                            placeholder="Telephone du destinateur"
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            value={numero}
                            onChangeText={setNumero}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="money" size={15} color="grey" style={styles.iconStyle} />
                        <TextInput
                            style={styles.input}
                            placeholder="Saisir le montant"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            value={montant}
                            onChangeText={setMontant}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => setSendResumeModal(true)} >
                        <Text style={styles.buttonText}>Envoyer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* ====================================Reumse modale============================================= */}
            <Modal
                coverScreen={true} backdropOpacity={0.3} isVisible={sendResumeModal}
            >
                <View style={styles.modalContainerSend}>
                    <View style={{ backgroundColor: default_color.orange, borderTopEndRadius: 10, borderTopStartRadius: 10, paddingTop: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10, fontWeight: 'bold', color: 'white' }}>Resumer de l'operation</Text>
                    </View>
                    <View style={styles.modalContentSend}>
                        <Text style={{ fontSize: 19, color: 'rgba(16,17,17,0.84)', fontWeight: 'bold' }}>Pays: {selectedOption}</Text>
                        <Text style={{ fontSize: 19, color: 'grargba(16,17,17,0.84)', fontWeight: 'bold' }}>Beneficiare : GOTENI</Text>
                        <Text style={{ fontSize: 19, color: 'grargba(16,17,17,0.84)', fontWeight: 'bold' }}>Numero : {numero}</Text>
                        <Text style={{ marginBottom: 19, fontSize: 20, color: 'rgba(16,17,17,0.84)', fontWeight: 'bold' }}>Montant : {montant}</Text>
                        <View style={{
                            display: "flex", flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: 'gray'
                            , paddingTop: 10
                        }}>
                            <TouchableOpacity style={styles.buttonRetour} onPress={() => setSendResumeModal(false)} >
                                <Text style={styles.buttonTextAnnul}>Retour</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonEnvoie} onPress={handlePress} disabled={isLoading} >
                                <Text style={styles.buttonText}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* =================================Chargement modal============================== */}
            <Modal
                coverScreen={true} backdropOpacity={0.3} isVisible={isLoading}
            >
                <View style={styles.modalContainerChargement}>
                    <View style={styles.modalContentChargement}>
                        {/* <Image
                            source={require("../../assets/images/charger.gif")}
                            style={{ width: 200, height: 200 }} /> */}
                        <ActivityIndicator size={100} color={default_color.orange} animating={isLoading} />
                    </View>
                </View>
            </Modal>
            {/* =================================Verifie modal============================== */}
            <Modal isVisible={sendMoney} coverScreen={true} backdropOpacity={0.4} onBackdropPress={() => setSendMoney(false)}>
                <LinearGradient
                    colors={['rgba(6,119,52,1)', 'transparent']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.9 }}
                    style={styles.modalContainer}
                >
                    <View style={styles.checkmarkContainer}>
                        <View style={styles.checkmark}>
                            <Icon name="check-circle" size={100} color='rgba(255,255,255,0.84)' />
                        </View>
                    </View>
                    <Text style={styles.modalText2}>
                        Transfert effectue avec success
                    </Text>
                </LinearGradient>
            </Modal>

            <Modal isVisible={notSendMoney} coverScreen={true} backdropOpacity={0.4} onBackdropPress={() => setNotSendMoney(false)}>
                <LinearGradient
                    colors={[default_color.red, 'transparent']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.9 }}
                    style={styles.modalContainer}
                >
                    <View style={styles.checkmarkContainer}>
                        <View style={styles.checkmark}>
                            <Icon name="exclamation-circle" size={100} color='rgba(255,255,255,0.84)' />
                        </View>
                    </View>
                    <Text style={styles.modalText3}>
                        Oups une erreur est arrivee, veillez recommencer
                    </Text>
                </LinearGradient>
            </Modal>
            {/* =======================Crediter modal===================================== */}
            <Modal
                isVisible={crediterModal}
                onBackdropPress={toggleCrediterModal} // Cela fermera le modal lorsqu'on touche à l'extérieur
                swipeDirection="down" // Permet de fermer le modal en swipant vers le bas
                style={styles.modal}
                backdropOpacity={0.1}
                statusBarTranslucent={false}
            >
                <View style={styles.modalContent}>
                    <Text style={{ fontSize: 23, paddingBottom: 30, fontWeight: 'bold', color: 'gray' }}>Retirer de l'argent</Text>
                    {verifPass ?

                        <>
                            <View style={styles.inputContainer}>
                                <Icon name="money" size={15} color="grey" style={styles.iconStyle} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Saisir le montant"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    value={montantRetrait}
                                    onChangeText={setMontantRetrait}
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => setVeerifPass(false)} >
                                <Text style={styles.buttonText}>Valider</Text>
                            </TouchableOpacity>
                        </>

                        :
                        <>
                            <View style={styles.inputContainer}>
                                <Icon name="lock" size={20} color="grey" style={styles.iconStyle} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mot de passe"
                                    secureTextEntry={!passwordVisible}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                >
                                    <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <TouchableOpacity style={styles.buttonAnnul} onPress={() => setVeerifPass(true)} >
                                    <Text style={styles.buttonTextAnnul}>Retour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonRetirer} onPress={() => setVeerifPass(false)} >
                                    <Text style={styles.buttonText}>Retirer</Text>
                                </TouchableOpacity>
                            </View>

                        </>

                    }


                </View>
            </Modal>
            <Modal
                isVisible={retraitModal}
                onBackdropPress={toggleRetraitModal} // Cela fermera le modal lorsqu'on touche à l'extérieur
                swipeDirection="down" // Permet de fermer le modal en swipant vers le bas
                style={styles.modal}
                backdropOpacity={0.1}
                statusBarTranslucent={false}
            >
                <View style={styles.modalContent}>

                    {
                        choixpayement == "" ?
                            <>
                                <Text style={{ fontSize: 17, paddingBottom: 20, fontWeight: 'bold', color: 'gray', textAlign: 'center' }}>Choissez votre moyen de paiement</Text>
                                <View style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                                    <TouchableOpacity onPress={() => setChoixPayement("mtn")}>
                                        <Image
                                            source={require("../../assets/images/mtn.png")}
                                            style={{ width: 100, height: 70, borderRadius: 10 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={showMessage} >
                                        <Image
                                            source={require("../../assets/images/airtel.png")}
                                            style={{ width: 100, height: 70, borderRadius: 10 }} />
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            choixpayement == "mtn" ?
                                <>
                                    <Text style={{ fontSize: 17, paddingBottom: 20, fontWeight: 'bold', color: 'gray', textAlign: 'center' }}>Effectuez un depot</Text>
                                    <Text style={{ fontSize: 13, paddingBottom: 20, fontWeight: 'bold', color: 'gray', textAlign: 'center' }}>
                                        Assurez-vous d'avoir un compte au préalable avec le même numéro de téléphone ou la transaction sera impossible.
                                    </Text>
                                    <View style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                                        <View style={styles.inputContainer}>
                                            <Icon name="money" size={15} color="grey" style={styles.iconStyle} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Saisir le montant"
                                                keyboardType="numeric"
                                                autoCapitalize="none"
                                                value={montantCrediter}
                                                onChangeText={setMontantCrediter}
                                            />
                                        </View>

                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                        <TouchableOpacity style={styles.buttonAnnul} onPress={() => setChoixPayement("")} >
                                            <Text style={styles.buttonTextAnnul}>Retour</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonRetirer} onPress={() => setVeerifPass(false)} >
                                            <Text style={styles.buttonText}>Valider</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <>

                                </>
                    }


                    <View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_logo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 30,
        width: "100%",
    },
    welcomMessage: {
        // fontFamily: "PlayfairDisplay_400Regular",
        color: "white",
        fontSize: 15,
    },
    icon: {
        fontSize: 70,
        fontWeight: "bold",
        color: "white",
    },
    image: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        borderBottomLeftRadius: 70,
    },
    container_image: {
        flex: 0.6,
        justifyContent: "flex-start",
        alignItems: "center",
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
        width: "100%",
        backgroundColor: "white",
        // bottom: -30,
        marginTop: 30,
        borderRadius: 20,
        elevation: 5, // pour Android
        shadowColor: "#000", // pour iOS
        shadowOffset: { width: 0, height: 2 }, // pour iOS
        display: "flex",
    },
    basBarShow: {
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: 10,
        backgroundColor: "gray",
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
        height: "40%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    optionContainer: {
        width: "100%",
        marginTop: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconShowbar: {
        backgroundColor: "white",
        borderRadius: 100,
        padding: 25,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
    },
    iconShowbarTransaction: {
        marginRight: 10,
        backgroundColor: "white",
        borderRadius: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: 10,
        paddingHorizontal: 13,
        // paddingVertical: 2,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
    },
    textShowbar: {
        color: "white",
        fontSize: 15,
        // fontFamily: "PlayfairDisplay_400Regular",
    },
    option: {
        display: "flex",
        alignItems: "center",
    },
    transaction: {
        flex: 0.4,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    transcationTexte: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    transactionPillule: {
        justifyContent: "center",
        display: "flex",
        // padding:1,
        backgroundColor: "gray",
        borderRadius: 20,
    },
    transcationListe: {
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.3,
        borderColor: "#ccc",
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        // padding: 8
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 7,
        paddingVertical: 17
    },
    iconStyle: {
        paddingHorizontal: 10,
        color: 'grey'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 7,
        width: "100%"
    },
    input: {
        flex: 1,
        height: 55,
        // paddingHorizontal: 10,
        // fontFamily: 'Pacifico_400Regular',
    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 7,
        width: "100%"
    },
    buttonRetirer: {
        backgroundColor: default_color.orange,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 7,
        width: "50%"
    },
    buttonAnnul: {
        marginVertical: 2,
        backgroundColor: "transparent",
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 7,
        width: "25%",
        borderWidth: 0.5
    },
    buttonEnvoie: {
        backgroundColor: default_color.orange,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 7,
        width: "50%",
    },
    buttonRetour: {
        backgroundColor: 'white',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 7,
        width: "30%",
        borderWidth: 0.5,
    },
    buttonTextAnnul: {
        color: 'gray',
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: 'center',
        // fontFamily: 'Pacifico_400Regular',
    },
    buttonText: {
        color: default_color.white,
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: 'center'
        // fontFamily: 'Pacifico_400Regular',
    },

    modalContentSend: {
        backgroundColor: 'white',
        padding: 23,
        borderRadius: 10,
    },

    modalContainerSend: {
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 20,
    },

    modalContainerChargement: {
        backgroundColor: 'transparent',
        // borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalContentChargement: {
        backgroundColor: 'transparent',
        // padding: 23,
        // borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalContainer: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 20,
    },

    checkmarkContainer: {
        backgroundColor: 'transparent',
        width: 100,
        height: 100,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
    },
    checkmark: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText2: {
        fontSize: 15,
        marginBottom: 1,
        textAlign: 'center',
        // color: 'rgba(6,119,52,0.41)',
        color: 'white',
        fontWeight: 'bold'

    },
    modalText3: {
        fontSize: 15,
        marginBottom: 1,
        textAlign: 'center',
        color: 'white',
        // color: 'rgba(124,23,31,0.55)',
        fontWeight: 'bold'
    },
    eyeIcon: {
        padding: 10,
    },

});

export default DashBoardScreen;
