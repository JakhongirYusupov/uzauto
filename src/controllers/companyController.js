import jwt from "jsonwebtoken";
import sql from "../database/responses.js";
import dotenv from "dotenv";
import pool from "../database/pg.js";
dotenv.config();

const secret_key = process.env.SECRETKEY;

export default {
  POST: async (req, res) => {
    try {
      const user = req.user;

      if (!user)
        return res.json({ status: 404, message: "You are not login!" });
      else if (user.role !== "owner") {
        return res.json({
          status: 400,
          message: "Only owner can create company, You are not owner!",
        });
      }

      const data = await sql.CREATECOMPANY(req.body);
      if (data.severity !== "ERROR")
        return res.json({ status: 201, message: "Company created", data });
      return res.json({ status: 400, message: "Company did not create" });
    } catch (error) {
      console.log(error.message);
      res.json({ status: 400, message: error.message });
    }
  },

  UPDATE: async (req, res) => {
    try {
      const user = req.user;

      if (!user)
        return res.json({ status: 404, message: "You are not login!" });
      else if (user.role !== "owner" && user.role !== "admin") {
        return res.json({
          status: 400,
          message: "Only owner or admin can update company, You are a user!",
        });
      }

      const error = await sql.UPDATECOMPANY(req.body, res);
      if (error)
        return res.json({
          status: 400,
          message: "Company did not update!",
          error: error.message,
        });
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
      else if (user.role !== "owner" && user.role !== "admin") {
        return res.json({
          status: 400,
          message: "Only owner or admin can delete company, You are a user!",
        });
      }

      const error = await sql.DELETECOMPANY(req.body, res);
      if (error)
        return res.json({
          status: 400,
          message: "Company did not delete!",
          error: error.message,
        });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },

  GET: async (req, res) => {
    try {
      const { email_id } = req.params;
      const data = (
        await pool.query(
          `select c.id, c.title, c.email_id, c.address, c.created_by, e.email from company c inner join emails e on e.id = c.email_id  where email_id=$1`,
          [email_id]
        )
      ).rows;
      return res.json({ status: 200, data });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  },
};
