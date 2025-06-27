import { app, server, initializeSocket } from "./socket/socket";

import dotenv from "dotenv";

/* For env variables */
dotenv.config();

import cors from "cors";
import express from "express";

/* Middlewares */

/* For CORS */
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET , POST , PUT ,DELETE , PATCH , HEAD"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */

app.get("/", (req, res) => {
    res.status(200).json({ message: "Express with socket!" });
});

/* Initialize socket */
initializeSocket();

server.listen(process.env.PORT, async () => {
    console.log(`Server is running in port : ${process.env.PORT}`);
});
