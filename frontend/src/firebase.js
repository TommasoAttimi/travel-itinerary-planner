// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_c_ou5UdSlFyFyfjpht0HOa5ytA9FT-U",
  authDomain: "travel-itinerary-planner-14aaa.firebaseapp.com",
  projectId: "travel-itinerary-planner-14aaa",
  storageBucket: "travel-itinerary-planner-14aaa.appspot.com",
  messagingSenderId: "621520640636",
  appId: "1:621520640636:web:e0351deb3960913bafc7f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
