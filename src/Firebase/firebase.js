// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyABNmHjcMRxVajfGmRLab6DtuCciaUQyYw",
//   authDomain: "flow-event-b89e7.firebaseapp.com",
//   projectId: "flow-event-b89e7",
//   storageBucket: "flow-event-b89e7.appspot.com",
//   messagingSenderId: "428361118349",
//   appId: "1:428361118349:web:5e641827889008bbf7e8c4",
//   measurementId: "G-WD1RGD2MWZ",
// };
//alternate
const firebaseConfig = {
  apiKey: "AIzaSyCAp_z6P2vaUZh9hQSxMaahdjqv8c4PnFE",
  authDomain: "flow-event-6fd9b.firebaseapp.com",
  projectId: "flow-event-6fd9b",
  storageBucket: "flow-event-6fd9b.appspot.com",
  messagingSenderId: "426503473588",
  appId: "1:426503473588:web:dd9401575e87699e884ae1",
  measurementId: "G-JGDHYJR971"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db}
