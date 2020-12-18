import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD2bJfRPj2XMepOEOE-ZEd2mF_H-cdOKw4",
  authDomain: "control-de-inventarios-5dcc9.firebaseapp.com",
  databaseURL: "https://control-de-inventarios-5dcc9.firebaseio.com",
  projectId: "control-de-inventarios-5dcc9",
  storageBucket: "control-de-inventarios-5dcc9.appspot.com",
  messagingSenderId: "543040729530",
  appId: "1:543040729530:web:33c5ad6c46fefd6fea2d83"
  };
   //Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);
 
 export const db = fb.firestore();
 