const Joi = require("joi");

const schema = Joi.object({
        room_id: Joi.string().min(1).max(20).required(),
        room_name: Joi.string().min(3).max(100).required().optional(),    
});

const room_Validation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0] });
  } else {
    next();
  }
};

module.exports = room_Validation;
