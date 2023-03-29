import pool from './pg.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret_key = process.env.SECRETKEY;

const LOGIN = async (data) => {
  try {
    const { email, password } = data;
    const { rows } = await pool.query(`select id from emails where email = $1`, [email]);
    const user = await pool.query(`select id, username, email_id, age, role from users where email_id = $1 and password = $2`, [rows[0].id, password]);
    return user.rows[0]

  } catch (error) {
    console.log(error);
    return error.message
  }
}

const REGISTER = async (data) => {
  try {
    await pool.query(`insert into users(username, email_id, age, password) values($1, $2, $3, $4)`, [data.username, data.email_id, data.age, data.password]);
    const { rows } = await pool.query(`select id, username, email_id, age, role from users where email_id = $1 and password = $2`, [data.email_id, data.password]);
    return rows
  } catch (error) {
    console.log(error);
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

const GETUSERS = async (data) => {
  try {
    if (data == "owner") {
      const { rows } = await pool.query(`select id, username, email_id, age, role from users`);
      return rows
    }
    const { rows } = await pool.query(`select id, username, email_id, age from users where role = 'user'`);
    return rows

  } catch (error) {
    console.log(error);
    return error.message
  }
}

const UPDATEUSER = async (data) => {
  try {
    let { id, username, email_id, age, password } = data;
    const getOne = await pool.query('select id, username, email_id, age, password, role from users where id = $1', [id])
    username = username ? username : getOne.rows[0].username
    email_id = email_id ? email_id : getOne.rows[0].email_id
    age = age ? age : getOne.rows[0].age
    password = password ? jwt.sign(password, secret_key) : getOne.rows[0].password;

    const res = await pool.query(`update users set username = $1, email_id = $2, password = $3, age = $4 where id = $5
    `, [username, email_id, password, age, id]);

    if (res.command === "UPDATE") return { id, username, email_id, age, role: getOne.rows[0].role }
    return null;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

const DELETEUSER = async (id) => {
  try {
    const res = await pool.query(`delete from emails where id = $1`, [id]);
    return res
  } catch (error) {
    console.log(error);
    return error.message
  }
}

const UPDATEEMAIL = async (data) => {
  try {
    const rows = await pool.query(`update emails set email = $1 where id = $2`, data);
    return rows
  } catch (error) {
    console.log(error);
    return error.message
  }
}

const CREATECOMPANY = async ({ title, email_id, address, created_by }) => {
  try {
    const res = await pool.query(`insert into company(title, email_id, address, created_by) values($1, $2, $3, $4)`, [title, email_id, address, created_by]);
    const { rows } = await pool.query(`select * from company where email_id = $1`, [email_id]);
    return res && rows[0]
  } catch (error) {
    console.log(error);
    return error
  }
}

const UPDATECOMPANY = async ({ id, title, email_id, address, created_by }, res) => {
  try {
    let getOne = await pool.query('select * from company where id = $1', [id]);
    if (!getOne.rows[0]) return res.send("Company not found!")

    title = title ? title : getOne.rows[0].title
    email_id = email_id ? email_id : getOne.rows[0].email_id
    address = address ? address : getOne.rows[0].address
    created_by = created_by ? created_by : getOne.rows[0].created_by

    const data = await pool.query(`update company set title = $1, email_id = $2, address = $3, created_by = $4 where id = $5
    `, [title, email_id, address, created_by, id]);
    const company = await pool.query('select * from company where id = $1', [id]);
    if (data.command === "UPDATE") return res.json({ status: 200, message: "Updated company!!!", data: company });
    return res.json({ status: 400, message: "Company did not update!" });
  } catch (error) {
    console.log(error);
    return error.message
  }
}

export default {
  LOGIN,
  TOKENVERIFY,
  POSTEMAIL,
  REGISTER,
  GETUSERS,
  UPDATEUSER,
  DELETEUSER,
  UPDATEEMAIL,
  CREATECOMPANY,
  UPDATECOMPANY
}