"use client";

import { type UserProfileDataType } from "../../schemas/getUserProfileDataSchema";
import UpdateProfileSchema, {
    type UpdateProfileType,
} from "../../schemas/updateProfileSchema";

import { useSetupRHF } from "@/hooks/useSetupRHF";

import cn from "@/lib/cn";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";

import { ReactNode } from "react";

interface ProfileProps {
    userProfileData: UserProfileDataType;
}

const Profile = ({ userProfileData }: ProfileProps) => {
    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useSetupRHF<UpdateProfileType>(UpdateProfileSchema);

    const { username, fullname, address, title, email, contactNumber, about } =
        userProfileData;

    return (
        <form
            onSubmit={handleSubmit(() => {
                console.log("Form submitted!");
            })}
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
                    id="contact-number-1"
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

            <div className="flex justify-end gap-4">
                <Button variant="skeleton" className={`tracking-wider`}>
                    Cancel
                </Button>
                <Button className={`tracking-wider`}>Update</Button>
            </div>
        </form>
    );
};

export default Profile;

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

/* SINGLE WRAPPER FOR ELEMENTS WITH SAME UI STYLES */

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <div className="flex justify-between gap-6">{children}</div>;
};
