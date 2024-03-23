import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import default_color from '../styles/color';

const RadioButtonCustom = ({ label, selected, onSelect }) => {
    return (
        <TouchableOpacity onPress={onSelect} style={styles.radioButton}>
            <View style={[styles.radioCircle, { backgroundColor: selected ? default_color.orange : 'white' }]}>
                {selected && <View style={styles.selectedRadioCircle} />}
            </View>
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioCircle: {
        width: 13,
        height: 13,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: default_color.orange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRadioCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: default_color.orange,
    },
    radioLabel: {
        marginLeft: 5,
        fontSize: 10,
        color: 'gray',
        fontFamily: 'RobotoSerif_400Regular'
    },
});

export default RadioButtonCustom;