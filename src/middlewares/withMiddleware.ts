import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
} from "@/constants/Constants";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextRequest, NextResponse } from "next/server";

export const withMiddleware = (
    middlewares: AppMiddleware[],
    handler: (
        req: NextRequest
    ) => Promise<NextResponse<ResponseStructure<unknown>>>
) => {
    return async (req: NextRequest) => {
        try {
            for (const middleware of middlewares) {
                const result = await middleware(req);

                if (result instanceof NextResponse) {
                    return result;
                }
            }

            return handler(req);
        } catch (error) {
            return API_RESPONSE(INTERNAL_SERVER_ERROR, {
                success: false,
                message: INTERNAL_SERVER_ERROR_MESSAGE,
                error,
            });
        }
    };
};
