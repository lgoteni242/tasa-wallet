import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, FlatList, Animated } from 'react-native';
import default_color from '../styles/color';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useSelector } from "react-redux";
import UserSkeletonLoader from '../components/Skeleton/UserSkeletonLoader';


const HistoriqueScreen = ({ navigation }: { navigation: any }) => {

    const user = useSelector((state: any) => state.auth.user);

    const token = useSelector((state: any) => state.auth.token);
    const [isLoading, setIsLoading] = useState(false)

    const [dataListe, setdataListe] = useState<any[]>([])

    const [montantListe, setMontantListe] = useState([])
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
    const [selectedItem, setSelectedItem] = useState<any | null>(null);



    const date = new Date(year, month - 1, day); // mois - 1 car les mois commencent à partir de 0
    const options = { weekday: 'long' };

    const nomJour = date.toLocaleDateString('fr-FR', options);

    const addTotalAmount = montantListe.filter(item => item.action === "add")[0]?.total_amount;
    const minusTotalAmount = montantListe.filter(item => item.action === "minus")[0]?.total_amount;

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

    // const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));
    const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt(0)));


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
            const dataMontant = response.data.detail;
            setdataListe(data);
            setMontantListe(dataMontant)
            setIsLoading(false);
            // console.warn(data)
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

    // Utilise useEffect pour charger les transactions initiales lors de la connexion
    useEffect(() => {
        historique(month, day, year, token);
    }, []);



    return (
        <View style={styles.container} >
            <StatusBar translucent backgroundColor="transparent" />

            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    {/* <Icon name="arrow-circle-down" size={150} color='#8b1f09' style={{ position: 'absolute', zIndex: -4, left: -10, top: -80 }} />
                    <Icon name="arrow-circle-up" size={150} color='#8b1f09' style={{ position: 'absolute', zIndex: -4, right: -10, top: -80 }} /> */}
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
                            <Animated.View style={[styles.transactionPillule
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
                <View
                    style={{ marginBottom: 60 }}
                >
                    {
                        dataListe.length === 0 ? (
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
                                <Text style={{
                                    textAlign: 'center', marginTop: 20, color: "gray",
                                    fontFamily: "RobotoSerif_400Regular",
                                    fontSize: 16
                                }}>
                                    Aucune transaction
                                </Text>
                            </View>

                        ) : (
                            <>
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

                            </>

                        )
                    }
                </View>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, position: 'absolute', bottom: 50 }}>
                <View style={{ height: 50, backgroundColor: '#95AB63', width: '49%', borderRadius: 5, padding: 10, position: 'relative', overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Icon name="plus-circle" size={30} color='white' />
                    <View style={{ zIndex: 10 }}>
                        <Text style={{ color: 'white', fontFamily: 'RobotoSerif_400Regular', fontSize: 18 }}> {addTotalAmount} F</Text>
                    </View>
                    <Icon name="plus-circle" size={150} color={default_color.vertSecondaire} style={{ position: 'absolute', zIndex: 5, right: -50 }} />
                </View>
                <View style={{ height: 50, backgroundColor: default_color.orange, width: '49%', borderRadius: 5, padding: 10, position: 'relative', overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Icon name="minus-circle" size={30} color='white' />
                    <View style={{ zIndex: 10 }}>
                        <Text style={{ color: 'white', fontFamily: 'RobotoSerif_400Regular', fontSize: 18 }}>{minusTotalAmount} F</Text>
                    </View>
                    <Icon name="minus-circle" size={150} color='#8b1f09' style={{ position: 'absolute', zIndex: 5, right: -50 }} />
                </View>
            </View>
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
    detailsContainer: {
        paddingHorizontal: 20,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
