import React from 'react';
import { View, StyleSheet } from 'react-native';
import default_color from '../styles/color';
const ProgressCircles = ({ currentStep }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.circle, currentStep === 1 && styles.activeCircle]} />
            <View style={[styles.circle, currentStep === 2 && styles.activeCircle]} />
            {/* <View style={[styles.circle, currentStep === 3 && styles.activeCircle]} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 90,
    },
    circle: {
        width: 10,
        marginHorizontal: 4,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#C4C4C4',
    },
    activeCircle: {
        backgroundColor: default_color.orange,
    },
});

export default ProgressCircles;
