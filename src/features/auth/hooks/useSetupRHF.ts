import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

export const useSetupRHF = <T extends Record<string, unknown>>(
    schema: ZodType<T>
) => {
    return useForm<T>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });
};
