import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const SkeletonLoader = () => {
    const shimmerAnimation = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnimation, {
                toValue: 1,
                duration: 10000,
                easing: Easing.ease,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-120, 420],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.shimmer,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    shimmer: {
        width: 120,
        height: 20,
        borderRadius: 5,
        backgroundColor: '#E0E0E0', // Couleur du fond du skeleton
    },
});

export default SkeletonLoader;
