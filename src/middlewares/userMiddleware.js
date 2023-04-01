import userValidation from "../validations/user.js";

const LOGIN = (req, res, next) => {
  try {
    const { error } = userValidation.LOGIN(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}

const REGISTER = (req, res, next) => {
  try {
    const { error } = userValidation.REGISTER(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}

const UPDATE = (req, res, next) => {
  try {
    const { error } = userValidation.UPDATE(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}
const UPDATEUSERINFO = (req, res, next) => {
  try {
    const { error } = userValidation.UPDATEUSERINFO(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  LOGIN,
  REGISTER,
  UPDATE,
  UPDATEUSERINFO
}