import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import default_color from '../styles/color';
    

const HistoriqueScreen = ({ navigation }) => {

    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        // Logique de recherche ici
        console.log('Recherche :', searchText);
    };

    const handleFilter = () => {
        console.log('Filtrage');
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <Text style={styles.welcomMessage}>Historique</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher par date ou email..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.icon}>
                    <Icon name="search" size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ backgroundColor: '#E7E7E7' }}>
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

                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 13,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
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
                                    Divin Mik
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_100Thin",

                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "RobotoSerif_100Thin",

                            }}
                        >
                            1124 Fcfa
                        </Text>
                    </View>

                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 13,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
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
                                    Divin Mik
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_100Thin",

                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "RobotoSerif_100Thin",

                            }}
                        >
                            1124 Fcfa
                        </Text>
                    </View>

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
                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 13,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
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
                                    Divin Mik
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_100Thin",

                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "RobotoSerif_100Thin",

                            }}
                        >
                            1124 Fcfa
                        </Text>
                    </View>

                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 13,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
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
                                    Divin Mik
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_100Thin",

                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "RobotoSerif_100Thin",

                            }}
                        >
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
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_400Regular",
                                    }}
                                >
                                    Divin Mik
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_100Thin",

                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "RobotoSerif_100Thin",

                            }}
                        >
                            1124 Fcfa
                        </Text>
                    </View>

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



                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 13,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
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
                                    Divin Mik
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_100Thin",

                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "RobotoSerif_100Thin",

                            }}
                        >
                            1124 Fcfa
                        </Text>
                    </View>

                    <View style={styles.transcationListe}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 23,
                            }}
                        >
                            <TouchableOpacity style={styles.iconShowbarTransaction}>
                                <Icon name="user" size={30} color="gray" />
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
                                    Divin Mik
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontFamily: "RobotoSerif_100Thin",

                                    }}
                                >
                                    12:15 PM
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "RobotoSerif_100Thin",

                            }}
                        >
                            1124 Fcfa
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container_logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // paddingTop: 30,
        width: '100%'

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
        marginRight: 10,
    },

    container_image: {
        // flex: 0.4,
        height: 150,
        justifyContent: 'center',
        backgroundColor: default_color.orange,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        padding: 20,
        alignItems: 'center'

    },
    iconStyle: {
        paddingHorizontal: 10,
    },
    welcomMessage: {
        fontFamily: 'RobotoSerif_400Regular',
        color: 'white',
        fontSize: 15
    },

    buttonsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 20

    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: 40,
        fontFamily: "RobotoSerif_400Regular",
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
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#ccc'

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
        paddingHorizontal: 12,
        // paddingVertical: 2,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
