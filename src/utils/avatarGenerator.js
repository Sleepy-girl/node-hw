const http = require("https");
const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
const multer = require("multer");
const stream = require("stream");

const Promise = require("bluebird");
const finished = Promise.promisify(stream.finished);

const Jimp = require("jimp");
const { AvatarGenerator } = require("random-avatar-generator");
const generator = new AvatarGenerator();

const generateAvatar = async (id) => {
  const fileName = id + ".svg";
  const file = fs.createWriteStream(`./tmp/${fileName}`);
  const avatarUrl = generator.generateRandomAvatar();
  http.get(avatarUrl, async (response) => {
    response.pipe(file);
    await finished(file);
    file.close();
  });
  return fileName;
};

const handleAvatar = async (avatar) => {
  try {
    const { ext } = path.parse(avatar);
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      const imageCompress = await Jimp.read(
        path.join(__dirname + `/tmp/${avatar}`)
      );
      await imageCompress.quality(60);
    }
    await fsPromises.rename(`tmp/${avatar}`, `src/public/images/${avatar}`);
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, callback) {
    const { ext } = path.parse(file.originalname);
    callback(null, req.user._id + ext);
  },
});
const upload = multer({ storage });

module.exports = { upload, generateAvatar, handleAvatar };
