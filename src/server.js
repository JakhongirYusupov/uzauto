import express from "express";
import cors from 'cors';
import http from 'http';
import dotenv from "dotenv";
import usersRoute from "./routes/users/usersRoute.js";
dotenv.config();

const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoute);

app.listen(PORT, () => console.log(`server is running http://localhost:${PORT}`));