import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBEPUFnfcVhKm9zbFcVDNmN-41pyZ0a60M",
  authDomain: "vue-yamshakes.firebaseapp.com",
  databaseURL: "https://vue-yamshakes.firebaseio.com",
  projectId: "vue-yamshakes",
  storageBucket: "vue-yamshakes.appspot.com",
  messagingSenderId: "523894386865",
  appId: "1:523894386865:web:bae6cad2148b7192"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

// Export Firestore database
export default firebaseApp.firestore();