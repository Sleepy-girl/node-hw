const registrationController = async (req, res, next) => {
  console.log(req.body);
  res.end();
};
module.exports = { registrationController };
