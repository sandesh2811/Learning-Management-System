import { redisClient } from "@/lib/redis";
import { env } from "./checkEnv";

type GenerateCacheKey = {
    baseKey: string;
    additionalKey?: string;
};

export const generateCacheKey = async ({
    baseKey,
    additionalKey,
}: GenerateCacheKey): Promise<string> => {
    if (additionalKey === undefined) {
        return `${env.REDIS_KEY_PREFIX}:${baseKey}`;
    } else {
        return `${env.REDIS_KEY_PREFIX}:${baseKey}:${additionalKey}`;
    }
};

/*
    Get the key and retrive data
    If data exists then parse the data and return the data
    Else return null 
*/

export const getCachedData = async (key: string) => {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
        const data = JSON.parse(cachedData);

        return data;
    }

    return null;
};

/*
    Get the key, data and time to live values 
    Stringify the parsed data
    Set the data in redis with supplied key and time to live
*/

type CacheDataArguments<T> = {
    cacheKey: string;
    data: T;
    ttl?: number;
};

export const cacheData = async <T>({
    cacheKey,
    data,
    ttl,
}: CacheDataArguments<T>): Promise<void> => {
    const stringifiedData = JSON.stringify(data);

    await redisClient.set(cacheKey, stringifiedData, {
        EX: ttl,
    });
};
