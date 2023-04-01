import { Router } from "express";
import usersController from "../controllers/usersController.js";
import verifyToken from "../middlewares/verifytoken.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const route = Router();

route.get("/users", verifyToken, usersController.GET);
route.get("/users/:companyid", usersController.GETCOMPANYID);
route.post(
  "/users",
  verifyToken,
  userMiddleware.REGISTER,
  usersController.POST
);
route.put("/users", verifyToken, userMiddleware.UPDATE, usersController.UPDATE);
route.post(
  "/users/login",
  verifyToken,
  userMiddleware.LOGIN,
  usersController.LOGIN
);
route.delete("/users", verifyToken, usersController.DELETE);
route.put(
  "/users/info",
  verifyToken,
  userMiddleware.UPDATEUSERINFO,
  usersController.UPDATEUSERINFO
);
route.put("/users/session", verifyToken, usersController.PUTSESSION);
route.get("/users/session/:id", usersController.GETSESSION);

export default route;
