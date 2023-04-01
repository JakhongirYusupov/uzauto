import { Router } from "express";
import companyController from "../controllers/companyController.js";
import companyMiddleware from "../middlewares/companyMiddleware.js";
import verifyToken from "../middlewares/verifytoken.js";

const route = Router();

route.post(
  "/company",
  verifyToken,
  companyMiddleware.POST,
  companyController.POST
);
route.put(
  "/company",
  verifyToken,
  companyMiddleware.UPDATE,
  companyController.UPDATE
);
route.delete(
  "/company",
  verifyToken,
  companyMiddleware.DELETE,
  companyController.DELETE
);
route.get("/company/:email_id", companyController.GET);

export default route;
