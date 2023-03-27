import { Router } from "express";
import userscontroller from "../../controllers/users/usersController.js";
import verifyToken from "../../middlewares/verifytoken.js";

const route = Router();

route.post("/users", verifyToken, userscontroller.POST);

export default route