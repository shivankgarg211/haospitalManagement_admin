const Joi = require("joi");

const schema = Joi.object({
        // pro_id: Joi.string().min(1).max(20).required().optional(),
        name: Joi.string().min(2).max(50).required().optional(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required().optional(), // Assuming a 10 digit mobile number
        gender: Joi.string().valid('male', 'female', 'other').required().optional(),
        age: Joi.number().required().optional(),
        symptoms:Joi.string().min(0).max(50).required().optional(),
        appointment_date:Joi.date().optional(),
        email:Joi.string().min(5).max(50).required(),
});

const patientValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = patientValidation;
