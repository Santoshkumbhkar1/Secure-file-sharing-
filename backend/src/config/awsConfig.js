import { S3Client } from "@aws-sdk/client-s3";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// AWS Configuration (Avoid Hardcoding Credentials in Production)
const awsConfig = {
  region: process.env.AWS_DEFAULT_REGION,
  ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }
    : {}), // Use IAM role if no credentials provided
};

// S3 Client
const s3 = new S3Client(awsConfig);

// Cognito Client
const cognito = new CognitoIdentityProviderClient(awsConfig);

export { s3, cognito };
