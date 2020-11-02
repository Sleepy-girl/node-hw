// const { Storage } = require("@google-cloud/storage");
// const Promise = require("bluebird");
// const fs = require("fs").promises;

// const StorageGCP = Promise.promisifyAll(Storage);

// const storage = new StorageGCP({
//   projectId: process.env.PROJECT_ID,
//   // keyFilename: "keys/gcp-key.json",
// });

// const avatarsBucket = storage.bucket("nodejs-hw");

// const publicUrlConstructor = (filename) =>
//   `http://localhost:${process.env.PORT}/images/${filename}`;

// const uploadAvatarToStorage = async (path) => {
//   const file = await avatarsBucket.uploadAsync(path, { public: true });
//   await fs.unlink(path);
//   return publicUrlConstructor(file.metadata.name);
// };

// module.exports = { uploadAvatarToStorage };
