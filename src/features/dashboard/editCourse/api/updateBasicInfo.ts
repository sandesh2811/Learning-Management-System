import { BasicInfoUpdate } from "../schemas/basicInfoUpdateScehma";

export const updateBasicInfo = async (_: unknown, data: BasicInfoUpdate) => {
    console.log(data);

    return {
        success: true,
        message: "yettikai",
    };
};
