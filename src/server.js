import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT

import usersRoute from "./routes/users/usersRoute.js";
import emailsRoute from "./routes/emails/emailsRoute.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoute);
app.use(emailsRoute)

app.listen(PORT, () => console.log(`server is running http://localhost:${PORT}`));