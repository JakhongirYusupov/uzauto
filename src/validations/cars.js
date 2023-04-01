import Joi from "joi";

const POSTCARS = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    price: Joi.number().required(),
    color: Joi.string().min(2).max(50).required(),
    brand: Joi.string().min(3).max(100).required(),
  });
  return schema.validate(data);
};

const UPDATECARS = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(2).max(50),
    price: Joi.number(),
    color: Joi.string().min(2).max(50),
    brand: Joi.string().min(3).max(100),
  });
  return schema.validate(data);
};

const DELETECARS = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  return schema.validate(data);
};

export default {
  POSTCARS,
  UPDATECARS,
  DELETECARS,
};
