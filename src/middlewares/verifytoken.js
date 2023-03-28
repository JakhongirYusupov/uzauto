import { verify } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import sql from "../database/responses.js";
import dotenv from 'dotenv';
dotenv.config();
const secret_key = process.env.SECRETKEY;

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const key = secret_key + req.headers['user-agent'];

      const data = jwt.verify(token, key);
      const user = await sql.TOKENVERIFY([data.id, data.username, data.email_id]);
      if (user.length) req.user = user[0];
      return next();
    }
    next();

  } catch (error) {
    console.log(error.message);
    return next();
  }
}

export default verifyToken