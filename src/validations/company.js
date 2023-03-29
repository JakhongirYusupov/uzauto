import Joi from "joi";

const POST = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    email_id: Joi.number().required(),
    address: Joi.string().min(3).max(200).required(),
    created_by: Joi.number().required()
  })
  return schema.validate(data)
};
const UPDATE = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(3).max(100),
    email_id: Joi.number(),
    address: Joi.string().min(3).max(200),
    created_by: Joi.number()
  })
  return schema.validate(data)
};

export default {
  POST,
  UPDATE
}