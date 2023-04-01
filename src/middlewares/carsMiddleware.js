import carsValidation from "../validations/cars.js";

const POST = (req, res, next) => {
  try {
    const { error } = carsValidation.POSTCARS(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}

const DELETE = (req, res, next) => {
  try {
    const { error } = carsValidation.DELETECARS(req.body)
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
    const { error } = carsValidation.UPDATECARS(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}



export default {
  UPDATE,
  POST,
  DELETE
}