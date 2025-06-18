"use client";

import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

import { useState } from "react";

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState<
        number | null
    >(null);

    return (
        <div className="relative flex h-[80vh]">
            <Sidebar
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
            />
            <MessageContainer selectedConversation={selectedConversation} />
        </div>
    );
};

export default Messages;
