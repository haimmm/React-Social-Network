import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, getDoc, addDoc,where, setDoc, doc, updateDoc, query, onSnapshot, startAfter, limit, orderBy } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDm5MyfG5Ts0oc319ndZ8Sue-xCR9hvQX8",
    authDomain: "blogging-haim.firebaseapp.com",
    projectId: "blogging-haim",
    storageBucket: "blogging-haim.appspot.com",
    messagingSenderId: "383168970519",
    appId: "1:383168970519:web:5684c745aedd324edec152"
  };

initializeApp(firebaseConfig);

const db = getFirestore();
const TWEETS_DB = collection(db, "tweets");
const PUBLIC_DATA_DB = collection(db, "PublicUsersData");
const auth = getAuth();
const googleSignIn = new GoogleAuthProvider();
const storage = getStorage();
let lastVisibleTweetRef = null;

const fb = {
  signup: async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    return userCredential.user;
  },
  loginWithGoogle: async () => {
    const googleLogin = await signInWithPopup(auth, googleSignIn);
    return googleLogin.user;
  },
  isUserSignedIn: (callback) => {
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  },
  signout: async () => {
    await signOut(auth);
  },
  setPublicData: async (data) => {
    await setDoc(doc(db,"PublicUsersData", auth.currentUser.uid), data);
  },
  getPublicData: async (id) => {
    const publicData = await getDoc(doc(db,"PublicUsersData", id));
    return publicData.data();
  },
  updatePublicData: async (data) =>{
    await updateDoc(doc(db,"PublicUsersData", auth.currentUser.uid), data);
  },
  storePhoto: async (photo, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, photo);
  },
  getPhotoURL: async (path) => {
    const storageRef = ref(storage, path);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
  },
  getTweetsByCount: async (count, isFirstMount) => {
    const q = isFirstMount ? query(TWEETS_DB, orderBy("date", "desc"), limit(count)): 
                             query(TWEETS_DB, orderBy("date", "desc"), startAfter(lastVisibleTweetRef), limit(count));
    const documentSnapshots = await getDocs(q);
    lastVisibleTweetRef = documentSnapshots.docs[documentSnapshots.docs.length-1];
    const tweets = [];
    documentSnapshots.forEach((tweet) => {
        tweets.push({
        id: tweet.id,
        ...tweet.data()
      });
    });
    return tweets;
  },
  getTweetsBySearch: async (property, value) => {
    if(property === "userId"){ //converts the username value to userId value
      const q = query(PUBLIC_DATA_DB, where("userName", "==", value));
      const documentSnapshots = await getDocs(q);
      value = documentSnapshots.docs[0].id;
    }
    const q = query(TWEETS_DB, where(property, "==", value));
    const documentSnapshots = await getDocs(q);
    console.log(documentSnapshots);
    const tweets = [];
    documentSnapshots.forEach((tweet) => {
        tweets.push({
        id: tweet.id,
        ...tweet.data()
      });
    });
    return tweets;
  },
  addNewTweet: async (tweet) => {
    await addDoc(TWEETS_DB, tweet);
  },
  onTweetsDbChange: async (callback) =>{
    const q = query(TWEETS_DB, orderBy("date", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tweets = [];
      querySnapshot.forEach((doc) => {
        tweets.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(tweets);
    });
    return unsubscribe;
  }
}

export default fb;
