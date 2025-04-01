type EnvironmentVariablesType = {
    NODE_ENV: "development" | "production";
    MONGODB_URI: string;
    JWT_ACCESS_TOKEN_SECRET_KEY: string;
    JWT_ACCESS_TOKEN_EXPIRY: string;
    JWT_REFRESH_TOKEN_SECRET_KEY: string;
    JWT_REFRESH_TOKEN_EXPIRY: string;
    ACCESS_TOKEN_COOKIE_EXPIRY: string;
    REFRESH_TOKEN_COOKIE_EXPIRY: string;
    SALT_ROUNDS: string;
    BASE_URL: string;
};

const CheckEnvirnomentVariables = <Key extends keyof EnvironmentVariablesType>(
    key: Key
): EnvironmentVariablesType[Key] => {
    const value = process.env[key];

    if (!value) {
        throw new Error("Missing environment variables!");
    }

    return value as EnvironmentVariablesType[Key];
};

export const env: EnvironmentVariablesType = {
    NODE_ENV: CheckEnvirnomentVariables("NODE_ENV"),
    MONGODB_URI: CheckEnvirnomentVariables("MONGODB_URI"),
    JWT_ACCESS_TOKEN_SECRET_KEY: CheckEnvirnomentVariables(
        "JWT_ACCESS_TOKEN_SECRET_KEY"
    ),
    JWT_ACCESS_TOKEN_EXPIRY: CheckEnvirnomentVariables(
        "JWT_ACCESS_TOKEN_EXPIRY"
    ),
    JWT_REFRESH_TOKEN_SECRET_KEY: CheckEnvirnomentVariables(
        "JWT_REFRESH_TOKEN_SECRET_KEY"
    ),
    JWT_REFRESH_TOKEN_EXPIRY: CheckEnvirnomentVariables(
        "JWT_REFRESH_TOKEN_EXPIRY"
    ),
    ACCESS_TOKEN_COOKIE_EXPIRY: CheckEnvirnomentVariables(
        "ACCESS_TOKEN_COOKIE_EXPIRY"
    ),
    REFRESH_TOKEN_COOKIE_EXPIRY: CheckEnvirnomentVariables(
        "REFRESH_TOKEN_COOKIE_EXPIRY"
    ),
    SALT_ROUNDS: CheckEnvirnomentVariables("SALT_ROUNDS"),
    BASE_URL: CheckEnvirnomentVariables("BASE_URL"),
};
