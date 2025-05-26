import { createContext, ReactNode, useContext, useState } from "react";

type UserTypingContextReturnValues = {
    isUserTyping: boolean;
    setUserTypingTrue: () => void;
    setUserTypingFalse: () => void;
};

const UserTypingContext = createContext<UserTypingContextReturnValues | null>(
    null
);

const UserTyping = ({ children }: { children: ReactNode }) => {
    const [isUserTyping, setUserTyping] = useState<boolean>(false);

    const setUserTypingTrue = () => {
        setUserTyping(true);
    };

    const setUserTypingFalse = () => {
        setUserTyping(false);
    };

    const returnValues = {
        isUserTyping,
        setUserTypingTrue,
        setUserTypingFalse,
    };

    return (
        <UserTypingContext.Provider value={returnValues}>
            {children}
        </UserTypingContext.Provider>
    );
};

export default UserTyping;

export const useUserTypingContext = (): UserTypingContextReturnValues => {
    const context = useContext(UserTypingContext);

    if (!context)
        throw new Error(
            "User typing context must be used inside user typing provider!"
        );

    return context;
};
