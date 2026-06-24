import * as Joi from 'joi';

export const enValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    EXPIRES_IN: Joi.string().required(),
    OAUTH_STATE_SECRET: Joi.string().min(32).required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    SMTP_FROM: Joi.string().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.number().required(),
    SMTP_USER: Joi.string().required(),
    SMTP_PASSWORD: Joi.string().required(),
    FRONTEND_URL: Joi.string().uri().required(),
    TENANT_DOMAIN_SUFFIX: Joi.string().required(),
})