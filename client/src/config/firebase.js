import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFiqPvb0ZOZCRJkrP2Wx8tvZsEc-F5H3I",
  authDomain: "hermann-1b784.firebaseapp.com",
  databaseURL: "https://hermann-1b784.firebaseio.com",
  projectId: "hermann-1b784",
  storageBucket: "hermann-1b784.appspot.com",
  messagingSenderId: "40191220060",
  appId: "1:40191220060:web:8fe57fae7580cba73ec999",
  measurementId: "G-B3B78W1DMZ"
}

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();