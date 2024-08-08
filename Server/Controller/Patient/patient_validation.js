const Joi = require("joi");

const schema = Joi.object({
        p_id: Joi.string().min(1).max(20).required(),
        p_name: Joi.string().min(5).max(50).required(),
        age: Joi.number().required(),
        gender: Joi.string().valid('male', 'female', 'other').required().optional(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
        city:Joi.string().min(3).max(50).required(),
        symptoms:Joi.string().min(5).max(50).required(),
});

const patient_Validation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = patient_Validation;
