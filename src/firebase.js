import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB2gAzuslRzOrHBDbHSbod21Fp_brW8AuE",
  authDomain: "disney-plus-clone-b3cf1.firebaseapp.com",
  databaseURL: "https://disney-plus-clone-b3cf1-default-rtdb.firebaseio.com",
  projectId: "disney-plus-clone-b3cf1",
  storageBucket: "disney-plus-clone-b3cf1.appspot.com",
  messagingSenderId: "905294061709",
  appId: "1:905294061709:web:cf9185939bba67f3c7c2c4",
  measurementId: "${config.measurementId}",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
