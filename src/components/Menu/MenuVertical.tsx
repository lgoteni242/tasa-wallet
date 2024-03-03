import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';

const VerticalMenu = ({ visible, onClose, options }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                onPress={onClose}
            >
                <View style={styles.container}>
                    <FlatList
                        data={options}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.option} onPress={item.onPress}>
                                <Text style={styles.optionText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    option: {
        padding: 10,
    },
    optionText: {
        fontSize: 18,
    },
});

export default VerticalMenu;
