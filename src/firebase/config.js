import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBvom7dtddznzZOgFRYAyfErCoFsa-ZtkI",
  authDomain: "sample-ciit-project.firebaseapp.com",
  projectId: "sample-ciit-project",
  storageBucket: "sample-ciit-project.firebasestorage.app",
  messagingSenderId: "336986770458",
  appId: "1:336986770458:web:7db166c5456583c7bf95a3",
  measurementId: "G-7GC0ER0HX9"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}