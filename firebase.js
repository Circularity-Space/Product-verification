// Import the functions for firebase initialization and google analytics
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js'
import {
  getFirestore,
  enableIndexedDbPersistence,
} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js'

const firebaseConfig = {
  apiKey: 'AIzaSyBQSmHJtzWRXipiyEXIZSbfIFdUNXDvNWo',
  authDomain: 'thibitisha-784d5.firebaseapp.com',
  projectId: 'thibitisha-784d5',
  storageBucket: 'thibitisha-784d5.appspot.com',
  messagingSenderId: '723471010491',
  appId: '1:723471010491:web:f8a29d27a4bef0379ef79e',
  measurementId: 'G-61B9WNNFMH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Initialize Cloud Firestore
const db = getFirestore()

// initialize firebase authentication

const auth = getAuth()

// initialize google auth provider

const provider = new GoogleAuthProvider()

// initialize facebook auth provider

const provider2 = new FacebookAuthProvider()

// enable offline persistence
// Subsequent queries will use persistence, if it was enabled successfully

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
})

// 1. Create new users with email and password

async function registerUser() {
  const newUser = {
    username,
    firstname,
    lastname,
    email,
    idnumber,
    phonenumber,
    password,
    confirmPassword,
  }

  let token, userId, error

  db.doc(`/user/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exsists) {
        error = 'User name already exsists'
      } else {
        return createUserWithEmailAndPassword(
          auth,
          newUser.email,
          newUser.password
        )
      }
    })
    .then((data) => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then((idtoken) => {
      token = idtoken
      const user = {
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstname,
        lastName: newUser.lastname,
        isAdmin: false,
        idNumber: newUser.idnumber,
        phoneNumber: newUser.phonenumber,
        createdAt: new Date().toISOString(),
        userId,
      }
      return db.doc(`/user/${newUser.username}`).set(user)
    })
    .then(() => {
      return token
    })
    .catch((error) => {
      console.error(error)
      if (error.code === 'auth/email-already-in-use') {
        error = 'Email already in use'
      } else {
        error = 'Something went wrong, please try again'
      }
    })
}

// 2. Authenticate user using Google Auth Provider
_google_auth.addEventListener('click', (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      console.log(user)
      console.log('latest commit')
      // ...
    }).then(() => {
      const user = {
        username : user.username,
        email: user.email,
        firstName: '',
        lastName: '',
        phoneNumber: user.phoneNumber,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        profilePic: user.photoURL,
        age: '',
        gender: '',
        preferences : [],

      }
      return db.doc(`/user/${user.username}`).set(user)
    }).then(() => {
      return user.accessToken
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
})

// 3. Authenticate user using Facebook Auth Provider
_facebook_auth.addEventListener('click', (e) => {
  signInWithPopup(auth, provider2)
    .then((result) => {
      // The signed-in user info.
      const user = result.user

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result)
      const accessToken = credential.accessToken

      console.log(user)

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error)

      // ...
    })
})
