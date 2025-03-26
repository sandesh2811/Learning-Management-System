export const ConvertFormData = <T>(formData: FormData): T => {
    const data = Object.fromEntries(formData.entries()) as T;

    return data;
};
