import { Router } from "express";
import usersController from "../../controllers/users/usersController.js";
import verifyToken from "../../middlewares/verifytoken.js";
import userMiddleware from "../../middlewares/userMiddleware.js";

const route = Router();

route.get("/users", verifyToken, usersController.GET);
route.post("/users", verifyToken, userMiddleware.REGISTER, usersController.POST);
route.put("/users", verifyToken, userMiddleware.UPDATE, usersController.UPDATE);
route.get("/users/login", verifyToken, userMiddleware.LOGIN, usersController.LOGIN);
route.delete("/users", verifyToken, usersController.DELETE);
route.put("/users/info", verifyToken, usersController.UPDATEUSERINFO)

export default route