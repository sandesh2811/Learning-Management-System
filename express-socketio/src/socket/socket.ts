import { connectRedisPubSub, pubClient, subClient } from "../redis/redis";

import http from "http";
import express from "express";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

const app = express();

/* Create http server with app configs */
const server = http.createServer(app);

let io: Server | null = null;

/* Connect to redis pub sub */
(async () => {
    await connectRedisPubSub();
})();

/* Initialize socket function */
const initializeSocket = () => {
    if (!io) {
        io = new Server(server, {
            adapter: createAdapter(pubClient, subClient),
            cors: {
                origin: "http://localhost:3000",
                allowedHeaders: ["GET", "POST", "DELETE"],
                credentials: true,
            },
        });

        io.on("connect", async (socket) => {
            console.log(`Connected Successfully! with ${socket.id}`);

            socket.on("disconnect", () => {
                console.log(
                    `User with socket id : ${socket.id} has disconnected!`
                );
            });
        });
    }
};

export { io, app, server, initializeSocket };
