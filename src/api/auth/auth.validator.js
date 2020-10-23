const Joi = require("joi");

const RegistrationSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .min(5)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,20}$/)
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = "'password' is not valid";
        }
      });
      return errors;
    }),
});

const validationMiddleware = (schema) => async (req, res, next) => {
  const { error } = await schema.validate(req.body);
  if (error) {
    const message = error.details.reduce((msg, nextError) => {
      if (msg) {
        return msg + ", " + nextError;
      }
      return nextError.message;
    }, "");
    res.status(400).send(message);
    return;
  }
  next();
};

module.exports = {
  validationMiddleware: validationMiddleware(RegistrationSchema),
};
