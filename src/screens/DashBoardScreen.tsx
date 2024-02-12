import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Roboto_700Bold, Roboto_100Thin, Roboto_400Regular } from "@expo-google-fonts/roboto";
import CustomModalPicker from "../components/CustomModalPicker";
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_300Light,
    RobotoSerif_100Thin,
    useFonts,
} from "@expo-google-fonts/roboto-serif";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useCallback, useMemo, useRef } from "react";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from '@gorhom/bottom-sheet';
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

const dataListe = [
    {
        id: 1,
        name: "Levi Goteni",
        heure: "13:15",
        montant: '1200',
        flag: 'cg'
    },
    {
        id: 2,
        name: "Chris N'gakosso",
        heure: "17:55",
        montant: '30000',
        flag: 'sn'

    },
    {
        id: 3,
        name: "Mik Divin",
        heure: "20:18",
        montant: '400',
        flag: 'cg'
    },
    {
        id: 4,
        name: "Paul Mboungou",
        heure: "22:45",
        montant: '5600',
        flag: 'sn'
    },
    {
        id: 5,
        name: "Delice Kissangou",
        heure: "00:05",
        montant: '400',
        flag: 'cg'
    },
    {
        id: 6,
        name: "Gomez Itoua",
        heure: "12:19",
        montant: '1300',
        flag: 'sn'
    }
]

const DashBoardScreen = ({ navigation }) => {

    // Send Money 
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // variables
    const snapPoints = useMemo(() => ['28%', '60%'], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        // handleCloseModalPressRetirer()
        // handleCloseModalPressCrediter()
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);
    // ====================Retirer de l'argent ====================//

    // ref
    const bottomSheetModalRefRetirer = useRef<BottomSheetModal>(null);
    // variables
    const snapPointsRetirer = useMemo(() => ['28%', '60%'], []);
    // callbacks
    const handlePresentModalPressRetirer = useCallback(() => {
        // handleCloseModalPress()
        // handleCloseModalPressCrediter()
        bottomSheetModalRefRetirer.current?.present();
    }, []);

    const handleSheetChangesRetirer = useCallback((index: number) => {
    }, []);

    const handleCloseModalPressRetirer = useCallback(() => {
        bottomSheetModalRefRetirer.current?.close();
    }, []);
    // ====================Crediter de l'argent ====================//

    // ref
    const bottomSheetModalRefCrediter = useRef<BottomSheetModal>(null);
    // variables
    const snapPointsCrediter = useMemo(() => ['28%', '60%'], []);
    // callbacks
    const handlePresentModalPressCrediter = useCallback(() => {
        // handleCloseModalPressRetirer()
        // handleCloseModalPress()
        bottomSheetModalRefCrediter.current?.present();
    }, []);

    const handleSheetChangesCrediter = useCallback((index: number) => {
    }, []);

    const handleCloseModalPressCrediter = useCallback(() => {
        bottomSheetModalRefCrediter.current?.close();
    }, []);
    // =================Chargement============================
    const [isLoading, setIsLoading] = useState(false);
    // =======================================================
    // ================Verify send money======================
    const [sendMoney, setSendMoney] = useState(false);
    const [notSendMoney, setNotSendMoney] = useState(false);
    // ======================================================
    const [soldeVisible, setSoldeVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [modalVisible, setModalVisible2] = useState(false);
    const [sendResumeModal, setSendResumeModal] = useState(false)
    // ==================Send money===================================
    const [solde, setSolde] = useState('1245192');
    const [numero, setNumero] = useState('');
    const [montant, setMontant] = useState('500');
    const [montantRetrait, setMontantRetrait] = useState('500');
    const [montantCrediter, setMontantCrediter] = useState('500');
    const [choixpayement, setChoixPayement] = useState("");
    // ================================================================

    const [verifPass, setVeerifPass] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false);


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
        Roboto_100Thin,
        Roboto_400Regular,
        RobotoSerif_700Bold,
        RobotoSerif_300Light,
        RobotoSerif_100Thin,

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
            if (randomTrueOrFalse()) {
                setSendResumeModal(false)
                setIsLoading(false);
                handleCloseModalPress()
                setSendMoney(true)
            } else {
                setSendResumeModal(false)
                setIsLoading(false);
                handleCloseModalPress()
                setNotSendMoney(true)
            }
        }, 2000); // Temps de délai simulé pour la réponse de l'API (2 secondes)
    };


    return (
        <BottomSheetModalProvider>
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
                            <Icon name="user" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.welcomMessage}>Bienvenue sur Tasa wallet</Text>
                        <TouchableOpacity>
                            <Icon name="sign-out" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.barShow}>
                        <View style={styles.hautBarShow}>
                            <View style={styles.hautBarShowBalance}>
                                <Text
                                    style={{
                                        fontFamily: 'RobotoSerif_400Regular',

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
                                        fontFamily: 'RobotoSerif_400Regular',

                                        color: "white",
                                    }}
                                >
                                    18/2023
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'RobotoSerif_400Regular',
                                        color: "white",
                                    }}
                                >
                                    Levi Goteni
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontFamily: 'RobotoSerif_400Regular',

                                    color: "white",
                                }}
                            >
                                Congo
                            </Text>
                        </View>
                    </View>
                    <View style={styles.optionContainer}>
                        <View style={styles.option}>
                            <TouchableOpacity style={styles.iconShowbar} onPress={handlePresentModalPress}>
                                <Icon name="send" size={25} color="gray" />
                            </TouchableOpacity>
                            <Text style={styles.textShowbar}>Envoyer</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity style={styles.iconShowbar} onPress={handlePresentModalPressRetirer}>
                                <Icon name="money" size={25} color="gray" />
                            </TouchableOpacity>
                            <Text style={styles.textShowbar}>Retirer</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity style={styles.iconShowbar} onPress={handlePresentModalPressCrediter}>
                                <View style={{ paddingHorizontal: 2.4 }}>
                                    <Icon name="plus" size={25} color="gray" />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textShowbar}>Crediter</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.transaction}>
                    <View style={styles.transcationTexte}>
                        <Text
                            style={{ fontSize: 12, fontFamily: "RobotoSerif_100Thin" }}
                        >
                            Transactions
                        </Text>
                        <View style={styles.transactionPillule}>
                            <Text
                                style={{
                                    fontFamily: "RobotoSerif_100Thin",
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
                        {
                            dataListe.map((item) => (

                                <View style={styles.transcationListe} key={item.id}>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginBottom: 10,
                                        }}
                                    >
                                        <TouchableOpacity style={styles.iconShowbarTransaction}>
                                            <Icon name="user-circle" size={40} color="gray" />
                                        </TouchableOpacity>
                                        <View
                                            style={{ display: "flex", justifyContent: "space-between" }}
                                        >
                                            <Text
                                                style={{
                                                    color: "gray",
                                                    fontFamily: "RobotoSerif_400Regular",
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: "gray",
                                                    fontFamily: "RobotoSerif_100Thin",

                                                }}
                                            >
                                                {item.heure} PM
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'right' }}>
                                            {flag(item.flag)}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "gray",
                                                fontFamily: "RobotoSerif_100Thin",

                                            }}
                                        >
                                            {item.montant} Fcfa
                                        </Text>
                                    </View>
                                </View>

                            ))
                        }

                    </ScrollView>
                </View>
                {/* ====================================Reumse modale============================================= */}
                <Modal
                    coverScreen={true} backdropOpacity={0.3} isVisible={sendResumeModal} animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <View style={styles.modalContainerSend}>
                        <View style={{ backgroundColor: default_color.orange, borderTopEndRadius: 10, borderTopStartRadius: 10, paddingTop: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontFamily: "Roboto_400Regular" }}>Resumer de l'operation</Text>
                        </View>
                        <View style={styles.modalContentSend}>
                            <Text style={{ fontSize: 19, color: 'rgba(16,17,17,0.84)', fontFamily: "Roboto_400Regular" }}>Pays: {selectedOption}</Text>
                            <Text style={{ fontSize: 19, color: 'rgba(16,17,17,0.84)', fontFamily: "Roboto_400Regular" }}>Beneficiare : GOTENI</Text>
                            <Text style={{ fontSize: 19, color: 'rgba(16,17,17,0.84)', fontFamily: "Roboto_400Regular" }}>Numero : {numero}</Text>
                            <Text style={{ marginBottom: 19, fontSize: 20, color: 'rgba(16,17,17,0.84)', fontFamily: "Roboto_400Regular" }}>Montant : {montant}</Text>
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
                    coverScreen={true} backdropOpacity={0.3} isVisible={isLoading} animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
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
                <Modal isVisible={sendMoney}
                    coverScreen={true}
                    backdropOpacity={0.4}
                    onBackdropPress={() => setSendMoney(false)}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <LinearGradient
                        colors={['white', 'gray']}
                        start={{ x: 0.8, y: 0 }}
                        end={{ x: 0.8, y: 9 }}
                        style={styles.modalContainer}
                    >
                        <View style={styles.checkmarkContainer}>
                            <View style={styles.checkmark}>
                                <Icon name="check-circle" size={100} color='#00b33c' />
                            </View>
                        </View>
                        <Text style={styles.modalText2}>
                            Transfert effectue avec success
                        </Text>
                    </LinearGradient>
                </Modal>

                <Modal isVisible={notSendMoney}
                    coverScreen={true}
                    backdropOpacity={0.4}
                    onBackdropPress={() => setNotSendMoney(false)}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <LinearGradient
                        colors={['white', 'gray']}
                        start={{ x: 0.8, y: 0 }}
                        end={{ x: 0.8, y: 9 }}
                        style={styles.modalContainer}
                    >
                        <View style={styles.checkmarkContainer}>
                            <View style={styles.checkmark}>
                                <Icon name="exclamation-circle" size={100} color='#bf1717' />
                            </View>
                        </View>
                        <Text style={styles.modalText3}>
                            Oups une erreur est arrivee, veillez recommencer
                        </Text>
                    </LinearGradient>
                </Modal>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetScrollView >
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 17, paddingBottom: 20, color: 'black', fontFamily: "Roboto_400Regular", }}>ENVOYER DE L'ARGENT</Text>
                        <View style={styles.inputContainer2}>
                            {selectedOption == "" ?
                                <Icon name="globe" size={15} color="grey" style={styles.iconStyle} />
                                :
                                selectedOption == "Republique du Congo" ?
                                    <Text style={styles.iconStyle}>{flag('cg')}</Text> :
                                    <Text style={styles.iconStyle}>{flag('sn')}</Text>
                            }
                            <TouchableOpacity onPress={() => setModalVisible2(true)} style={{ width: "88%" }}>
                                {selectedOption == "" ? (<Text style={{ color: 'grey', fontFamily: 'Roboto_400Regular' }}>Pays de residence</Text>) : <Text>{selectedOption}</Text>}
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
                </BottomSheetScrollView>
            </BottomSheetModal>
            {/* ==========================Fin Envoie l'argent=========================================== */}

            {/* ==========================Retirer l'argent=========================================== */}
            <BottomSheetModal
                ref={bottomSheetModalRefRetirer}
                index={1}
                snapPoints={snapPointsRetirer}
                onChange={handleSheetChangesRetirer}
            >
                <View style={styles.modalContent}>
                    <Text style={{ fontSize: 17, paddingBottom: 20, color: 'black', fontFamily: "Roboto_400Regular", }}>RETIRER DE L'ARGENT</Text>
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
            </BottomSheetModal>
            {/* ==========================Fin Retirer l'argent=========================================== */}
            {/* ==========================Crediter  l'argent=========================================== */}

            <BottomSheetModal
                ref={bottomSheetModalRefCrediter}
                index={1}
                snapPoints={snapPointsCrediter}
                onChange={handleSheetChangesCrediter}
            >
                <View style={styles.modalContent}>

                    {
                        choixpayement == "" ?
                            <>
                                <Text style={{ fontSize: 13, paddingBottom: 20, color: 'black', fontFamily: "Roboto_400Regular", }}>CHOISISSEZ VOTRE MOYEN DE PAYEMENT</Text>
                                <View style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                                    <TouchableOpacity onPress={() => setChoixPayement("mtn")}>
                                        <Image
                                            source={require("../../assets/images/mtn.png")}
                                            style={{ width: 100, height: 70, borderRadius: 10 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity  >
                                        <Image
                                            source={require("../../assets/images/airtel.png")}
                                            style={{ width: 100, height: 70, borderRadius: 10 }} />
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            choixpayement == "mtn" ?
                                <>
                                    <Text style={{ fontSize: 17, paddingBottom: 10, color: 'black', fontFamily: "Roboto_400Regular", }}>EFFECTUEZ UN DEPOT</Text>
                                    <Text style={{ fontSize: 16, paddingBottom: 20, fontWeight: 'bold', color: 'black', textAlign: 'center', fontFamily: "Roboto_400Regular" }}>
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
            </BottomSheetModal>
            {/* ==========================fin Crediter  l'argent=========================================== */}


        </BottomSheetModalProvider>

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
        alignItems: "center",
        paddingTop: 30,
        width: "100%",
    },
    welcomMessage: {
        fontFamily: "RobotoSerif_400Regular",
        color: "white",
        fontSize: 13,
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
        // flex: 0.6,
        height: '53%',
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        // backgroundColor: default_color.orange,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        // paddingBottom: 230
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
        marginTop: 20,
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconShowbar: {
        backgroundColor: "white",
        borderRadius: 100,
        padding: 22,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
    },
    iconShowbarTransaction: {
        marginRight: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textShowbar: {
        color: "white",
        fontSize: 15,
        fontFamily: "RobotoSerif_100Thin",
    },
    option: {
        display: "flex",
        alignItems: "center",
    },
    transaction: {
        // flex: 0.5,
        height: '49%',
        paddingTop: 10,
        // paddingHorizontal: 20,
    },
    transcationTexte: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,

    },
    transactionPillule: {
        justifyContent: "center",
        display: "flex",
        backgroundColor: "gray",
        borderRadius: 20,
        alignItems: 'center'
    },
    transcationListe: {
        marginTop: 10,
        // marginBottom: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.3,
        borderColor: "#ccc",
        marginHorizontal: 20,

    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        // padding: 8
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 20,
        marginBottom: 20,
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
        fontFamily: 'Roboto_400Regular',
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
        fontFamily: 'Roboto_400Regular',

    },
    buttonTextAnnul: {
        color: 'gray',
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: 'center',
        fontFamily: 'Roboto_400Regular',
    },
    buttonText: {
        color: default_color.white,
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: 'center',
        fontFamily: 'Roboto_400Regular',
    },
    modalContentSend: {
        backgroundColor: 'white',
        padding: 23,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    modalContainerSend: {
        backgroundColor: 'white.orange',
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
        color: '#00b33c',
        // color: 'white',
        fontWeight: 'bold'

    },
    modalText3: {
        fontSize: 15,
        marginBottom: 1,
        textAlign: 'center',
        color: '#bf1717',
        // color: 'rgba(124,23,31,0.55)',
        fontWeight: 'bold'
    },
    eyeIcon: {
        padding: 10,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

});

export default DashBoardScreen;
