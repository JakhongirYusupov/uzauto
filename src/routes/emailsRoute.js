import { Router } from "express";
import emailsController from "../controllers/emailsController.js";
import emailsMiddleware from "../middlewares/emailMiddleware.js"
import verifyToken from "../middlewares/verifytoken.js";

const route = Router();

route.post("/email", emailsMiddleware.POST, emailsController.POST);
route.put("/email", verifyToken, emailsMiddleware.POST, emailsController.UPDATE);

export default route