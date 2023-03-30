import companyValidation from '../validations/company.js';

const POST = (req, res, next) => {
  try {
    const { error } = companyValidation.POST(req.body)
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
    const { error } = companyValidation.UPDATE(req.body)
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
    const { error } = companyValidation.DELETE(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  POST,
  UPDATE,
  DELETE
}