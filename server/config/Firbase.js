const admin = require("firebase-admin");
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');

const serviceAccount = require("./AccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://tikstylestore.appspot.com"
});

const storage = new Storage();
const upload = multer({
  storage: multer.memoryStorage(),
});

// دالة لرفع الصور
const uploadImage = async (file, destinationPath) => {
  try {
    const bucket = storage.bucket("tikstylestore.appspot.com");
    const fileUpload = bucket.file(destinationPath);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      console.error("Error uploading file: ", error);
    });

    blobStream.on("finish", () => {
      console.log("File uploaded successfully.");
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error uploading file: ", error);
  }
};

module.exports = {
  admin,
  upload,
  uploadImage,
}