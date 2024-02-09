import React, { useState } from 'react';
import { View, Animated, TouchableOpacity, Text, StyleSheet, PanResponder } from 'react-native';

const UpDownElement = () => {
    const [isUp, setIsUp] = useState(false);
    const translateY = new Animated.Value(400); // initial position below the screen

    const toggleElement = () => {
        const toValue = isUp ? 400 : 200; // if element is up, move it down, else move it up
        Animated.timing(translateY, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsUp(!isUp);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy < 0 && isUp) {
                // move up
                translateY.setValue(200 + gestureState.dy);
            } else if (gestureState.dy > 0 && !isUp) {
                // move down
                translateY.setValue(400 + gestureState.dy);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (isUp) {
                if (gestureState.dy < -100) {
                    toggleElement();
                } else {
                    Animated.timing(translateY, {
                        toValue: 200,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }
            } else {
                if (gestureState.dy > 100) {
                    toggleElement();
                } else {
                    Animated.timing(translateY, {
                        toValue: 400,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }
            }
        },
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.element, { transform: [{ translateY }] }]}
        >
            <TouchableOpacity style={styles.button} onPress={toggleElement}>
                <Text style={styles.buttonText}>{isUp ? 'Descendre' : 'Monter'}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    element: {
        position: 'absolute',
        bottom: 0, // start from the bottom
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        paddingVertical: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
});

export default UpDownElement;
