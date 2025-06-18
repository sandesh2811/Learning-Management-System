"use client";

import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

import { useState } from "react";

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState<
        number | null
    >(null);
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

    return (
        <div className="relative flex h-[80vh]">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
            />

            <MessageContainer
                setSidebarOpen={setSidebarOpen}
                selectedConversation={selectedConversation}
            />
        </div>
    );
};

export default Messages;
