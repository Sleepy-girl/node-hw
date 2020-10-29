const multer = require("multer");

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/public/images");
    },
    filename: function (req, file, cb) {
      const fileType = file.mimetype.split("/")[1];
      if (fileType !== "png" && fileType !== "jpeg" && fileType !== "jpg") {
        return cb(new Error("File must be picture"));
      }
      cb(null, `${req.user.id}.${fileType}`);
    },
  });
  return multer({ storage }).single("avatar");
};

module.exports = {
  avatarUploaderMiddleware: avatarUploader(),
};
