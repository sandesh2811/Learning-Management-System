import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType;

const connectRedis = async (): Promise<RedisClientType | void> => {
    if (redisClient) return redisClient;

    try {
        redisClient = createClient();

        redisClient.on("connect", () => {
            console.log("Redis connected successfully!");
        });

        redisClient.on("error", () => {
            console.log("Couldn't connect to redis!");
            process.exit(1);
        });

        await redisClient.connect();
    } catch (error) {
        console.log("Error creating redis client!", error);
        process.exit(1);
    }
};

export { redisClient, connectRedis };
