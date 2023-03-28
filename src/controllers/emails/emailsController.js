import sql from '../../database/responses.js';
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
}