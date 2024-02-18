import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import default_color from '../styles/color';

const UserScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container_image}>
                <View style={styles.container_logo}>
                    <TouchableOpacity >
                        <Icon name='home' size={25} color='white' />
                    </TouchableOpacity>
                    <Text style={styles.welcomMessage}>Profile</Text>
                    <TouchableOpacity >
                        <Icon name='bell' size={25} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={{ bottom: -70, flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ borderColor: 'white', borderWidth: 4, borderRadius: 100 }}>
                        {/* <Image source={require('../../assets/images/user.png')} style={styles.image} /> */}
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Pacifico_400Regular' }}>Levi Goteni</Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Détails</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Modifier le profil</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Mes transactions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Mes données</Text>
                    </TouchableOpacity>
                </View>
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
        left: 20,
        zIndex: 2,
        // padding:10
    },
    container_logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 30,
        width: '100%'
    },
    icon: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white'
    },

    container_image: {
        position: 'relative',
        flex: 0.4,
        // justifyContent: 'center',
        justifyContent: 'flex-start',
        backgroundColor: default_color.orange,
        // borderBottomLeftRadius: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
        // marginBottom:70

    },
    iconStyle: {
        paddingHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 100
    },
    welcomMessage: {
        fontFamily: 'Pacifico_400Regular',
        color: 'white',
        fontSize: 15
    },
    buttonContainer: {
        flex: 0.8,
        marginTop: 100,
        paddingHorizontal: 20,
    },
    buttonsContainer: {
        marginTop: 100,
        paddingHorizontal: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems:'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: default_color.orange,
        padding: 30,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        // textAlign:'left'
    },

});

export default UserScreen;
