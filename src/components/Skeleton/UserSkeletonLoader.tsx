import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const UserSkeletonLoader = () => {
    const shimmerAnimation = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnimation, {
                toValue: 1,
                duration: 1000,
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
            <View style={styles.avatarWrapper}>
                <Animated.View
                    style={[
                        styles.avatarShimmer,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
            <View style={styles.userInfo}>
                <Animated.View
                    style={[
                        styles.nameShimmer,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.emailShimmer,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 10,
        // marginBottom: 10,
        padding: 20
    },
    avatarWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        marginRight: 15,
    },
    avatarShimmer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E0E0E0', // Couleur du fond du skeleton
    },
    userInfo: {
        flex: 1,
    },
    nameShimmer: {
        width: '70%',
        height: 20,
        marginBottom: 5,
        backgroundColor: '#E0E0E0', // Couleur du fond du skeleton
    },
    emailShimmer: {
        width: '50%',
        height: 15,
        backgroundColor: '#E0E0E0', // Couleur du fond du skeleton
    },
});

export default UserSkeletonLoader;
