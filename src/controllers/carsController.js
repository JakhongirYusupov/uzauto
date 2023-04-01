import pool from "../database/pg.js";
import sql from "../database/responses.js";

export default {
  POST: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 400, message: "You are not login!" });
      if (user.role === "admin" && user.company_id) {
        await sql.POSTCAR(
          {
            ...req.body,
            created_by: user.id,
            company_id: user.company_id,
          },
          res
        );
        return;
      }
      return res.json({
        status: 400,
        message: "Only company's admin can add cars!",
      });
    } catch (error) {
      return res.json(error);
    }
  },

  UPDATE: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 400, message: "You are not login!" });
      if (user.role === "admin" && user.company_id) {
        await sql.UPDATECAR({ ...req.body, company_id: user.company_id }, res);
        return;
      }
      return res.json({
        status: 400,
        message: "Only company's admin can update cars!",
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },

  DELETE: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 400, message: "You are not login!" });
      if (user.role === "admin" && user.company_id) {
        await sql.DELETECARS({ ...req.body, company_id: user.company_id }, res);
        return;
      }
      return res.json({
        status: 400,
        message: "Only company's admin can delete cars!",
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },

  GET: async (req, res) => {
    try {
      const { company_id } = req.params;
      console.log(company_id);

      const data = (
        await pool.query(`select * from cars where company_id=$1`, [company_id])
      ).rows;

      return res.json({ status: 200, data });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
  GETCOMPANY: async (req, res) => {
    try {
      const { id } = req.params;

      const data = (
        await pool.query(
          `select c.name as car_name, co.title as company_name from cars c inner join company co on c.company_id = co.id where c.id=$1`,
          [id]
        )
      ).rows;

      return res.json({ status: 200, data });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
};
