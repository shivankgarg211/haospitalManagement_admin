const Joi = require("joi");

const schema = Joi.object({
        emp_id: Joi.string().min(1).max(20).required(),
        emp_name: Joi.string().min(5).max(50).required(),
        dept_id:Joi.string().min(1).max(20).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(20).required(),
});

const employee_Validation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = employee_Validation;
