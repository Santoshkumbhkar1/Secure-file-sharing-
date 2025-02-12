import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { config } from './config.js';

export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
    },
    userPoolId: config.cognito.userPoolId
});

// Verify Cognito configuration
console.log('Cognito Configuration:', {
    region: config.aws.region,
    userPoolId: config.cognito.userPoolId,
    clientId: config.cognito.clientId
});
