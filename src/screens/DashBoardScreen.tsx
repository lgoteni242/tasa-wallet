import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import {
    Roboto_700Bold,
    Roboto_100Thin,
    Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import CustomModalPicker from "../components/CustomModalPicker";
import {
    RobotoSerif_400Regular,
    RobotoSerif_700Bold,
    RobotoSerif_300Light,
    RobotoSerif_100Thin,
    useFonts,
} from "@expo-google-fonts/roboto-serif";
import { LinearGradient } from "expo-linear-gradient";
import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
} from "react";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    FlatList,
    ToastAndroid,
} from "react-native";
import default_color from "../styles/color";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "../store/actions/authActions";
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import OTPTextInput from "react-native-otp-textinput";
import * as SecureStore from "expo-secure-store";
import UserSkeletonLoader from "../components/Skeleton/UserSkeletonLoader";
import Loader1 from '../components/Loader1';
import LottieView from 'lottie-react-native';



const DashBoardScreen = ({ navigation }: { navigation: any }) => {

    const historique = async (mois: any, jour: any, annee: any, token: string) => {
        setIsLoadingHistorique(true)
        try {
            const params = {
                day: jour,
                month: mois,
                year: annee,
                token: token
            };
            const response = await axios.get(
                'https://walet.tasa.pro/api/history',
                {
                    params: params,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            // Traiter la réponse ici
            const data = response.data.datas;
            setdataListe(data);
            setIsLoadingHistorique(false)
            // return data; // Vous pouvez retourner les données ici si nécessaire
        } catch (error) {
            // Gérer les erreurs ici
            console.error('Erreur lors de la récupération des données:', error);
            setIsLoading(false); // Assurez-vous de réinitialiser isLoading en cas d'erreur
            setIsLoadingHistorique(false)
            throw error;
        } finally {
            setIsLoadingHistorique(false)
        }
    };
    // =================Recharge du compte====================
    const [optOrangeRecharge, setOptOrangeRecharge] = useState('')
    const [montantRechargeOrange, setMontantRechargeOrange] = useState('')
    const [modeEnvoi, setModeEnvoi] = useState('')

    // =================Chargement============================
    const user = useSelector((state: any) => state.auth.user);
    const mode = useSelector((state: any) => state.auth.mode);
    const pourcentage = useSelector((state: any) => state.auth.pourcentage);


    const token = useSelector((state) => state.auth.token);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isCodeAcces = useSelector((state) => state.auth.isCodeAcces);
    const [dataListe, setdataListe] = useState([])

    const otpInputRef = useRef(null);
    const [showOpt, setShowOpt] = useState(false);
    const [showOptRetirer, setShowOptRetirer] = useState(false);
    const [optCode, setOptCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistorique, setIsLoadingHistorique] = useState(false);
    const [deconnexionConf, setDeconnexionConf] = useState(false);
    // =======================================================
    // ================Verify send money======================
    const [sendMoney, setSendMoney] = useState(false);
    const [notSendMoney, setNotSendMoney] = useState(false);
    // ======================================================
    const [soldeVisible, setSoldeVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionPaiement, setSelectedOptionPaiement] = useState("");
    const [selectedOptionSenegal, setSelectedOptionSenegal] = useState("");
    const [modalVisible, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [sendResumeModal, setSendResumeModal] = useState(false);
    // ==================Send money===================================
    // const [solde, setSolde] = useState(user.balance);
    const [numero, setNumero] = useState("");
    const [montant, setMontant] = useState("");
    const [montantRetrait, setMontantRetrait] = useState("");
    const [montantCrediter, setMontantCrediter] = useState("");
    const [choixpayement, setChoixPayement] = useState("");
    // ================================================================

    const [verifPass, setVeerifPass] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [codePays, setCodePays] = useState("");
    const [modalClock, setModalClock] = useState(true);
    const [optionCrediter, setOptionCrediter] = useState([])
    const animation = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);


    const pourcentageEnvoi = pourcentage[0].cost
    const pourcentageRetrait = pourcentage[0].cost_retrait


    const fraisEnvoi = (parseInt(montant, 10) * pourcentageEnvoi) / 100
    const fraisRetrait = (parseInt(montantRetrait, 10) * pourcentageRetrait) / 100

    console.log(typeof pourcentageEnvoi)

    const coutEnvoie = fraisEnvoi + parseInt(montant, 10)
    const coutRetrait = fraisRetrait + parseInt(montantRetrait, 10)


    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout()); // Déclencher la déconnexion en dispatchant l'action logout
        setDeconnexionConf(false);
        // Rediriger l'utilisateur vers l'écran de connexion ou la page d'accueil
        navigation.replace("Home");
    };

    const handleLogout2 = () => {
        navigation.replace("Home");
    };

    // useEffect(() => {
    //     if (isLoggedIn == false) {
    //         handleLogout2()
    //     }
    // }, [isLoggedIn])

    // Send Money
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // variables
    const snapPoints = useMemo(() => ["17%", "62%", "80%"], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        // handleCloseModalPressRetirer()
        // handleCloseModalPressCrediter()
        if (user) {
            if (!user.etat) {
                bottomSheetModalRef.current?.present();
            } else {
                bottomSheetModalRef.current?.present();

                // console.error('ddd')
            }
        }
    }, []);

    const handleSheetChanges = useCallback((index: number) => { }, []);

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);
    // ====================Retirer de l'argent ====================//

    // ref
    const bottomSheetModalRefRetirer = useRef<BottomSheetModal>(null);
    // variables
    const snapPointsRetirer = useMemo(() => ["17%", "62%", "80%"], []);
    // callbacks
    const handlePresentModalPressRetirer = useCallback(() => {
        // handleCloseModalPress()
        // handleCloseModalPressCrediter()
        if (user) {
            if (!user.etat) {
                bottomSheetModalRefRetirer.current?.present();
            } else {
                bottomSheetModalRefRetirer.current?.present();
                // navigation.navigate("Kyc")
            }
        }
    }, []);

    const handleSheetChangesRetirer = useCallback((index: number) => { }, []);

    const handleCloseModalPressRetirer = useCallback(() => {
        bottomSheetModalRefRetirer.current?.close();
    }, []);
    // ====================Crediter de l'argent ====================//

    // ref
    const bottomSheetModalRefCrediter = useRef<BottomSheetModal>(null);
    // variables
    const snapPointsCrediter = useMemo(() => ["17%", "62%", "80%"], []);
    // callbacks
    const handlePresentModalPressCrediter = useCallback(() => {
        // handleCloseModalPressRetirer()
        // handleCloseModalPress()
        if (user) {
            if (!user.etat) {
                bottomSheetModalRefCrediter.current?.present();
            } else {
                // navigation.navigate('Kyc')
                bottomSheetModalRefCrediter.current?.present();
            }
        }
    }, []);

    const handleSheetChangesCrediter = useCallback((index: number) => { }, []);

    const handleCloseModalPressCrediter = useCallback(() => {
        bottomSheetModalRefCrediter.current?.close();
    }, []);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
    const day = date.getDate();
    const formattedDate = `${day}/${month}/${year}`;

    const options = [
        {
            label: "Republique du Congo",
            value: 242,
            flag: "cg",
        },
        {
            label: "Senegal",
            value: 221,
            flag: "sn",
        },
    ];

    const optionPaiment = [
        {
            label: "Orange",
            // value: 242,
            // flag: "cg",
        },
        {
            label: "Wave",
            // value: 221,
            // flag: "sn",
        },
    ];

    function randomTrueOrFalse() {
        return Math.random() < 0.5;
    }

    // const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));
    const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt(0)));


    // Utilise useEffect pour charger les transactions initiales lors de la connexion
    useEffect(() => {
        historique(month, day, year, token);
    }, []);


    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
        if (option == "Republique du Congo") {
            setCodePays("CG");
        } else {
            setCodePays("SN");
        }
    };

    const handleSelectPaiement = (option: React.SetStateAction<string>) => {
        setSelectedOptionPaiement(option);

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
        return <Modal
            coverScreen={fontsLoaded}
            backdropOpacity={0.3}
            isVisible={isLoading}
            animationIn="fadeIn" // Animation d'entrée du haut
            animationOut="fadeOut"
        >
            <View style={styles.modalContainerChargement}>
                <View style={styles.modalContentChargement}>
                    {/* <Image
                    source={require("../../assets/images/charger.gif")}
                    style={{ width: 200, height: 200 }} /> */}
                    <ActivityIndicator
                        size={100}
                        color={default_color.orange}
                        animating={isLoading}
                    />
                </View>
            </View>
        </Modal>;
    }

    const handleSend = () => {
        setIsLoading(true);
        const checkData = async () => {
            (async () => {
                try {
                    await axios.get("https://walet.tasa.pro/api/otp", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setSendResumeModal(false);
                    setIsLoading(false);
                    handleCloseModalPress();
                    setShowOpt(true);
                } catch (error) {
                    console.log("levi goteni verification", error);
                } finally {
                    setIsLoading(false);

                }
            })();
        };
        checkData();
    };

    const handleSendVerif = () => {
        setIsLoading(true);
        const sendMoney = async () => {
            (async () => {
                try {
                    await axios.post(
                        "https://walet.tasa.pro/api/sendmoney",
                        {
                            country_code: codePays,
                            phone: numero,
                            montant: montant,
                            code_otp: optCode,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setIsLoading(false);
                    setShowOpt(false);
                    setSendMoney(true);
                } catch (error) {
                    setIsLoading(false);
                    setShowOpt(false);
                    setNotSendMoney(true);
                    // console.error('Argent non envoye', error)
                }
            })();
        };
        sendMoney();
    };

    const handleRetirer = () => {
        setIsLoading(true);
        console.error(montantRetrait, token);
        const sendMoney = async () => {
            (async () => {
                try {
                    await axios.post(
                        "https://walet.tasa.pro/api/withdrawal",
                        {
                            montant: montantRetrait, code_otp: optCode,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setIsLoading(false);
                    handleCloseModalPressCrediter();
                    setSendMoney(true);
                } catch (error) {
                    setIsLoading(false);
                    handleCloseModalPressCrediter();
                    setNotSendMoney(true);
                    // console.error('Argent non envoye', error)
                } finally {
                    setIsLoading(false);
                }
            })();
        };
        sendMoney();
    };

    const handleRetirerOpt = () => {
        setIsLoading(true);
        const checkData = async () => {
            (async () => {
                try {
                    await axios.get("https://walet.tasa.pro/api/otp", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // setSendResumeModal(false);
                    setIsLoading(false);
                    handleCloseModalPressRetirer();
                    setShowOptRetirer(true)
                } catch (error) {
                    console.log("levi goteni verification", error);
                } finally {
                    setIsLoading(false);
                }
            })();
        };
        checkData();
    }

    const handleChoixCretider = (choix: any, operateur: any) => {
        // alert(choix)
        switch (choix) {
            case 'Mtn Momo':
                setModeEnvoi(operateur)
                setChoixPayement('Mtn Momo')
                break;
            case 'Airtel Momo':
                ToastAndroid.show("Service indisponible", ToastAndroid.SHORT);
                break;
            case 'Orange Money':
                setModeEnvoi(operateur)
                setChoixPayement('Orange Money')
                break;
            case 'Wave':
                setModeEnvoi(operateur)
                setChoixPayement('Wave')
                break;
            default:
                break;
        }
    }

    const handleCrediter = () => {
        setIsLoading(true);
        const sendMoney = async () => {
            (async () => {
                try {
                    await axios.post(
                        "https://walet.tasa.pro/api/withdrawal",
                        {
                            mode_id: choixpayement,
                            montant: montantCrediter,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setIsLoading(false);
                    handleCloseModalPressCrediter();
                    setSendMoney(true);
                } catch (error) {
                    setIsLoading(false);
                    // handleCloseModalPressRetirer()
                    setNotSendMoney(true);
                    // console.error('Argent non envoye', error)
                } finally {
                    setIsLoading(false);
                }
            })();
        };
        sendMoney();
    };

    const handleTextChange = (text: any) => {
        setOptCode(text);
    };

    const handleSelectOption = (option: string) => {
        setSelectedOptionSenegal(option);
    };

    const getCodeAccesVerif = async () => {
        return SecureStore.getItemAsync("codeAccesVerif");
    };

    const handleLockModal = () => {
        navigation.navigate("CodeAcces");
        setModalClock(false);
    };

    const handleSendVerifSold = () => {
        if (user.balance <= coutEnvoie) {
            ToastAndroid.show("Vous n'avez pas suffisamment de fonds pour effectuer cet envoi. Veuillez recharger votre compte.", ToastAndroid.SHORT);
        } else {
            setSendResumeModal(true)
        }
    }

    const handleSendVerifSoldRetrait = () => {
        if (user.balance <= coutRetrait) {
            ToastAndroid.show("Votre solde est insuffisant pour ce retrait. Veuillez recharger votre compte.", ToastAndroid.SHORT);
        } else {
            handleRetirerOpt()
        }
    }


    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                {/* <StatusBar barStyle="light-content" /> */}

                <LinearGradient
                    colors={[default_color.orange, default_color.grayColor]}
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 0, y: 0.7 }}
                    style={styles.container_image}
                >
                    <View style={styles.container_logo}>
                        <View style={{ backgroundColor: default_color.secondeRouge, width: '70%', height: 30, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ borderWidth: 3, height: '100%', justifyContent: 'center', alignItems: 'center', width: '30%', borderRadius: 20, borderColor: default_color.secondeRouge, backgroundColor: 'white' }}>
                                <Text style={{ color: 'gray', fontSize: 13, fontFamily: 'Roboto_400Regular' }}>
                                    {user && user.prenom[0]}{user && user.name[0]}
                                </Text>
                            </View>
                            <Text style={{ color: 'white', paddingHorizontal: 6, fontFamily: 'Roboto_400Regular', fontSize: 10 }}>Bienvenu sur tasa wallet</Text>
                            {/* <TouchableOpacity onPress={() => navigation.navigate('Log')}>
                                <Icon name="user" size={18} color="white" />
                            </TouchableOpacity> */}
                        </View>
                        {/* <Text style={styles.welcomMessage}>Tasa wallet</Text> */}
                        <TouchableOpacity
                            onPress={() => setDeconnexionConf(!deconnexionConf)}
                            style={{ padding: 0 }}
                        >
                            <Icon name="sign-out" size={15} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.barShow}>
                        <View style={styles.hautBarShow}>
                            <View style={styles.hautBarShowBalance}>
                                <Text
                                    style={{
                                        fontFamily: "RobotoSerif_400Regular",

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
                                            color: default_color.grayColor,
                                            fontSize: 28,
                                        }}
                                    >
                                        {user && user.balance}
                                    </Text>
                                ) : (
                                    <Text
                                        style={{
                                            fontFamily: "Roboto_700Bold",
                                            color: "gray",
                                            fontSize: 28,
                                        }}
                                    >
                                        XXXXXXX
                                    </Text>
                                )}
                                <TouchableOpacity
                                    onPress={() => setSoldeVisible(!soldeVisible)}
                                >
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
                                        fontFamily: "RobotoSerif_400Regular",

                                        color: "white",
                                    }}
                                >
                                    {formattedDate}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "RobotoSerif_400Regular",
                                        color: "white",
                                    }}
                                >
                                    {user && user.name}

                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontFamily: "RobotoSerif_400Regular",

                                    color: "white",
                                }}
                            >
                                {user && user.country}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.optionContainer}>
                        <View style={styles.option}>
                            <TouchableOpacity
                                style={styles.iconShowbarEnvoyer}
                                onPress={handlePresentModalPress}
                            >
                                <Icon name="send" size={25} color={default_color.grayColor} />
                            </TouchableOpacity>
                            <Text style={styles.textShowbar}>Envoyer</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity
                                style={styles.iconShowbarRetirer}
                                onPress={handlePresentModalPressRetirer}
                            >
                                <Icon name="money" size={25} color={default_color.grayColor} />
                            </TouchableOpacity>
                            <Text style={styles.textShowbar}>Retirer</Text>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity
                                style={styles.iconShowbarCrediter}
                                onPress={handlePresentModalPressCrediter}
                            >
                                <View style={{ paddingHorizontal: 2.4 }}>
                                    <Icon name="plus" size={25} color={default_color.grayColor} />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textShowbar}>Crediter</Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={styles.transaction}>
                    <View style={styles.transcationTexte}>
                        <Text style={{ fontSize: 12, fontFamily: "RobotoSerif_100Thin" }}>
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
                    {isLoadingHistorique ?
                        <>
                            <UserSkeletonLoader />
                            <UserSkeletonLoader />
                            <UserSkeletonLoader />
                            <UserSkeletonLoader />
                            <UserSkeletonLoader />
                        </> :
                        <View
                            style={{ marginBottom: 60 }}
                        >
                            {dataListe.length === 0 ? (
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                                    <Text style={{
                                        textAlign: 'center', marginTop: 20, color: "gray",
                                        fontFamily: "RobotoSerif_400Regular",
                                        fontSize: 16
                                    }}>
                                        Aucune transaction
                                    </Text>
                                </View>

                            ) : (
                                <FlatList
                                    data={dataListe}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => setSelectedItem(item)}
                                        >

                                            <View style={[
                                                styles.transcationListe,
                                                selectedItem === item && { backgroundColor: 'lightgray' } // Mettre en surbrillance si sélectionné
                                            ]}>
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        marginBottom: 10,
                                                        // alignContent: 'center'
                                                    }}
                                                >
                                                    {item.country_recipient ?

                                                        <Text style={{
                                                            fontSize: 20, marginRight: 20,
                                                        }}>
                                                            {flag(item.country_recipient)}
                                                        </Text>
                                                        :
                                                        <Text style={{
                                                            fontSize: 20, marginRight: 20,
                                                        }}>
                                                            {user && flag(user.country_code)}
                                                        </Text>
                                                    }

                                                    <View
                                                        style={{ display: "flex", justifyContent: "space-between" }}
                                                    >
                                                        {item.recipient ?
                                                            <>
                                                                <Text
                                                                    style={{
                                                                        color: default_color.grayColor,
                                                                        fontFamily: "RobotoSerif_400Regular",
                                                                    }}
                                                                >
                                                                    Envoi de {item.montant} F
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        fontFamily: "RobotoSerif_100Thin",
                                                                        fontSize: 10
                                                                    }}
                                                                >

                                                                    vers {item.recipient}
                                                                </Text>
                                                            </>
                                                            :
                                                            <>
                                                                <Text
                                                                    style={{
                                                                        color: default_color.grayColor,
                                                                        fontFamily: "RobotoSerif_400Regular",
                                                                        // fontSize: 20
                                                                    }}
                                                                >
                                                                    Dépot
                                                                    {/* {user && flag(user.country_code)} */}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        fontFamily: "RobotoSerif_100Thin",
                                                                        fontSize: 10,
                                                                        textTransform: 'lowercase'
                                                                    }}
                                                                >

                                                                    via {item.mode_payment}
                                                                </Text>
                                                            </>
                                                        }
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    {/* <Text style={{ textAlign: 'center' }}>
                                                        {item.action == "add" && <Icon name="plus" size={20} color={default_color.green} />}
                                                        {item.action == "minus" && <Icon name="moins" size={20} color={default_color.orange} />}

                                                    </Text> */}
                                                    {item.action == "add" && <Text
                                                        style={{
                                                            color: default_color.green,
                                                            fontFamily: "RobotoSerif_400Regular",
                                                            fontSize: 15,

                                                        }}
                                                    >
                                                        + {item.montant} F
                                                    </Text>}
                                                    {item.action == "minus" && <Text
                                                        style={{
                                                            color: default_color.orange,
                                                            fontFamily: "RobotoSerif_400Regular",
                                                            fontSize: 15,

                                                        }}
                                                    >
                                                        - {item.total} F
                                                    </Text>}

                                                </View>
                                            </View>
                                            {selectedItem === item && (
                                                <>
                                                    {item.action == 'minus' && <View style={styles.detailsContainer}>
                                                        {/* Contenu des détails */}
                                                        <Text style={{ fontFamily: 'RobotoSerif_300Light', fontSize: 12, color: 'gray' }}>Montant : {item.montant}</Text>

                                                        <Text style={{ fontFamily: 'RobotoSerif_300Light', fontSize: 12, color: 'gray' }}>Frais : {item.cost}</Text>
                                                        <Text style={{ fontFamily: 'RobotoSerif_300Light', fontSize: 12, color: 'gray' }}>Total : {item.total}</Text>
                                                    </View>}

                                                    {item.action == 'add' && <View style={styles.detailsContainer}>
                                                        {/* Contenu des détails */}
                                                        <Text style={{ fontFamily: 'RobotoSerif_300Light', fontSize: 12, color: 'gray' }}>Solde avant : {item.balance_before}</Text>
                                                        <Text style={{ fontFamily: 'RobotoSerif_300Light', fontSize: 12, color: 'gray' }}>Solde après : {item.balance_after}</Text>
                                                    </View>}

                                                </>

                                            )}
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    showsVerticalScrollIndicator={false}
                                />
                            )}
                        </View>
                    }

                </View>
                {/*  =============================OTP CODE=============================== */}

                <Modal
                    coverScreen={true}
                    backdropOpacity={0.3}
                    isVisible={showOpt}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <View style={styles.modalContainerSend}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderTopEndRadius: 10,
                                borderTopStartRadius: 10,
                                paddingTop: 5,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 18,
                                    paddingBottom: 10,
                                    marginBottom: 5,
                                    color: "black",
                                    fontFamily: "RobotoSerif_400Regular",
                                    borderBottomWidth: 0.5
                                }}
                            >
                                Saisir le code reçu par sms
                            </Text>
                        </View>
                        <View style={styles.modalContentSend}>
                            <OTPTextInput
                                ref={otpInputRef}
                                containerStyle={styles.textInputContainer}
                                textInputStyle={styles.roundedTextInput}
                                handleTextChange={handleTextChange}
                                inputCount={4}
                                keyboardType="numeric"
                                tintColor={default_color.orange}
                            />
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingTop: 20,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonRetourDec2}
                                    onPress={() => {
                                        setShowOpt(false);
                                    }}
                                >
                                    <Text style={styles.buttonTextAnnul}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonEnvoieDec}
                                    onPress={() => {
                                        handleSendVerif();
                                    }}
                                >
                                    <Text style={styles.buttonText}>Envoyer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    coverScreen={true}
                    backdropOpacity={0.3}
                    isVisible={showOptRetirer}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <View style={styles.modalContainerSend}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderTopEndRadius: 10,
                                borderTopStartRadius: 10,
                                paddingTop: 5,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 18,
                                    paddingBottom: 10,
                                    marginBottom: 5,
                                    color: "black",
                                    fontFamily: "RobotoSerif_400Regular",
                                    borderBottomWidth: 0.5
                                }}
                            >
                                Saisir le code reçu par sms.
                            </Text>
                        </View>
                        <View style={styles.modalContentSend}>
                            <OTPTextInput
                                ref={otpInputRef}
                                containerStyle={styles.textInputContainer}
                                textInputStyle={styles.roundedTextInput}
                                handleTextChange={handleTextChange}
                                inputCount={4}
                                keyboardType="numeric"
                                tintColor={default_color.orange}
                            />
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingTop: 20,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonRetourDec2}
                                    onPress={() => {
                                        setShowOptRetirer(false);
                                    }}
                                >
                                    <Text style={styles.buttonTextAnnul}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonEnvoieDec}
                                    onPress={() => {
                                        handleRetirer();
                                    }}
                                >
                                    <Text style={styles.buttonText}>Retirer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* =====================================Deconnexion============================================= */}
                <Modal
                    coverScreen={true}
                    backdropOpacity={0.3}
                    isVisible={deconnexionConf}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >

                    <View style={styles.modalContentSend2}>
                        <Text
                            style={{
                                fontSize: 13.4,
                                color: "rgba(16,17,17,0.84)",
                                fontFamily: "RobotoSerif_400Regular",
                                marginBottom: 12,
                                textAlign: 'center'
                            }}
                        >
                            Souhaitez-vous vous deconnecter ?
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                // paddingTop: 10,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.buttonRetourDec}
                                onPress={() => setDeconnexionConf(false)}
                            >
                                <Text style={styles.buttonTextAnnul}>Non</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonRetourDec}
                                onPress={handleLogout}
                            >
                                <Text style={styles.buttonTextAnnul}>Oui</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* ====================================Resume modale============================================= */}
                <Modal
                    coverScreen={true}
                    backdropOpacity={0.3}
                    isVisible={sendResumeModal}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <View style={styles.modalContainerSend}>
                        <View
                            style={{
                                backgroundColor: "white",
                                borderTopEndRadius: 10,
                                borderTopStartRadius: 10,
                                paddingTop: 5,
                                borderBottomWidth: 0.5,
                                borderBottomColor: "gray",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 20,
                                    paddingBottom: 5,
                                    color: "black",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Resumer de l'operation
                            </Text>
                        </View>
                        <View style={styles.modalContentSend}>
                            <Text
                                style={{
                                    fontSize: 19,
                                    color: "rgba(16,17,17,0.84)",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Pays: {selectedOption}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 19,
                                    color: "rgba(16,17,17,0.84)",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Numero : {numero}
                            </Text>
                            <Text
                                style={{
                                    // marginBottom: 19,
                                    fontSize: 20,
                                    color: "rgba(16,17,17,0.84)",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Montant : {montant}
                            </Text>
                            <Text
                                style={{
                                    // marginBottom: 19,
                                    fontSize: 20,
                                    color: "rgba(16,17,17,0.84)",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Frais : {fraisEnvoi}
                            </Text>
                            <Text
                                style={{
                                    marginBottom: 19,
                                    fontSize: 20,
                                    color: "rgba(16,17,17,0.84)",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Total : {coutEnvoie}
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonRetour}
                                    onPress={() => setSendResumeModal(false)}
                                >
                                    <Text style={styles.buttonTextAnnul}>Retour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonEnvoie}
                                    onPress={() => handleSendVerifiInput()}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.buttonText2}>Envoyer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* =================================Chargement modal============================== */}
                <Modal
                    coverScreen={true}
                    backdropOpacity={0.2}
                    isVisible={isLoading}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <View style={styles.modalContainerChargement}>
                        <View style={styles.modalContentChargement}>
                            <Loader1 />
                        </View>
                    </View>
                </Modal>
                {/* =================================Verifie modal============================== */}

                {/* ==================== Modal ro verife lock message =====================*/}
                {/* {!isCodeAcces &&


                    <Modal
                        coverScreen={true}
                        backdropOpacity={0.3}
                        isVisible={modalClock}
                        animationIn="fadeIn" // Animation d'entrée du haut
                        animationOut="fadeOut"
                    >
                        <View style={styles.modalContainerSend}>
                            <View style={styles.modalContentSend2}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "rgba(16,17,17,0.84)",
                                        fontFamily: "RobotoSerif_400Regular",
                                    }}
                                >
                                    Nous vous encourageons à définir un code de sécurité pour
                                    verrouiller votre téléphone, ce qui vous évitera de vous
                                    reconnecter à chaque session.
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
                                        style={styles.buttonRetour}
                                        onPress={() => setModalClock(false)}
                                    >
                                        <Text style={styles.buttonTextAnnul}>Plus tard</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonEnvoie}
                                        onPress={() => handleLockModal()}
                                        disabled={isLoading}
                                    >
                                        <Text style={styles.buttonText2}>Continuer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                } */}

                {/* ==================== Modal ro verife lock message =====================*/}
                <Modal
                    isVisible={notSendMoney}
                    coverScreen={true}
                    backdropOpacity={0.4}
                    onBackdropPress={() => setNotSendMoney(false)}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <LinearGradient
                        colors={["white", "white"]}
                        start={{ x: 0.8, y: 0 }}
                        end={{ x: 0.8, y: 9 }}
                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 10, padding: 5 }}
                    >
                        {/* <View style={styles.checkmarkContainer}>
                            <View style={styles.checkmark}>
                                <Icon name="exclamation-circle" size={100} color="#bf1717" />
                            </View>
                        </View> */}

                        <LottieView
                            autoPlay
                            // ref={animation}
                            loop={false}
                            style={{
                                width: 300,
                                height: 250,
                                // backgroundColor: '#eee',

                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../animations/lotties/true_requete.json')}
                        />
                        <Text style={styles.modalText3}>
                            Oups une erreur est arrivee, veillez recommencer
                        </Text>
                    </LinearGradient>
                </Modal>

                {/* ==================== Modal ro verife lock message =====================*/}
                <Modal
                    isVisible={sendMoney}
                    coverScreen={true}
                    backdropOpacity={0.4}
                    onBackdropPress={() => setSendMoney(false)}
                    animationIn="fadeIn" // Animation d'entrée du haut
                    animationOut="fadeOut"
                >
                    <LinearGradient
                        colors={["white", "white"]}
                        start={{ x: 0.8, y: 0 }}
                        end={{ x: 0.8, y: 9 }}
                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 10, padding: 5 }}
                    >
                        {/* <View style={styles.checkmarkContainer}>
                            <View style={styles.checkmark}>
                                <Icon name="exclamation-circle" size={100} color="#bf1717" />
                            </View>
                        </View> */}
                        {/* <Text style={styles.modalText3}>
                            Oups une erreur est arrivee, veillez recommencer
                        </Text> */}
                        <LottieView
                            autoPlay
                            // ref={animation}
                            loop={false}
                            style={{
                                width: 300,
                                height: 250,
                                // backgroundColor: '#eee',

                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../animations/lotties/false_requete.json')}
                        />
                        <Text style={styles.modalText2}>
                            Transaction effectuée avec success
                        </Text>
                    </LinearGradient>
                </Modal>
            </View >
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetScrollView >
                    <View style={styles.modalContent}>
                        <Text
                            style={{
                                fontSize: 17,
                                paddingBottom: 20,
                                color: "gray",
                                fontFamily: "RobotoSerif_400Regular",
                            }}
                        >
                            ENVOYER DE L'ARGENT
                        </Text>
                        <View style={styles.inputContainer3}>
                            {selectedOption == "" ? (
                                <Icon
                                    name="globe"
                                    size={15}
                                    color="grey"
                                    style={styles.iconStyle}
                                />
                            ) : selectedOption == "Republique du Congo" ? (
                                <Text style={styles.iconStyle}>{flag("cg")}</Text>
                            ) : (
                                <Text style={styles.iconStyle}>{flag("sn")}</Text>
                            )}
                            <TouchableOpacity
                                onPress={() => setModalVisible2(true)}
                                style={{ width: "88%" }}
                            >
                                {selectedOption == "" ? (
                                    <Text
                                        style={{
                                            color: "grey",
                                            fontFamily: "RobotoSerif_400Regular",
                                        }}
                                    >
                                        Pays de residence
                                    </Text>
                                ) : (
                                    <Text>{selectedOption}</Text>
                                )}
                            </TouchableOpacity>
                            <CustomModalPicker
                                options={options}
                                onSelect={handleSelect}
                                visible={modalVisible}
                                onClose={() => setModalVisible2(false)}
                                titre="Choisir le pays de destination"
                            />
                        </View>
                        {selectedOption == "Senegal" && (
                            <View style={styles.inputContainer3}>
                                <Icon
                                    name="toggle-on"
                                    size={15}
                                    color="grey"
                                    style={styles.iconStyle}
                                />
                                <TouchableOpacity
                                    onPress={() => setModalVisible3(true)}
                                    style={{ width: "88%" }}
                                >
                                    {selectedOptionPaiement == "" ? (
                                        <Text
                                            style={{
                                                color: "grey",
                                                fontFamily: "RobotoSerif_400Regular",
                                            }}
                                        >
                                            Moyen de paiement
                                        </Text>
                                    ) : (
                                        <Text>{selectedOptionPaiement}</Text>
                                    )}
                                </TouchableOpacity>
                                <CustomModalPicker
                                    options={optionPaiment}
                                    onSelect={handleSelectPaiement}
                                    visible={modalVisible3}
                                    onClose={() => setModalVisible3(false)}
                                    titre="Choisir le moyen de paiement"
                                />
                            </View>
                        )}

                        <View style={styles.inputContainer}>
                            {selectedOption == "Republique du Congo" ? (
                                <Text style={styles.iconStyle}>+242 |</Text>
                            ) : selectedOption == "Senegal" ? (
                                <Text style={styles.iconStyle}>+221 |</Text>
                            ) : (
                                <Icon
                                    name="phone"
                                    size={15}
                                    color="grey"
                                    style={styles.iconStyle}
                                />
                            )}
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
                            <Icon
                                name="money"
                                size={15}
                                color="grey"
                                style={styles.iconStyle}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Saisir le montant"
                                keyboardType="numeric"
                                autoCapitalize="none"
                                value={montant}
                                onChangeText={setMontant}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>

                                handleSendVerifSold()
                            }
                        >
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
                    <Text
                        style={{
                            fontSize: 17,
                            paddingBottom: 20,
                            color: "gray",
                            fontFamily: "RobotoSerif_400Regular",
                        }}
                    >
                        RETIRER DE L'ARGENT
                    </Text>
                    {verifPass ? (
                        <>
                            <View style={styles.inputContainer}>
                                <Icon
                                    name="money"
                                    size={15}
                                    color="grey"
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Saisir le montant"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    value={montantRetrait}
                                    onChangeText={setMontantRetrait}
                                />
                            </View>
                            {/* <TouchableOpacity style={styles.button} onPress={() => setVeerifPass(false)} >
                                <Text style={styles.buttonText}>Valider</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleSendVerifSoldRetrait()}
                            >
                                <Text style={styles.buttonText}>Valider</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.inputContainer}>
                                <Icon
                                    name="lock"
                                    size={20}
                                    color="grey"
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mot de passe"
                                    secureTextEntry={!passwordVisible}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                >
                                    <Icon
                                        name={passwordVisible ? "eye" : "eye-slash"}
                                        size={20}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonAnnul}
                                    onPress={() => setVeerifPass(true)}
                                >
                                    <Text style={styles.buttonTextAnnul}>Retour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonRetirer}
                                    onPress={() => setVeerifPass(false)}
                                >
                                    <Text style={styles.buttonText}>Retirer</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
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
                    {choixpayement == "" ? (
                        <>
                            <Text
                                style={{
                                    fontSize: 12,
                                    paddingBottom: 20,
                                    color: "gray",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                CHOISISSEZ VOTRE MOYEN DE PAYEMENT
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                }}
                            >
                                {mode.reduce((rows: any[][], item: any, index: number) => {
                                    if (index % 2 === 0) {
                                        rows.push([item]);
                                    } else {
                                        rows[rows.length - 1].push(item);
                                    }
                                    return rows;
                                }, []).map((row: any[], rowIndex: React.Key | null | undefined) => (
                                    <View
                                        key={rowIndex}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            width: "100%",
                                        }}
                                    >
                                        {row.map((item) => (
                                            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => handleChoixCretider(item.mode, item.operateur)} key={item.id}>
                                                <Image
                                                    // source={require("../../assets/images/mtn.png")}
                                                    source={{ uri: 'https://walet.tasa.pro/assets/img/' + item.img_name }}
                                                    style={{ width: 100, height: 70, borderRadius: 10 }}
                                                />
                                                <Text style={{ fontFamily: "RobotoSerif_400Regular", textAlign: 'center', fontSize: 12, color: default_color.grayColor }}>{item.mode}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))}
                            </View>

                        </>
                    ) : choixpayement == "Mtn Momo" ? (
                        <>
                            <Text
                                style={{
                                    fontSize: 12,
                                    paddingBottom: 10,
                                    color: "gray",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                EFFECTUEZ UN DEPOT MTN MOMO
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    paddingBottom: 20,
                                    fontWeight: "bold",
                                    color: "gray",
                                    textAlign: "center",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Assurez-vous d'avoir un compte au préalable avec le même numéro
                                de téléphone ou la transaction sera impossible.
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "100%",
                                }}
                            >
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="money"
                                        size={15}
                                        color="grey"
                                        style={styles.iconStyle}
                                    />
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
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonAnnul}
                                    onPress={() => setChoixPayement("")}
                                >
                                    <Text style={styles.buttonTextAnnul}>Retour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonRetirer}
                                    onPress={() => handleCrediter()}
                                >
                                    <Text style={styles.buttonText}>Valider</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : choixpayement == "Orange Money" ? (
                        <>
                            <Text
                                style={{
                                    fontSize: 13,
                                    paddingBottom: 10,
                                    color: "gray",
                                    fontFamily: "RobotoSerif_400Regular",
                                    fontWeight: "bold",

                                }}
                            >
                                EFFECTUEZ UN DEPOT ORANGE MONEY
                            </Text>
                            <Text
                                style={{
                                    fontSize: 11,
                                    paddingBottom: 12,
                                    // fontWeight: "bold",
                                    color: "gray",
                                    textAlign: "center",
                                    fontFamily: "RobotoSerif_400Regular",
                                }}
                            >
                                Assurez-vous d'avoir un compte au préalable avec le même numéro
                                de téléphone ou la transaction sera impossible.
                            </Text>
                            <View>
                                <Text style={{ fontFamily: 'RobotoSerif_400Regular', textAlign: 'center' }}>
                                    Composez <Text style={{ fontWeight: 'bold' }}>#144#391#</Text> pour generer votre code OTP Orange money
                                </Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "100%",
                                    marginTop: 15
                                }}
                            >
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="shield"
                                        size={15}
                                        color="grey"
                                        style={styles.iconStyle}
                                    />
                                    <TextInput
                                        style={styles.input2}
                                        placeholder="Saisir le code opt"
                                        keyboardType="numeric"
                                        autoCapitalize="none"
                                        value={optOrangeRecharge}
                                        onChangeText={setOptOrangeRecharge}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "100%",
                                }}
                            >
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="money"
                                        size={15}
                                        color="grey"
                                        style={styles.iconStyle}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Saisir le montant"
                                        keyboardType="numeric"
                                        autoCapitalize="none"
                                        value={montantRechargeOrange}
                                        onChangeText={setMontantRechargeOrange}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonAnnul}
                                    onPress={() => setChoixPayement("")}
                                >
                                    <Text style={styles.buttonTextAnnul}>Retour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonRetirer}
                                    onPress={() => handleSendRechageOrange()}
                                >
                                    <Text style={styles.buttonText}>Crediter</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloribus repellendus incidunt. Nam numquam, tempora veritatis voluptates iusto asperiores libero qui aliquid harum mollitia cupiditate quos est doloremque voluptate excepturi</Text>

                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.buttonAnnul}
                                    onPress={() => setChoixPayement("")}
                                >
                                    <Text style={styles.buttonTextAnnul}>Retour</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonRetirer}
                                    onPress={() => handleCrediter()}
                                >
                                    <Text style={styles.buttonText}>Valider</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )

                    }
                    <View></View>
                </View>
            </BottomSheetModal>
            {/* ==========================fin Crediter  l'argent=========================================== */}
        </BottomSheetModalProvider >
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
        height: "52%",
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
        marginTop: 15,
        borderRadius: 20,
        elevation: 5, // pour Android
        shadowColor: "#000", // pour iOS
        shadowOffset: { width: 0, height: 2 }, // pour iOS
        display: "flex",
        // paddingBottom: 230
    },
    basBarShow: {
        position: 'absolute',
        width: '100%',
        bottom: -2,
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: 10,
        backgroundColor: default_color.grayColor,
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
    iconShowbarEnvoyer: {
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 22,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
    },
    iconShowbarRetirer: {
        backgroundColor: 'white',
        borderRadius: 100,
        padding: 22,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
    },
    iconShowbarCrediter: {
        backgroundColor: '#95AB63',
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
        height: "49%",
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
        alignItems: "center",
    },
    transcationListe: {
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#ccc',
        paddingHorizontal: 20
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
        // padding: 8
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        paddingBottom: 20,
        marginBottom: 20,
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    inputContainer2: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 100,
        paddingVertical: 12,
    },
    inputContainer3: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 0.6,
        marginBottom: 20,
        borderRadius: 100,
        paddingVertical: 12,
    },
    iconStyle: {
        paddingHorizontal: 10,
        color: "grey",
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
        flex: 1,
        height: 50,
        // paddingHorizontal: 10,
        fontFamily: "RobotoSerif_400Regular",
    },
    input2: {
        flex: 1,
        height: 50,
        // paddingHorizontal: 20,
        fontFamily: "RobotoSerif_400Regular",
    },
    button: {
        backgroundColor: default_color.orange,
        paddingVertical: 5,
        alignItems: "center",
        borderRadius: 100,
        width: "100%",
    },
    buttonRetirer: {
        backgroundColor: default_color.orange,
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 100,
        width: "50%",
    },
    buttonAnnul: {
        marginVertical: 2,
        backgroundColor: "transparent",
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 100,
        width: "40%",
        borderWidth: 0.5,
    },
    buttonEnvoie: {
        // backgroundColor: default_color.orange,
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 100,
        width: "40%",
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
    buttonEnvoieDec: {
        backgroundColor: default_color.orange,
        paddingVertical: 3,
        alignItems: "center",
        borderRadius: 100,
        width: "40%",
    },
    buttonRetourDec: {
        backgroundColor: "white",
        alignItems: "center",
        width: "30%",
        fontFamily: "RobotoSerif_400Regular",




    },
    buttonRetourDec2: {
        backgroundColor: "white",
        alignItems: "center",
        width: "30%",
        fontFamily: "RobotoSerif_400Regular",
        borderWidth: 0.5,
        borderRadius: 50



    },
    buttonTextAnnul: {
        color: "black",
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: "center",
        fontFamily: "RobotoSerif_400Regular",
    },
    buttonText: {
        color: "white",
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: "center",
        fontFamily: "RobotoSerif_400Regular",
    },
    buttonText2: {
        color: "black",
        fontSize: 15,
        paddingVertical: 4,
        width: "100%",
        textAlign: "center",
        fontFamily: "RobotoSerif_400Regular",
    },
    modalContentSend: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    modalContentSend2: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },

    modalContainerSend: {
        backgroundColor: "white.orange",
        borderRadius: 10,
        // padding: 20,
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

    modalContainer: {
        backgroundColor: "transparent",
        borderRadius: 10,
        padding: 20,
    },

    checkmarkContainer: {
        backgroundColor: "transparent",
        width: 100,
        height: 100,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 5,
    },
    checkmark: {
        width: 100,
        height: 100,
        backgroundColor: "transparent",
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalText2: {
        fontSize: 15,
        marginBottom: 1,
        textAlign: "center",
        color: "#00b33c",
        // color: 'white',
        fontWeight: "bold",
    },
    modalText3: {
        fontSize: 15,
        marginBottom: 1,
        textAlign: "center",
        color: "#bf1717",
        // color: 'rgba(124,23,31,0.55)',
        fontWeight: "bold",
    },
    eyeIcon: {
        padding: 10,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    textInputContainer: {
        marginBottom: 2,
    },
    roundedTextInput: {
        width: 40, // Ajustez la largeur selon votre besoin
        height: 40, // Ajustez la hauteur selon votre besoin
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        textAlign: "center",
        fontSize: 20,
    },
    detailsContainer: {
        paddingHorizontal: 20,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

// export default DashBoardScreen;
export default connect(
    // Mappez l'état de Redux aux props du composant
    (state: any) => ({
        isLoggedIn: state.auth.isLoggedIn, // Supposant que "auth" est le nom de votre reducer d'authentification
    }),
    // Mappez les actions Redux aux props du composant
    (dispatch) => bindActionCreators({ logout }, dispatch)
)(DashBoardScreen);
