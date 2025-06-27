import { createClient } from "redis";

/* For redis publisher */
export const pubClient = createClient();

pubClient.on("connect", () => {
    console.log("Pub client connected successfully!");
});

pubClient.on("error", () => {
    console.log("Couldn't connect to redis!");
});

/* For redis subscriber */
export const subClient = pubClient.duplicate();

subClient.on("connect", () => {
    console.log("Sub client connected successfully!");
});

subClient.on("error", () => {
    console.log("Couldn't connect to redis!");
});

/* For connecting to redis pubsub */
export const connectRedisPubSub = async () => {
    try {
        if (!pubClient.isOpen) {
            await pubClient.connect();
        }

        if (!subClient.isOpen) {
            await subClient.connect();
        }
    } catch (error) {
        console.log("Couldn't setup PubSub connection!", error);
        process.exit(1);
    }
};
