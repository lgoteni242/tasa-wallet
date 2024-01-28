import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colorDefault from '../styles/color';

const RadioButton = ({ label, selected, onSelect }) => {
    return (
        <TouchableOpacity onPress={onSelect} style={styles.radioButton}>
            <Text style={styles.radioLabel}>{label}</Text>
            <View style={[styles.radioCircle, { backgroundColor: selected ? colorDefault.main : 'white' }]}>
                {selected && <View style={styles.selectedRadioCircle} />}
            </View>
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
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colorDefault.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRadioCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colorDefault.main,
    },
    radioLabel: {
        // marginLeft: 10,
        fontSize: 16,
    },
});

export default RadioButton;