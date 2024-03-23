// HomeScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import default_color from '../styles/color';

function IntroScreen({ navigation }: { navigation: any }) {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [animatedValue]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: default_color.moi }}>
            <Animated.Text
                style={{
                    fontSize: 20,
                    opacity: animatedValue,
                    transform: [
                        {
                            translateY: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0],
                            }),
                        },
                    ],
                }}
            >
                <Text style={styles.anime}>
                    T'Walet
                </Text>
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    anime: {
        flex: 1,
        fontSize: 75,
        fontWeight: 'bold',
        color: default_color.secondary,
    }
})

export default IntroScreen;
