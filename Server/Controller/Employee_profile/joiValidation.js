const Joi = require("joi");

const schema = Joi.object({
        pro_id: Joi.string().min(1).max(20).required().optional(),
        pro_name: Joi.string().min(5).max(50).required().optional(),
        age: Joi.number().required().optional(),
        gender: Joi.string().valid('male', 'female', 'other').required().optional(),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required().optional(), // Assuming a 10 digit mobile number
        address: Joi.string().min(5).max(50).required().optional(),
        salary: Joi.number().min(4).required().optional(),
        doj: Joi.date().optional(),
        dob: Joi.date().optional(),
        adhar_no: Joi.string().min(12).max(12).required().optional(), // Assuming Aadhar number is 12 digits
        emp_id: Joi.string().min(1).max(20).required().optional(),
        image: Joi.string().required().optional() 
});

const profileValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = profileValidation;
