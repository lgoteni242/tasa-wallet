import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import default_color from "../styles/color";


const CustomModalPicker = ({ options, onSelect, visible, onClose, titre }: { options: any, onSelect: any, visible: any, onClose: any, titre: any }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectOption = (option: any) => {
        setSelectedOption(option);
        onSelect(option);
        onClose();
    };

    // const flag = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt()));
    const flag = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt(0)));

    return (
        <Modal
            coverScreen={true} backdropOpacity={0.3} onBackdropPress={onClose} isVisible={visible} animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <View style={styles.modalContainer}>
                <View style={{ borderTopEndRadius: 10, borderTopStartRadius: 10, paddingTop: 5, borderBottomWidth: 0.2 }}>
                    <Text style={{ textAlign: 'center', fontSize: 15, paddingBottom: 10, color: '#7f7f7f', fontFamily: 'RobotoSerif_400Regular' }}>{titre}</Text>
                </View>
                <View style={styles.modalContent}>
                    {options.map((option: any, index: any) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionItem}
                            onPress={() => handleSelectOption(option.label)}
                        >
                            {option.flag && <Text style={styles.optionLabel}>{flag(option.flag)}</Text>}
                            <Text style={styles.optionLabel}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 10,
    },
    optionLabel: {
        marginVertical: 5,
        color: default_color.textGrayColor,
        paddingHorizontal: 16,
        fontFamily: 'RobotoSerif_400Regular',
    },
    modalContent: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        padding: 10,
    },
    optionItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#F8F8F8',

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
