const Joi = require("joi");

const schema = Joi.object({
        p_id: Joi.string().min(1).max(20).required(),
        emp_id: Joi.string().min(1).max(50).required(),
});

const treatmentValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = treatmentValidation;
