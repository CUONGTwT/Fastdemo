import { getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCIFwuzAnv3EcnzevgdseeA2brbgy0YT4c",
  authDomain: "fastnowhtaoz14.firebaseapp.com",
  projectId: "fastnowhtaoz14",
  storageBucket: "fastnowhtaoz14.appspot.com",
  messagingSenderId: "850502387994",
  appId: "1:850502387994:web:859f9a121eb218e805c4a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app