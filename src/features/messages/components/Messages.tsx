"use client";

import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useState } from "react";

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState<number>(0);

    return (
        <div className="relative flex h-[80vh]">
            <Sidebar
                isActive={true}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
            />
            <MessageContainer isActive={true} />
        </div>
    );
};

export default Messages;
