import pool from "../database/pg.js";
import sql from "../database/responses.js";

export default {
  POST: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 400, message: "You are not login!" });

      await sql.POSTCUSTOMER({ ...req.body, user_id: user.id }, res);
    } catch (error) {
      return res.json(error);
    }
  },

  DELETE: async (req, res) => {
    try {
      const user = req.user;
      if (!user)
        return res.json({ status: 400, message: "You are not login!" });

      await sql.DELETECUSTOMER({ ...req.body, user_id: user.id }, res);
    } catch (error) {
      return res.json(error);
    }
  },

  GET: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await pool.query(
        `select u.username, u.email_id, u.age, u.company_id, c.name as car_name, co.title as company_name from customers cu
        inner join users u on cu.user_id = u.id inner join company co on u.company_id = co.id inner join cars c on c.id = cu.car_id where cu.user_id = $1`,
        [id]
      );

      return res.json({ status: 200, data: data.rows[0] });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
};
