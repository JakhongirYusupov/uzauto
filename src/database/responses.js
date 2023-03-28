import { DataRowMessage } from 'pg-protocol/dist/messages.js';
import pool from './pg.js'

const LOGIN = async (data) => {
  try {
    const { email, password } = data;
    const { rows } = await pool.query(`select id from emails where email = $1`, [email]);
    const user = await pool.query(`select id, username, email_id, age, role from users where email_id = $1 and password = $2`, [rows[0].id, password]);
    return user.rows[0]

  } catch (error) {
    return error.message
  }
}

const TOKENVERIFY = async (data) => {
  try {
    const { rows } = await pool.query(`select id, username, email_id, age, role from users where id = $1 and username = $2 and email_id = $3`, data);
    return rows

  } catch (error) {
    return error.message
  }
}

const POSTEMAIL = async (data) => {
  try {
    await pool.query(`insert into emails(email) values ($1)`, data);
    const { rows } = await pool.query(`select id from emails where email = $1`, data);
    return rows

  } catch (error) {
    return error.message
  }
}

export default {
  LOGIN,
  TOKENVERIFY,
  POSTEMAIL
}