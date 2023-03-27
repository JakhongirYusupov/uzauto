import { verify } from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // console.log(req.headers);
  return next();
}

export default verifyToken