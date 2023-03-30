import jwt from 'jsonwebtoken';
import sql from '../database/responses.js';
import dotenv from 'dotenv';
dotenv.config();

const secret_key = process.env.SECRETKEY;

export default {
  POST: async (req, res) => {
    try {
      const user = req.user;

      if (!user) return res.json({ status: 404, message: "You are not login!" });
      else if (user.role !== "owner") {
        return res.json({ status: 400, message: "Only owner can create company, You are not owner!" });
      }

      const data = await sql.CREATECOMPANY(req.body);
      if (data.severity !== "ERROR") return res.json({ status: 201, message: "Company created", data });
      return res.json({ status: 400, message: "Company did not create" });
    } catch (error) {
      console.log(error.message);
      res.json({ status: 400, message: error.message });
    }
  },

  UPDATE: async (req, res) => {
    try {
      const user = req.user;

      if (!user) return res.json({ status: 404, message: "You are not login!" });
      else if (user.role !== "owner" && user.role !== "admin") {
        return res.json({ status: 400, message: "Only owner or admin can update company, You are a user!" });
      }

      const error = await sql.UPDATECOMPANY(req.body, res);
      if (error) return res.json({ status: 400, message: "Company did not update!", error: error.message })
    } catch (error) {
      console.log(error.message);
      res.json({ status: 400, message: error.message });
    }
  },

  DELETE: async (req, res) => {
    try {
      const user = req.user;

      if (!user) return res.json({ status: 404, message: "You are not login!" });
      else if (user.role !== "owner" && user.role !== "admin") {
        return res.json({ status: 400, message: "Only owner or admin can delete company, You are a user!" });
      };

      const error = await sql.DELETECOMPANY(req.body, res);
      if (error) return res.json({ status: 400, message: "Company did not delete!", error: error.message })

    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  }
}