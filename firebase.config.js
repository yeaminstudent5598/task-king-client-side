// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtfPPD_5wcIpQRBHbPTDp3myb1IpUVLXU",
  authDomain: "job-task-e9eb0.firebaseapp.com",
  projectId: "job-task-e9eb0",
  storageBucket: "job-task-e9eb0.firebasestorage.app",
  messagingSenderId: "551966255654",
  appId: "1:551966255654:web:c02e56a44350f6b21c14e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
