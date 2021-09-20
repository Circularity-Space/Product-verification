// Import the functions for firebase initialization and google analytics
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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
// 3. Authenticate user using Facebook Auth Provider
