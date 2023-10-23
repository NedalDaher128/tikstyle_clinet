// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage, ref,getDownloadURL,uploadBytes ,uploadBytesResumable  ,deleteObject} = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1wSdtp1TCGZGQpo7MtnU925sbOLN1ftY",
  authDomain: "tikstylestore.firebaseapp.com",
  projectId: "tikstylestore",
  storageBucket: "tikstylestore.appspot.com",
  messagingSenderId: "133017793516",
  appId: "1:133017793516:web:1797158599fdaeb0fc86c9",
  measurementId: "G-92N9DM5GC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (file) => {
  try {
    const filename = file.originalname;
    console.log(filename);
    console.log(file);
    if (!file.buffer || !file.originalname) {
      console.error('Invalid file data.');
      return null; // Return null in case of an error
    }
    // Convert the buffer to a Uint8Array
    const fileData = new Uint8Array(file.buffer);
    const storageRef = ref(storage, 'files/' + file.originalname);
    const metadata = {
      contentType: file.mimetype,
    };
    const uploadTask = uploadBytesResumable(storageRef, fileData, metadata);
    const snapshot = await uploadTask; // Wait for the upload to complete
    const downloadURL = await getDownloadURL(snapshot.ref);
    const delfileimage = {
      linkimage : downloadURL,
      filename :filename,
      color:""
    }

    return delfileimage; // Return the download URL
  } catch (error) {
    console.error('There was an error uploading the file.', error);
    return null; // Return null in case of an error
  }
};
const deleteImage = async (fileName) => {
  try {
    if (!fileName) {
      console.error('Invalid file name.');
      return null; // Return null in case of an error
    }

    const storageRef = ref(storage, 'files/' + fileName);

    // Delete the file
    await deleteObject(storageRef);

    console.log('File deleted successfully');
    return fileName; // Return the deleted file name upon successful deletion
  } catch (error) {
    console.error('There was an error deleting the file.', error);
    return null; // Return null in case of an error
  }
};

const updateImage = async (file,color) => {
  try {
    if (!file.buffer || !file.originalname) {
      console.error('Invalid file data.');
      return null; // Return null in case of an error
    }

    const filename = file.originalname;
    const storageRef = ref(storage, 'files/' + filename);
    const fileData = new Uint8Array(file.buffer);
    const metadata = {
      contentType: file.mimetype, // Use the file's MIME type
    };

    // Upload the updated image to Firebase Storage
    await uploadBytes(storageRef, fileData, metadata);

    // Get the updated download URL
    const updatedDownloadURL = await getDownloadURL(storageRef);

    console.log('Image updated and uploaded successfully');
    return {
      linkimage: updatedDownloadURL,
      filename: filename, // Use the correct variable name
      color : color
    }; // Return the updated download URL
  } catch (error) {
    console.error('There was an error updating the image.', error);
    return null; // Return null in case of an error
  }
};

module.exports = { uploadImage, deleteImage, updateImage };

