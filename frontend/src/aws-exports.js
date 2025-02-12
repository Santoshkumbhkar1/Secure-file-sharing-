const awsConfig = {
    Auth: {
        region: "YOUR_AWS_REGION", // e.g., "us-east-1"
        userPoolId: "YOUR_COGNITO_USER_POOL_ID",
        userPoolWebClientId: "YOUR_COGNITO_CLIENT_ID",
    }
};

export default awsConfig;
