import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import RadioButton from '../components/RadioButton';
import default_color from "../styles/color";


const CustomModalPicker = ({ options, onSelect, visible, onClose, titre }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        onSelect(option);
        onClose();
    };

    const flag = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));



    return (
        <Modal
            coverScreen={true} backdropOpacity={0.3} onBackdropPress={onClose} isVisible={visible}
        >
            <View style={styles.modalContainer}>
                <View style={{ backgroundColor: default_color.orange, borderTopEndRadius: 10, borderTopStartRadius: 10, paddingTop: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, paddingBottom: 10, fontWeight: 'bold', color: 'white' }}>{titre}</Text>
                </View>
                <View style={styles.modalContent}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionItem}
                            onPress={() => handleSelectOption(option.label)}
                        >
                            <Text style={styles.optionLabel}>{flag(option.flag)}</Text>
                            <Text style={styles.optionLabel}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 20,
    },
    optionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        color: 'gray',
        paddingHorizontal: 16
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        padding: 10,
    },
    optionItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        paddingVertical: 2,
        // borderBottomWidth: 0.5,
        // backgroundColor: '#F8F8F8',
        marginBottom: 2,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
    },
    closeButton: {
        alignItems: 'center',
        // paddingVertical: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});

export default CustomModalPicker;
