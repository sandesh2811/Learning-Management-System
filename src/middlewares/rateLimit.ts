import { connectRedis, redisClient } from "@/lib/redis";
import { NextRequest } from "next/server";

const WINDOW_SIZE_IN_SECONDS = 120;
const MAX_REQUESTS = 10;

export const RateLimit = async (request: NextRequest) => {
    const user = request.headers.get("x-forwarded-for");
    const key = `limit_:${user}`;

    try {
        await connectRedis();

        let userRequest = await redisClient.get(key);

        if (userRequest === null) {
            await redisClient.set(key, 1, {
                EX: WINDOW_SIZE_IN_SECONDS,
            });

            userRequest = "1";
        } else {
            userRequest = String(await redisClient.incr(key));
        }

        if (Number(userRequest) > MAX_REQUESTS) {
            return {
                success: false,
                message: "Too many requests!",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Internal Server Error!",
        };
    }
};
