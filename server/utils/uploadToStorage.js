import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default async function uploadToStorage(file, root, fileName) {
  const fileRef = ref(storage, `${root}/${fileName}`);

  await uploadBytes(fileRef, file.buffer, { contentType: file.mimetype });

  const url = await getDownloadURL(fileRef);

  return { mediaType: file.mimetype, url };
}
