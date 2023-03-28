import { Router } from "express";
import emailsController from "../../controllers/emails/emailsController.js";
import emailsMiddleware from "../../middlewares/emailMiddleware.js"

const route = Router();

route.post("/email", emailsMiddleware.POST, emailsController.POST);

export default route