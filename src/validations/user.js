import Joi from "joi";

const LOGIN = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(50).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })
  return schema.validate(data)
};

const REGISTER = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email_id: Joi.number().required(),
    age: Joi.number().min(16).max(90).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })
  return schema.validate(data)
};

const UPDATE = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().min(3).max(50),
    email_id: Joi.number(),
    age: Joi.number().min(16).max(90),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })
  return schema.validate(data)
};

const UPDATEUSERINFO = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    company_id: Joi.number(),
    role: Joi.string().valid("admin", "user", "owner")
  })
  return schema.validate(data)
};



export default {
  LOGIN,
  REGISTER,
  UPDATE,
  UPDATEUSERINFO
}