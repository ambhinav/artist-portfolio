import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

import FBconfig from "../../assets/secrets/FBconfig";

class Firebase {
  constructor() {
    app.initializeApp(FBconfig);

    this.auth = app.auth();
    this.db = app.database();
  }

  // ** Auth API **

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);
}

export default Firebase;
