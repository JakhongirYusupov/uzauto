import { Router } from "express";
import tokenVerify from "../middlewares/verifytoken.js";
import customerMiddleware from "../middlewares/customerMiddleware.js";
import customerController from "../controllers/customerController.js";

const route = Router();

route.post(
  "/customer",
  tokenVerify,
  customerMiddleware.POST,
  customerController.POST
);
route.delete(
  "/customer",
  tokenVerify,
  customerMiddleware.DELETE,
  customerController.DELETE
);

route.get("/customer/:id", customerController.GET);

export default route;
