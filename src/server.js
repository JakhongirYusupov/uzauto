import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

import usersRoute from "./routes/usersRoute.js";
import emailsRoute from "./routes/emailsRoute.js";
import companyRoute from "./routes/companyRoute.js";
import carsRoute from "./routes/carsRoute.js";
import customerRoute from "./routes/customerRoute.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoute);
app.use(emailsRoute);
app.use(companyRoute);
app.use(carsRoute);
app.use(customerRoute);

app.listen(PORT, () =>
  console.log(`server is running http://localhost:${PORT}`)
);
