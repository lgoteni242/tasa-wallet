import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { AppState } from 'react-native';
import { useSelector, useDispatch } from "react-redux";


// Créez un contexte
const AuthContext = createContext();

export const HandleChange = ({ children }) => {

    const isLoggedIn = useSelector((state) => {
        return state.auth.isLoggedIn;
    });

    const isCodeAcces = useSelector((state) => {
        return state.auth.isCodeAcces;
    });

    const isLock = useSelector((state) => {
        return state.auth.isLock;
    });

    const navigation = useNavigation();


    const dispatch = useDispatch();
    const appState = useRef(AppState.currentState);
    const timerRef = useRef(null);
    // const [lock, setLock] = useState(false)

    const _handleAppStateChange = async (nextAppState: string) => {

        console.error(true, "LEvi")
        if (isLoggedIn && isCodeAcces == false) {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                dispatch({ type: 'LOGOUT' });
                clearTimeout(timerRef.current);
            }
            if (
                appState.current.match(/active/) &&
                nextAppState.match(/inactive|background/)
            ) {
                timerRef.current = setTimeout(() => {
                    setLock(true);
                }, 100); // 300000ms = 5 minutes
            }
        }

        if (isLoggedIn && isCodeAcces) {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                dispatch({ type: 'LOCK_APP' });
                clearTimeout(timerRef.current);
            }
            if (
                appState.current.match(/active/) &&
                nextAppState.match(/inactive|background/)
            ) {
                timerRef.current = setTimeout(() => {
                    setLock(true);
                }, 100); // 300000ms = 5 minutes
            }
        }
        appState.current = nextAppState;
    };

    useEffect(() => {
        const subscription = AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
};

// Créez un hook personnalisé pour utiliser le contexte
export const useAuth = () => {
    return useContext(AuthContext);
};