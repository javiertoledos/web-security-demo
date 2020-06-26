import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyDB1p5kSbJvILGNg6nxJ0npSKVVmZkpfAo",
  projectId: "web-security-demo"
})

const auth = firebase.auth();
const db = firebase.firestore();

export {
  auth,
  db
}