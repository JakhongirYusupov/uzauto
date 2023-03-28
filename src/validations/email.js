import Joi from "joi";

const POST = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(50).required()
  })
  return schema.validate(data)
};

export default {
  POST
}