import {
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
} from "@/constants/Constants";

import { API_RESPONSE } from "@/utils/API_Response";

import { NextResponse } from "next/server";

export const withMiddleware = (
    middlewares: AppMiddleware[],
    handler: (
        req: CustomNextRequest,
        { params }: ParamsProp<{ courseId: string }>
    ) => Promise<NextResponse<ResponseStructure<unknown>> | undefined>
) => {
    return async (
        req: CustomNextRequest,
        params: ParamsProp<{ courseId: string }>
    ) => {
        try {
            for (const middleware of middlewares) {
                const result = await middleware(req);

                if (result instanceof NextResponse) {
                    return result;
                }
            }

            return handler(req, params);
        } catch (error) {
            return API_RESPONSE(INTERNAL_SERVER_ERROR, {
                success: false,
                message: INTERNAL_SERVER_ERROR_MESSAGE,
                error,
            });
        }
    };
};
