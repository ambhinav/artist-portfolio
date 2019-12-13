import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage"

import FBconfig from "../../assets/secrets/FBconfig";

class Firebase {
  constructor() {
    app.initializeApp(FBconfig);

    this.auth = app.auth();
    this.db = app.database();
    this.storageRef = app.storage().ref();
  }

  // ** Auth API **

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** User API ***

  getUserToken = () => 
    this.auth.currentUser.getIdToken()
  // user = uid => this.db.ref(`users/${uid}`);



  // *** Cloud storage API ***

  uploadFileToStorage = (location, file) => 
    this.storageRef.child(location).put(file)

  getImageUrl = (location) =>
    this.storageRef.child(location).getDownloadURL()

}

export default Firebase;
