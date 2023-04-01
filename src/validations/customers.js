import Joi from "joi";

const POSTCUSTOMER = (data) => {
  const schema = Joi.object({
    car_id: Joi.number().required(),
    company_id: Joi.number().required(),
  });

  return schema.validate(data);
};

const DELETECUSTOMER = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  return schema.validate(data);
};

export default {
  POSTCUSTOMER,
  DELETECUSTOMER,
};
