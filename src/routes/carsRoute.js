import { Router } from "express";
import verifyToken from "../middlewares/verifytoken.js";
import carsMiddlewares from "../middlewares/carsMiddleware.js";
import carsController from "../controllers/carsController.js";

const route = Router();

route.get("/cars/:company_id", carsController.GET);
route.get("/cars/company/:id", carsController.GETCOMPANY);
route.post("/cars", verifyToken, carsMiddlewares.POST, carsController.POST);
route.put("/cars", verifyToken, carsMiddlewares.UPDATE, carsController.UPDATE);
route.delete(
  "/cars",
  verifyToken,
  carsMiddlewares.DELETE,
  carsController.DELETE
);

export default route;
