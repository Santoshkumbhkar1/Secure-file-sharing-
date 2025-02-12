import { 
    SignUpCommand, 
    InitiateAuthCommand 
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import { config } from '../config/config.js';
import { cognitoClient } from '../config/cognitoConfig.js';

const calculateSecretHash = (username) => {
    const message = username + config.cognito.clientId;
    return crypto
        .createHmac('SHA256', config.cognito.clientSecret)
        .update(message)
        .digest('base64');
};

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Signup Request Received:", email);

        const secretHash = calculateSecretHash(email);
        
        const command = new SignUpCommand({
            ClientId: config.cognito.clientId,
            Username: email,
            Password: password,
            SecretHash: secretHash,
            UserAttributes: [
                {
                    Name: "email",
                    Value: email
                }
            ]
        });

        const response = await cognitoClient.send(command);
        
        res.status(201).json({
            message: "User registration successful",
            userSub: response.UserSub,
            email: email
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(400).json({
            error: error.message,
            code: error.name
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const secretHash = calculateSecretHash(email);

        const command = new InitiateAuthCommand({
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: config.cognito.clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: secretHash
            }
        });

        const response = await cognitoClient.send(command);

        res.status(200).json({
            message: "Login successful",
            accessToken: response.AuthenticationResult.AccessToken,
            idToken: response.AuthenticationResult.IdToken,
            refreshToken: response.AuthenticationResult.RefreshToken
        });
    } catch (error) {
        console.error("Login error:", error);
        
        // Improved error handling
        const errorResponse = {
            error: error.message,
            code: error.name
        };

        // Add debugging information if needed
        if (process.env.NODE_ENV !== 'production') {
            errorResponse.details = error;
        }

        res.status(401).json(errorResponse);
    }
};

