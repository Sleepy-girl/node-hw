const multer = require("multer");

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/public/images");
    },
    filename: function (req, file, cb) {
      cb(null, `${req.user.id}.jpg`);
    },
  });
  return multer({ storage }).single("avatar");
};

module.exports = {
  avatarUploaderMiddleware: avatarUploader(),
};
