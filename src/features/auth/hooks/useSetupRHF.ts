import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

type SetupRhfProps<T> = {
    schema: T;
};

export const useSetupRHF = <T extends ZodType>({
    schema,
}: SetupRhfProps<T>) => {
    type SchemaType = z.infer<typeof schema>;

    const { control, handleSubmit, reset } = useForm<SchemaType>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    return {
        control,
        handleSubmit,
        reset,
    };
};
