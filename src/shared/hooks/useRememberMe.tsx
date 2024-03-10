import { useState } from "react";
import { LoginFormInputs } from "../types";

const useRememberMe = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(JSON.parse(localStorage.getItem('rememberMe') || 'false'));

    const toggleRememberMe = () => {
        const newRememberMeState = !rememberMe;
        setRememberMe(newRememberMeState);
        localStorage.setItem('rememberMe', JSON.stringify(newRememberMeState));
        if (!newRememberMeState) clearCredentialsInLocalStorage();
    };

    const clearCredentialsInLocalStorage = () => localStorage.removeItem('credentials');

    const getCredentialsFromLocalStorage = (): { email: string; password: string } => {
        const credentials = localStorage.getItem('credentials');
        return credentials ? JSON.parse(credentials) : { email: '', password: '' };
    };

    const saveCredentialsInLocalStorage = ({ email, password }: LoginFormInputs) => {
        if (rememberMe) {
            localStorage.setItem('credentials', JSON.stringify({ email, password }));
        }
    };

    return { rememberMe, toggleRememberMe, getCredentialsFromLocalStorage, saveCredentialsInLocalStorage };
};

export default useRememberMe;
