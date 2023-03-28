import { Router } from "express";
import usersController from "../../controllers/users/usersController.js";
import verifyToken from "../../middlewares/verifytoken.js";
import userMiddleware from "../../middlewares/userMiddleware.js";

const route = Router();

route.post("/users", verifyToken, userMiddleware.REGISTER, usersController.POST);
route.get("/users/login", verifyToken, userMiddleware.LOGIN, usersController.LOGIN)

export default route