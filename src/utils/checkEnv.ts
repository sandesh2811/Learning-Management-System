type EnvironmentVariablesType = {
    NODE_ENV: "development" | "production";
    MONGODB_URI: string;
    JWT_ACCESS_TOKEN_SECRET_KEY: string;
    JWT_ACCESS_TOKEN_EXPIRY: string;
};

const CheckEnvirnomentVariables = <Key extends keyof EnvironmentVariablesType>(
    key: Key
): EnvironmentVariablesType[Key] => {
    const value = process.env[key];
    console.log(value);

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
};
