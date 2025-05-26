import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface handleInputValueChangeProps {
    setSearchValue: Dispatch<SetStateAction<string>>;
    setUserTypingTrue: () => void;
}

const handleInputValueChange =
    ({ setSearchValue, setUserTypingTrue }: handleInputValueChangeProps) =>
    (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        setUserTypingTrue();
    };

export default handleInputValueChange;
