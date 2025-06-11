export const logoutUser = async (): Promise<BaseResponse> => {
    const response = await fetch("http://localhost:3000/api/v1/auth/logout");

    const { success, message } = await response.json();

    return {
        success,
        message,
    };
};
