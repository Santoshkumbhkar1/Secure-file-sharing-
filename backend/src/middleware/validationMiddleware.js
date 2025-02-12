import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const createValidator = (schema) => {
    const validate = ajv.compile(schema);
    
    return (req, res, next) => {
        const valid = validate(req.body);
        if (!valid) {
            return res.status(400).json({
                error: 'Validation error',
                details: validate.errors
            });
        }
        next();
    };
};

// Common schemas
export const schemas = {
    auth: {
        signup: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 8 }
            },
            required: ['email', 'password'],
            additionalProperties: false
        },
        login: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string' }
            },
            required: ['email', 'password'],
            additionalProperties: false
        }
    },
    file: {
        upload: {
            type: 'object',
            properties: {
                fileName: { type: 'string' },
                fileType: { type: 'string' }
            },
            required: ['fileName', 'fileType'],
            additionalProperties: false
        }
    }
};
