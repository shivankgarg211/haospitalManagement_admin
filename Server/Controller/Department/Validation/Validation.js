const Joi = require("joi");

const schema = Joi.object({
  dept_id: Joi.string().min(1).max(20).required(),
  dept_name: Joi.string().min(5).max(50).required(),
  dept_esta_date: Joi.date().optional(),
  room_id: Joi.string().min(1).max(20).required(),
});

const departmentValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = departmentValidation;
