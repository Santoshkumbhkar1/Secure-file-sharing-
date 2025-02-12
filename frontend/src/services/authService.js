import { Amplify } from 'aws-amplify';
import { signUp, signIn, signOut, getCurrentUser } from 'aws-amplify/auth';

// Configure Amplify
Amplify.configure({
    Auth: {
        Cognito: {
            region: import.meta.env.VITE_AWS_REGION,
            userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
        }
    }
});

export const signup = async (email, password) => {
    return await signUp({
        username: email,
        password,
        attributes: {
            email
        }
    });
};

export const login = async (email, password) => {
    return await signIn({
        username: email,
        password
    });
};

export const logout = async () => {
    try {
        await signOut();
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

export { getCurrentUser };
