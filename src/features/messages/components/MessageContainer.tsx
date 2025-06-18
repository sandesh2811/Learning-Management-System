"use client";

import { SettingsVariant } from "../animation/variants";

import { useActiveState } from "@/hooks/useActiveState";

import Button from "@/components/ui/Button";
import { Span } from "@/components/ui/Span";
import { Switch } from "@/components/ui/switch";

import { CiChat1 } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { GoArrowUpRight, GoKebabHorizontal } from "react-icons/go";

interface MessageContainerProps {
    selectedConversation: number | null;
}

const MessageContainer = ({ selectedConversation }: MessageContainerProps) => {
    return (
        <div
            className={`border-primary-text/10 flex-1 flex-col justify-between gap-6 overflow-y-auto rounded-r-md border-t-[1.2px] border-r-[1.2px] border-b-[1.2px] p-4 lg:px-6 ${selectedConversation !== null && "flex"}`}
        >
            {selectedConversation !== null ? (
                <>
                    <MessageContainerHeader />
                    <MessageContainerBody />
                    <MessageContainerFooter />
                </>
            ) : (
                <FallbackUI />
            )}
        </div>
    );
};

export default MessageContainer;

/* FALLBACK UI COMPONENT */

const FallbackUI = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <CiChat1 size={80} className="text-primary-text/80" />
            <h2 className="text-primary-text/80 text-5xl font-semibold">
                No conversation selected
            </h2>
            <span className="text-primary-text/60 text-lg">
                Tap on a conversation to start a conversation
            </span>
        </div>
    );
};

/* MESSAGE CONTAINER HEADER COMPONENT */

const MessageContainerHeader = () => {
    return (
        <div className="border-primary-text/10 flex items-center justify-between border-b-[1.2px] pb-2">
            <div className="flex items-center gap-2">
                {/* USER INFO */}

                <div className="flex items-center gap-4">
                    <span className="bg-primary-text size-8 rounded-full"></span>
                    <h2 className="text-xl font-medium">Ram Bahadur</h2>
                </div>

                {/* ACTIVE STATUS INDICATOR */}

                <span className="size-2 rounded-full bg-green-600" />
            </div>

            {/* SETTINGS DROPDOWN */}

            <SettingsDropdown />
        </div>
    );
};

/* SETTINGS DROPDOWN COMPONENT */

const SettingsDropdown = () => {
    /* Get the active state */
    const { isActive, toggleActiveState, setActiveStateFalse } =
        useActiveState();

    const [checked, setChecked] = useState<boolean>(true);
    const settingsRef = useRef<HTMLDivElement | null>(null);

    /* Handle outside click */
    useEffect(() => {
        const handleNotificationClose = (e: MouseEvent) => {
            if (!settingsRef.current?.contains(e.target as Node)) {
                setActiveStateFalse();
            }
        };

        if (isActive) {
            document.addEventListener("click", handleNotificationClose, true);
        }

        return () => {
            document.removeEventListener(
                "click",
                handleNotificationClose,
                true
            );
        };
    }, [isActive, setActiveStateFalse]);

    return (
        <div ref={settingsRef} className="relative">
            <Span onClick={toggleActiveState}>
                <GoKebabHorizontal size={22} />
            </Span>

            <AnimatePresence>
                {!!isActive && (
                    <m.div
                        variants={SettingsVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="bg-background border-primary-text/10 absolute top-5 right-5 flex min-h-[5vh] w-[250px] items-center justify-center gap-4 rounded-sm border-[1.2px] shadow-lg"
                    >
                        <label htmlFor="notifications">
                            Enable notifications
                        </label>
                        <Switch
                            id="notifications"
                            checked={checked}
                            onCheckedChange={() => setChecked(!checked)}
                            className="cursor-pointer"
                        />
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* MESSAGE CONTAINER BODY COMPONENT */

const MessageContainerBody = () => {
    const isSender = false;

    return (
        <div className="flex h-[55vh] flex-col gap-6 overflow-y-auto">
            <div
                className={`flex w-[60%] ${isSender ? "justify-end self-end" : "justify-start self-start"}`}
            >
                <span
                    className={`bg-secondary-background rounded-sm p-4 font-medium`}
                >
                    This is a demo message
                </span>
            </div>
        </div>
    );
};

/* MESSAGE CONTAINER FOOTER COMPONENT */

const MessageContainerFooter = () => {
    const [message, setMessage] = useState<string>("");

    return (
        <div className="border-primary-text/10 flex items-center justify-between gap-2 border-t-[1.2px] pt-4">
            <input
                className="border-primary-text/30 w-full rounded-sm border-[1.2px] p-2 text-sm"
                type="text"
                name="message-input"
                placeholder="Enter your message here..."
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                className={`w-[150px] rounded-sm p-2 ${message === "" ? "bg-primary-text/80" : "bg-primary-text"}`}
            >
                <GoArrowUpRight size={22} />
            </Button>
        </div>
    );
};
