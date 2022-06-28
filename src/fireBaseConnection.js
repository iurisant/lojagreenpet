import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuQUpzDWhK8Xg26hRVJ6SHMJMMUeJvNT0",
  authDomain: "lojagreenpet-2022.firebaseapp.com",
  databaseURL: "https://lojagreenpet-2022-default-rtdb.firebaseio.com",
  projectId: "lojagreenpet-2022",
  storageBucket: "lojagreenpet-2022.appspot.com",
  messagingSenderId: "777496862246",
  appId: "1:777496862246:web:b3569555f2590d81ead0e7",
  measurementId: "G-WPWDP6ELDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);