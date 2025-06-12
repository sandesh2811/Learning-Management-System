import { NotificationsVariant } from "../../animation/variants";

import { useActiveState } from "@/hooks/useActiveState";

import Button from "@/components/ui/Button";
import { Span } from "@/components/ui/Span";

import { GoArrowUpRight, GoBell } from "react-icons/go";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";

const NotificationsContainer = () => {
    const { isActive, toggleActiveState, setActiveStateFalse } =
        useActiveState();

    const notificationRef = useRef<HTMLDivElement | null>(null);

    /* Close the notifications tab when clicked outside */
    useEffect(() => {
        const handleNotificationClose = (e: MouseEvent) => {
            /* Check if the element that is clicked is inside the referenced div or not and then negate the result */
            if (!notificationRef.current?.contains(e.target as Node)) {
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
        <div ref={notificationRef} className="relative flex flex-col">
            <Span
                onClick={toggleActiveState}
                className="bg-secondary-background rounded-full p-2"
            >
                <GoBell size={25} />
            </Span>

            <AnimatePresence>{!!isActive && <Notifications />}</AnimatePresence>
        </div>
    );
};

export default NotificationsContainer;

const Notifications = () => {
    const [notifications, setNotifications] = useState<string[]>([
        "Somebody purchased your course blah blah blah blah",
        "Somebody purchased your course",
    ]);

    return (
        <m.div
            variants={NotificationsVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            aria-label="Notifications"
            className="divide-primary-text/25 bg-background border-primary-text/30 inset-shadow-accent-foreground absolute top-15 -right-5 z-30 flex min-h-[45vh] w-[350px] flex-col justify-between gap-4 divide-y-[1.2px] rounded-sm border-[1.2px] p-6 shadow-xl"
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Notifications</h2>

                <div className="divide-primary-text/10 flex flex-col gap-4 divide-y-[1.2px]">
                    {notifications.map((notification, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <span
                                    tabIndex={0}
                                    className="cursor-pointer py-2"
                                >
                                    {notification}
                                </span>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {notifications.length < 6 ? (
                <Button
                    onClick={() => {
                        // test only
                        setNotifications([
                            ...notifications,
                            "Somebody purchased your course blah blah blah blah",
                        ]);
                    }}
                    disabled={notifications.length === 0}
                    className={`${notifications.length === 0 && "bg-primary-text/80"}`}
                >
                    Show more notifications
                </Button>
            ) : (
                <Span
                    onClick={() => console.log("Only test")}
                    className="group flex items-center justify-end gap-2"
                >
                    All notifications{" "}
                    <GoArrowUpRight className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Span>
            )}
        </m.div>
    );
};

Notifications.displayName = "Notifications";
