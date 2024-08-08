const Joi = require("joi");

const schema = Joi.object({
        lab_no: Joi.string().min(1).max(20).required(),
        lab_name: Joi.string().min(3).max(50).required(),
        room_id: Joi.string().min(1).max(20).required(),
        dept_id: Joi.string().min(1).max(20).required(),
        
});

const lab_Validation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = lab_Validation;
