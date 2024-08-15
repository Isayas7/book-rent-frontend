"use client"

import React, { createContext, useEffect, useReducer, ReactNode } from 'react';

interface User {
    email: String,
    role: String,
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: User }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' };

const isBrowser = typeof window !== 'undefined';

const INITIAL_STATE: AuthState = {
    user: isBrowser ? JSON.parse(localStorage.getItem('user') || 'null') || null : null,
    loading: false,
    error: null,
};



export const AuthContext = createContext<{
    user: User | null;
    loading: boolean;
    error: string | null;
    dispatch: React.Dispatch<AuthAction>;
}>(INITIAL_STATE as any);

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }
            }
        >
            {children}
        </AuthContext.Provider>
    );
};
