import { NextResponse } from "next/server";

export const API_RESPONSE = <T>(
    statusCode: number,
    { success, message, error, data }: ResponseStructure<T>
) => {
    if (error) {
        return NextResponse.json<ResponseStructure<void>>(
            {
                success,
                error,
                message,
            },
            { status: statusCode }
        );
    } else {
        return NextResponse.json<ResponseStructure<T>>(
            {
                success,
                message,
                data,
            },
            { status: statusCode }
        );
    }
};
