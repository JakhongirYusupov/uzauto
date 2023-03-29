import jwt from 'jsonwebtoken';
import sql from '../database/responses.js';
import dotenv from 'dotenv';
dotenv.config();

const secret_key = process.env.SECRETKEY;

export default {
  POST: async (req, res) => {
    try {
      if (req.user) return res.json({ message: "You are already registered!" });
      const body = req.body;
      const key = secret_key + req.headers['user-agent'];
      body.password = jwt.sign(body.password, secret_key);
      const [user] = await sql.REGISTER(body);
      const token = jwt.sign(user, key, { expiresIn: "15d" });
      return res.json({
        status: 200,
        message: "Successfull registered!",
        data: user,
        token
      })
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message })
    }
  },

  LOGIN: async (req, res) => {
    try {
      if (req.user) return res.json({ message: "You are already login!" })
      const key = secret_key + req.headers['user-agent'];
      req.body.password = jwt.sign(req.body.password, secret_key);
      const user = await sql.LOGIN(req.body);
      if (user) {
        const token = jwt.sign(user, key, { expiresIn: "10d" });
        return res.json({
          status: 200,
          message: "Seccesfull login!",
          data: user,
          token
        });
      }

      return res.json({ status: 404, message: "Email or password wrong!" })
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: "Email or password wrong!", error: error.message })
    }
  },

  GET: async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      if (user && user?.role === "owner") return res.json(await sql.GETUSERS("owner"));
      return res.json(await sql.GETUSERS());
    } catch (error) {
      res.json({ status: 400, message: error.message })
    }
  },

  UPDATE: async (req, res) => {
    try {
      const key = secret_key + req.headers['user-agent'];
      const user = req.user;
      const data = req.body;

      if (!user) return res.json({ status: 404, message: "You are not login!" });
      if (user.id !== data.id) {
        return res.json({ status: 400, message: "This user not you!" });
      };
      const updateUser = await sql.UPDATEUSER(data);
      delete updateUser.password

      if (updateUser) {
        const token = jwt.sign(updateUser, key, { expiresIn: "15d" });
        delete updateUser.role;
        return res.json({ status: 200, message: "Updated", data: updateUser, token })
      }
      return res.send(updateUser)
    } catch (error) {
      console.log(error.message);
      res.json({ status: 400, message: error.message });
    }
  },

  DELETE: async (req, res) => {
    try {
      const user = req.user;
      if (!user) return res.json({ status: 404, message: "You are not login!" });
      const data = await sql.DELETEUSER(user.email_id);
      return data && res.json({ status: 200, message: "Successfull deleted!" })
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message })
    }
  },

  UPDATEUSERINFO: async (req, res) => {
    const user = req.user;
    console.log(user);
    console.log(req.body);
  }
}