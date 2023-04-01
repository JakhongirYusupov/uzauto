import jwt from "jsonwebtoken";
import sql from "../database/responses.js";
import dotenv from "dotenv";
import pool from "../database/pg.js";
dotenv.config();

const secret_key = process.env.SECRETKEY;

export default {
  POST: async (req, res) => {
    try {
      if (req.user) return res.json({ message: "You are already registered!" });
      const body = req.body;
      const key = secret_key + req.headers["user-agent"];
      body.password = jwt.sign(body.password, secret_key);
      const [user] = await sql.REGISTER(body);
      const token = jwt.sign(user, key, { expiresIn: "15d" });
      return res.json({
        status: 200,
        message: "Successfull registered!",
        data: user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },

  LOGIN: async (req, res) => {
    try {
      if (req.user) return res.json({ message: "You are already login!" });
      const key = secret_key + req.headers["user-agent"];
      req.body.password = jwt.sign(req.body.password, secret_key);
      const user = await sql.LOGIN(req.body);
      if (user) {
        const token = jwt.sign(user, key, { expiresIn: "10d" });
        return res.json({
          status: 200,
          message: "Seccesfull login!",
          data: user,
          token,
        });
      }

      return res.json({ status: 404, message: "Email or password wrong!" });
    } catch (error) {
      console.log(error);
      res.json({
        status: 400,
        message: "Email or password wrong!",
        error: error.message,
      });
    }
  },

  GET: async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      if (user && user?.role === "owner")
        return res.json(await sql.GETUSERS("owner"));
      return res.json(await sql.GETUSERS());
    } catch (error) {
      res.json({ status: 400, message: error.message });
    }
  },

  UPDATE: async (req, res) => {
    try {
      const key = secret_key + req.headers["user-agent"];
      const user = req.user;
      const data = req.body;

      if (!user)
        return res.json({ status: 404, message: "You are not login!" });
      if (user.id !== data.id) {
        return res.json({ status: 400, message: "This user not you!" });
      }
      const updateUser = await sql.UPDATEUSER(data);
      delete updateUser.password;

      if (updateUser) {
        const token = jwt.sign(updateUser, key, { expiresIn: "15d" });
        delete updateUser.role;
        return res.json({
          status: 200,
          message: "Updated",
          data: updateUser,
          token,
        });
      }
      return res.send(updateUser);
    } catch (error) {
      console.log(error.message);
      res.json({ status: 400, message: error.message });
    }
  },

  DELETE: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 404, message: "You are not login!" });
      const data = await sql.DELETEUSER(user.email_id);
      return data && res.json({ status: 200, message: "Successfull deleted!" });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },

  UPDATEUSERINFO: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 404, message: "You are not login!" });
      else if (user.role !== "owner") {
        return res.json({
          status: 400,
          message: "Only owner can update user, You are not owner!",
        });
      }
      await sql.UPDATEUSERINFO(req.body, res);
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },

  GETCOMPANYID: async (req, res) => {
    try {
      const { companyid } = req.params;
      const data = await pool.query(
        `select id, username, email_id, age, company_id from users where company_id = $1`,
        [companyid]
      );
      return res.json({ status: 200, data: data.rows });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },

  PUTSESSION: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 404, message: "You are not login!" });
      pool.query(
        `update session set end_at = current_timestamp where user_id = $1`,
        [user.id]
      );
      return res.json({ status: 200, message: "User's session updated!" });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },

  GETSESSION: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await pool.query(
        `select u.username, u.email_id, u.age, u.company_id, u.role, s.start_at, s.end_at from session s inner join users u on s.user_id = u.id where s.user_id = $1`,
        [id]
      );

      return res.json({ status: 200, data: data.rows[0] });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },
};
