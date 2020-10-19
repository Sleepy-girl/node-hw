const Joi = require('@hapi/joi');

exports.validateAddContact = (req, res, next) => {
  const body = req.body;
  const contactRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validationResult = contactRules.validate(body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
};

exports.validateUpdateContact = (req, res, next) => {
  const body = req.body;
  const contactRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });
  const validationResult = contactRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }
  next();
};
