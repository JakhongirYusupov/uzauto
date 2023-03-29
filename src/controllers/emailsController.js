import sql from '../database/responses.js';
import dotenv from 'dotenv';
dotenv.config();

export default {
  POST: async (req, res) => {
    try {
      const { email } = req.body;
      const data = await sql.POSTEMAIL([email]);
      return res.json(data)
    } catch (error) {
      res.send(error.message);
    }
  },

  UPDATE: async (req, res) => {
    try {
      const user = req.user;
      const { email } = req.body;
      if (!user) return res.json({ status: 404, message: "You are not login!" });
      const data = await sql.UPDATEEMAIL([email, user.email_id]);
      if (data) return res.json({ status: 200, message: "Email successfull updated!" });
      return res.json({ status: 400, message: "Email did not update!" });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}