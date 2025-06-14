"use client";

import { setUserVisitedRoute } from "@/store/route/userVisitedRoute";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

const RouteChangeTracker = () => {
    const routeRef = useRef<string | null>(null);
    const pathname = usePathname();

    const dispatch = useDispatch();
    useEffect(() => {
        if (routeRef.current && routeRef.current !== pathname) {
            // set the route in redux
            dispatch(setUserVisitedRoute(routeRef.current));
        }

        routeRef.current = pathname;
    }, [pathname, dispatch]);

    return null;
};

export default RouteChangeTracker;
