import customerValidation from "../validations/customers.js";

const POST = (req, res, next) => {
  try {
    const { error } = customerValidation.POSTCUSTOMER(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const DELETE = (req, res, next) => {
  try {
    const { error } = customerValidation.DELETECUSTOMER(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const UPDATE = (req, res, next) => {
  try {
    const { error } = customerValidation.UPDATECUSTOMER(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  UPDATE,
  POST,
  DELETE,
};
