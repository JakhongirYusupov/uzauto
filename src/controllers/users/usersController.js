import jwt from 'jsonwebtoken';
import sql from '../../database/responses.js';
import dotenv from 'dotenv';
dotenv.config();

const secret_key = process.env.SECRETKEY;

export default {
  POST: (req, res) => {
    try {
      if (req.user) return res.json({ message: "You are already registered!" });
      const data = req.body;
      console.log([...data]);
      res.send("ok")
    } catch (error) {
      res.send(error.message)
    }
  },

  LOGIN: async (req, res) => {
    try {
      if (req.user) return res.json({ message: "You are already login!" })
      const key = secret_key + req.headers['user-agent'];
      const user = await sql.LOGIN(req.body);
      const token = jwt.sign(user, key, { expiresIn: "10d" });
      return res.json({
        status: 200,
        message: "Seccesfull login!",
        token
      });
    } catch (error) {
      res.send(error.message)
    }
  }
}