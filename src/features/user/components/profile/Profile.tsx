"use client";

import { type UserProfileDataType } from "../../schemas/getUserProfileDataSchema";
import UpdateProfileSchema, {
    type UpdateProfileType,
} from "../../schemas/updateProfileSchema";

import { useSetupRHF } from "@/hooks/useSetupRHF";
import { useHandleForm } from "@/hooks/useHandleForm";

import { updateUserProfileData } from "../../api/actions/updateUserProfileData";

import cn from "@/lib/cn";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

/* For useActionState inital state */
const initialState = {
    success: false,
    message: "",
};

interface ProfileProps {
    userProfileData: UserProfileDataType;
}

const Profile = ({ userProfileData }: ProfileProps) => {
    const router = useRouter();

    /* Extract necessary data */
    const { username, fullname, address, title, email, contactNumber, about } =
        userProfileData;

    /* Setting up React Hook Form */
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useSetupRHF<UpdateProfileType>(UpdateProfileSchema);

    /* Handling submitted form */
    const { state, action, isPending } = useHandleForm<UpdateProfileType>(
        updateUserProfileData,
        initialState
    );

    /* Show toast and reset form */
    useEffect(() => {
        if (state.success) {
            toast.success(state.message);

            reset();
        } else if (!state.success && state.message !== "") {
            toast.error(state.message);
        }
    }, [state, reset]);

    /* Redirecting user to home page */
    const cancelProfileUpdate = () => {
        router.push("/");
    };

    return (
        <form
            onSubmit={handleSubmit(action)}
            className="bg-background flex flex-col gap-4 rounded-md p-6"
        >
            {/* USERNAME AND FULLNAME */}

            <Wrapper>
                <ProfileElement
                    message="Fullname can only be changed twice a week!"
                    className="flex-1"
                >
                    <FormInput
                        id="fullname"
                        type="string"
                        label="Fullname"
                        defaultValue={fullname}
                        placeholder="Eg: Hari Bahadur"
                        {...register("fullname")}
                        error={errors.fullname?.message}
                    />
                </ProfileElement>

                <ProfileElement
                    message="Username can only be changed twice a week!"
                    className="flex-1"
                >
                    <FormInput
                        id="username"
                        type="string"
                        label="Username"
                        defaultValue={username}
                        placeholder="Eg: iamhari"
                        {...register("username")}
                        error={errors.username?.message}
                    />
                </ProfileElement>
            </Wrapper>

            {/* ADDRESS AND TITLE */}

            <Wrapper>
                <FormInput
                    id="title"
                    type="string"
                    label="Title"
                    defaultValue={title}
                    placeholder="Eg: Software Developer"
                    {...register("title")}
                    error={errors.title?.message}
                />

                <FormInput
                    id="address"
                    type="string"
                    label="Located in"
                    defaultValue={address}
                    placeholder="Eg: Nepal, Kathmandu"
                    {...register("address")}
                    error={errors.address?.message}
                />
            </Wrapper>

            {/* EMAIL AND CONTACT NUMBER */}

            <Wrapper>
                <ProfileElement
                    message="Email can only be changed once in two weeks!"
                    className="flex-1"
                >
                    <FormInput
                        id="email"
                        type="email"
                        label="Email"
                        defaultValue={email}
                        placeholder="Eg: hari@123.com"
                        {...register("email")}
                        error={errors.email?.message}
                    />
                </ProfileElement>

                <FormInput
                    id="contact-number"
                    type="string"
                    label="Contact Number"
                    defaultValue={contactNumber}
                    placeholder="Eg: 0123456789"
                    {...register("contactNumber")}
                    error={errors.contactNumber?.message}
                    wrapperClassName="flex-1"
                />
            </Wrapper>

            {/* ABOUT  */}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="about"
                    className="text-sm font-medium md:text-base"
                >
                    About
                </label>
                <textarea
                    id="about"
                    defaultValue={about}
                    placeholder="Write about yourself"
                    {...register("about")}
                    className="border-secondary-text w-full rounded-sm border-[1.2px] p-2 text-sm"
                />
                <FormError error={errors.about?.message} />
            </div>

            {/* CANCEL AND UPDATE BUTTONS */}

            <div className="mid:justify-end flex justify-between gap-4">
                <Button
                    type="button"
                    onClick={cancelProfileUpdate}
                    variant="skeleton"
                    className={`w-[150px] tracking-wider ${isPending && "text-primary-text/80 cursor-not-allowed"}`}
                >
                    Cancel
                </Button>
                <Button
                    className={`w-[150px] tracking-wider ${isPending && "bg-primary-text/80 cursor-not-allowed"}`}
                >
                    {isPending ? <Spinner message="Updating..." /> : "Update"}
                </Button>
            </div>
        </form>
    );
};

export default Profile;

/* SINGLE WRAPPER FOR ELEMENTS WITH SAME UI STYLES */

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="mid:flex-row flex flex-col justify-between gap-6">
            {children}
        </div>
    );
};

/* FOR INDIVIDUAL PROFILE ELEMENT WITH CERTAIN MESSAGE */

const ProfileElement = ({
    message,
    className,
    children,
}: {
    message: string;
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {children}
            <span className="text-sm">
                <b>Note:</b>
                {"   "}
                {message}
            </span>
        </div>
    );
};
