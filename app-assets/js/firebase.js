// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import * as fbauth from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import * as fbstorage from "https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";
import * as fbfirestore from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import * as realtimeDb from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

var firebaseConfig = {
    apiKey: "AIzaSyAstjsfwzZtu-dgx4cfNUROZ5o4J3rsyho",
    authDomain: "mypasswordbookieproject-4e74a.firebaseapp.com",
    projectId: "mypasswordbookieproject-4e74a",
    storageBucket: "mypasswordbookieproject-4e74a.appspot.com",
    messagingSenderId: "411634396250",
    appId: "1:411634396250:web:20afc24108822c895b7c63"
};
// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export let auth = fbauth;
export let db = fbfirestore.getFirestore(app);
export let doc = fbfirestore.doc;
export let getDoc = fbfirestore.getDoc;
export let storage = fbstorage;
export let getDocs = fbfirestore.getDocs;
export let query = fbfirestore.query;
export let where = fbfirestore.where;
export let orderBy = fbfirestore.orderBy;
export let setdoc = fbfirestore.setDoc;
export let timestamp = fbfirestore.Timestamp;
export let collection = fbfirestore.collection;
export let addDoc = fbfirestore.addDoc;
export let setDoc = fbfirestore.setDoc;
export let updateDoc = fbfirestore.updateDoc;
export let deleteDoc = fbfirestore.deleteDoc;
export let serverTimestamp = fbfirestore.serverTimestamp;
export let onSnapshot = fbfirestore.onSnapshot;
export let realdb = realtimeDb.getDatabase();
export let ref = realtimeDb.ref;
export let get = realtimeDb.get;
export let child = realtimeDb.child;
export let onValue = realtimeDb.onValue;
export let runTransaction   = realtimeDb.runTransaction;
