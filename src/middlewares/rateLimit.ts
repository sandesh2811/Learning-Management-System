import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    TOO_MANY_REQUESTS,
} from "@/constants/Constants";

import { connectRedis, redisClient } from "@/lib/redis";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest } from "next/server";

const WINDOW_SIZE_IN_SECONDS = 120;
const MAX_REQUESTS = 50;

export const RateLimit: AppMiddleware = async (request: NextRequest) => {
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
            return API_RESPONSE(TOO_MANY_REQUESTS, {
                success: false,
                message: "Too many requests!",
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return API_RESPONSE(INTERNAL_SERVER_ERROR, {
            success: false,
            message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }
};
