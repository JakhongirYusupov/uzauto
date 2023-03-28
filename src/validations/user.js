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

export default {
  LOGIN,
  REGISTER
}