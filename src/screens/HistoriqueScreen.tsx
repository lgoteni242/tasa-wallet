import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, FlatList, Animated } from 'react-native';
import default_color from '../styles/color';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useSelector } from "react-redux";
import UserSkeletonLoader from '../components/Skeleton/UserSkeletonLoader';


const HistoriqueScreen = ({ navigation }) => {

    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false)

    const [dataListe, setdataListe] = useState([])
    const [dateS, setDateS] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const fullDate = dateS; // Votre date récupérée
    const dateOnly = new Date(fullDate).toISOString().split('T')[0];
    const dateObject = new Date(dateOnly);
    // const [year, setYear]= useState(dateObject.getFullYear())
    // const [month, setMonth]= useState(dateObject.getMonth() + 1)
    // const [day, setDay]= useState(dateObject.getDate())
    // Extraire l'année, le mois et le jour de l'objet Date
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Les mois sont indexés à partir de 0, donc nous ajoutons 1
    const day = dateObject.getDate();
    const [mois, setMois] = useState(month)

    const date = new Date(year, month - 1, day); // mois - 1 car les mois commencent à partir de 0
    const options = { weekday: 'long' };
    const nomJour = date.toLocaleDateString('fr-FR', options);

    // Utilisation de la fonction
    const onChange = async (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShowPicker(false);
        setDateS(currentDate);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Les mois sont indexés à partir de 0, donc nous ajoutons 1
        const day = currentDate.getDate();
        try {
            setIsLoading(true); // Définir isLoading ici
            await historique(month, day, year, token); // Attendre la réponse de login
            setIsLoading(false); // Réinitialiser isLoading après la réponse
        } catch (error) {
            setIsLoading(false); // Assurez-vous de réinitialiser isLoading en cas d'erreur
            // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
        }
    };

    const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));

    const historique = async (mois: any, jour: any, annee: any, token: string) => {
        setIsLoading(true);
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
            setIsLoading(false);
            // return data; // Vous pouvez retourner les données ici si nécessaire
        } catch (error) {
            // Gérer les erreurs ici
            console.error('Erreur lors de la récupération des données:', error);
            setIsLoading(false); // Assurez-vous de réinitialiser isLoading en cas d'erreur
            throw error;
        }
    };




    const showDateTimePicker = () => {
        setShowPicker(true);
    };
    const scaleValue = new Animated.Value(1);
    const pulseDuration = 1500; // Durée totale d'une impulsion (en millisecondes)
    const pulseDelay = 600; // Délai avant de démarrer la prochaine impulsion (en millisecondes)
    const pulseRepetitions = 1; // Nombre de répétitions de l'animation

    useEffect(() => {
        let repetitions = 0;

        const pulseAnimation = () => {
            Animated.sequence([
                Animated.timing(scaleValue, { toValue: 1.1, duration: pulseDuration / 2, useNativeDriver: true }),
                Animated.timing(scaleValue, { toValue: 1, duration: pulseDuration / 2, useNativeDriver: true }),
            ]).start(() => {
                repetitions++;
                if (repetitions < pulseRepetitions) {
                    setTimeout(() => pulseAnimation(), pulseDelay);
                }
            });
        };

        pulseAnimation(); // Démarre la première impulsion lors du chargement du composant

        return () => scaleValue.stopAnimation();
    }, [scaleValue]);



    // Utilise useEffect pour charger les transactions initiales lors de la connexion
    useEffect(() => {
        historique(month, day, year, token);
    }, []);



    return (
        <View style={styles.container} >
            <StatusBar translucent backgroundColor="transparent" />

            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <Text style={styles.welcomMessage}>Historique</Text>
                </View>
                <View style={styles.aujourdhui3}>
                    <View style={styles.transcationTexte}>
                        <Text
                            style={{ fontSize: 12, fontFamily: "RobotoSerif_100Thin", color: 'white' }}
                        >
                            Transactions
                        </Text>
                        <TouchableOpacity onPress={() => showDateTimePicker()}>
                            <Animated.View style={[styles.transactionPillule, {
                                transform: [{ scale: scaleValue }]
                            }
                            ]} >
                                <Text
                                    style={{
                                        fontFamily: "RobotoSerif_100Thin",
                                        color: "black",
                                        fontSize: 11,
                                        marginHorizontal: 15,
                                    }}
                                >
                                    Filtrer
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateS}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.aujourdhui4}>
                <View style={styles.transcationTexte}>
                    <Text
                        style={{ fontSize: 12, fontFamily: "RobotoSerif_100Thin", color: 'black' }}
                    >
                        Date
                    </Text>
                    <Text
                        style={{
                            fontFamily: "RobotoSerif_100Thin",
                            color: "black",
                            fontSize: 11,
                        }}
                    >
                        {nomJour}
                    </Text>
                </View>
            </View>
            {isLoading ?
                <>
                    <UserSkeletonLoader />
                    <UserSkeletonLoader />
                    <UserSkeletonLoader />
                    <UserSkeletonLoader />
                    <UserSkeletonLoader />
                    <UserSkeletonLoader />
                </>
                :
                <FlatList
                    data={dataListe}
                    renderItem={({ item }) => (
                        <View style={styles.transcationListe}>
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
                                        {item.recipient}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "gray",
                                            fontFamily: "RobotoSerif_100Thin",
                                            // fontSize: 13
                                        }}
                                    >
                                        {item.transactionId}
                                        {/* {item.heure} PM */}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'right' }}>
                                    {flag(item.country_recipient)}
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
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            }

            {/* <Modal
                // coverScreen={fontsLoaded}
                backdropOpacity={0.3}
                isVisible={isLoading}
                animationIn="fadeIn"
                animationOut="fadeOut"
            >
                <View style={styles.modalContainerChargement}>
                    <View style={styles.modalContentChargement}>
                        <Loader1 />
                    </View>
                </View>
            </Modal> */}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E7E7',
    },
    container_logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // paddingTop: 30,
        width: '100%',
        // marginBottom: 30

    },
    transcationTexte: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingVertical: 10
    },
    icon: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
    },

    container_image: {
        height: 140,
        justifyContent: 'flex-end',
        backgroundColor: default_color.orange,
        // paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 10,
    },
    welcomMessage: {
        fontFamily: 'RobotoSerif_400Regular',
        color: 'white',
        fontSize: 15,
        marginBottom: 25
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 2,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        // borderBottomWidth: 0.5,
        // borderColor: 'red'


    },
    input: {
        flex: 1,
        height: 30,
        fontFamily: "RobotoSerif_400Regular",
        fontSize: 10,
        // color: 'white'
    },
    aujourdhui: {
        marginBottom: 3,
        elevation: 5, // pour Android
        shadowColor: '#000', // pour iOS
        shadowOffset: { width: 0, height: 2 }, // 
        backgroundColor: 'white',
        padding: 20
    },
    aujourdhui3: {
        marginBottom: 3,
        // elevation: 2, // pour Android
        shadowColor: '#000', // pour iOS
        // backgroundColor: 'white',
        // padding: 20,
        paddingHorizontal: 20,
        width: '100%'
    },
    aujourdhui4: {
        marginBottom: 3,
        elevation: 2, // pour Android
        shadowColor: '#000', // pour iOS
        // backgroundColor: 'white',
        padding: 20,
        // paddingHorizontal: 20,
        width: '100%'
    },
    aujourdhui2: {
        marginBottom: 3,
        elevation: 5, // pour Android
        shadowColor: '#000', // pour iOS
        shadowOffset: { width: 0, height: 2 }, // 
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 40
    },
    transcationListe: {
        // marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#ccc',
        paddingHorizontal: 20

    },
    iconShowbarTransaction: {
        marginRight: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    transactionPillule: {
        justifyContent: "center",
        display: "flex",
        backgroundColor: "#E7E7E7",
        borderRadius: 20,
        alignItems: 'center',
        // marginBottom: 10,
        // width: "40%"
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

});

export default HistoriqueScreen;
