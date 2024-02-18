import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import default_color from '../styles/color';

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

const HistoriqueScreen = ({ navigation }) => {


    const filterData = (data: any[], searchText: string) => {
        return data.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );

    };
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        // Appel de la fonction pour filtrer les données
        const filteredData = filterData(dataListe, searchText);
        // Affichage des données filtrées
        console.log('Données filtrées :', filteredData);
    };
    const filteredData = filterData(dataListe, searchText);

    const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));


    return (
        <View style={styles.container} >
            <StatusBar translucent backgroundColor="transparent" />
            {/* <StatusBar barStyle="light-content" /> */}

            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <Text style={styles.welcomMessage}>Historique</Text>
                </View>

            </View>
            <View style={styles.container2}>
                <TextInput
                    style={styles.input}
                    placeholder="Recherchez par nom, date ou numero téléphone ..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <Icon name='search' color='gray' size={15} />
            </View>
            <ScrollView style={{ backgroundColor: '#E7E7E7' }} >

                <View style={styles.aujourdhui}>
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

                    {
                        filteredData.map((item) => (

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

                </View>
                <View style={styles.aujourdhui}>

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
                                hier
                            </Text>
                        </View>
                    </View>
                    {
                        filteredData.map((item) => (

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

                </View>
                <View style={styles.aujourdhui2}>

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
                                Avant hier
                            </Text>
                        </View>
                    </View>



                    {
                        filteredData.map((item) => (

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

                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: StatusBar.currentHeight || 0,
        // paddingBottom: StatusBar.currentHeight || 0,
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
        // alignItems: "center",
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
        paddingHorizontal: 20,
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
        borderColor: '#ccc'

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
        backgroundColor: "gray",
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 10,
        // width: "40%"
    },

});

export default HistoriqueScreen;
