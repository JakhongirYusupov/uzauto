import emailValidation from '../validations/email.js';

const POST = (req, res, next) => {
  try {
    const { error } = emailValidation.POST(req.body)
    if (error) {
      return res.status(400).json({ msg: error.details[0].message })
    }
    next()
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  POST
}