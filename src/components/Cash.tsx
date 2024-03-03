return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        {isLoggedIn ? (
            <>
                {isCodeAcces ? (
                    <Stack.Screen
                        name="CodeDeblockApp"
                        component={CodeDeblockAppScreen}
                    />
                ) : (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen
                            name="MotPasseOublier"
                            component={MotPasseOublier}
                        />
                        {/* <Stack.Screen name="Menu" component={BottomMenuScreen} /> */}
                    </>
                )}
                {!isLock && ( // Vérifier si l'application n'est pas verrouillée
                    <>
                        <Stack.Screen name="Dash" component={DashBoardScreen} />
                        <Stack.Screen name="Log" component={LoginScree} />
                        <Stack.Screen name="Menu" component={BottomMenuScreen} />
                        <Stack.Screen name="CodeAcces" component={CodeAccesScreen} />
                        <Stack.Screen name="Kyc" component={KycScreen} />
                        <Stack.Screen name="CodeVerif" component={CodeAccesVerifScreen} />
                        <Stack.Screen
                            name="CodeAccesConfig"
                            component={CodeAccesConfigScreen}
                        />
                    </>
                )}
                {isLock && ( // Vérifier si l'application n'est pas verrouillée
                    <Stack.Screen
                        name="CodeDeblockApp"
                        component={CodeDeblockAppScreen}
                    />
                )}
            </>
        ) : (
            <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MotPasseOublier" component={MotPasseOublier} />
                <Stack.Screen name="Menu" component={BottomMenuScreen} />
            </>
        )}
    </Stack.Navigator>
);
};