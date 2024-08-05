import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

/** upload file */
export const uploadFile = async (file: any) => {
  if (!file) return null;
  const fileName = `${file?.name}${new Date().getTime()}`
  const storageRef = ref(storage, `anhTham/${fileName}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
