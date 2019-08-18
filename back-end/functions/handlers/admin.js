const { db } = require("../util/FBadmin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const { isValidEmail, isEmpty } = require("../util/validators");

/* Endpoint functions for admin authentication */
exports.adminLogin = (req, res) => {
  // validate admin
  const email = req.body.email;
  console.log(email);
  const password = req.body.password;
  console.log(password);

  if (isValidEmail(email) && !isEmpty(password)) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        return data.user.getIdToken();
      })
      .then(token => {
        return res.json({ token });
      })
      .catch(error => {
        console.log(error);
        return res
          .status(403)
          .json({ general: "Wrong credentials please try again" });
      });
  } else {
    res.status(400).json({ error: "Invalid Email or Password" });
  }
};

// Sign out
exports.adminLogout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .catch(err => {
      if (err) {
        res.status(400).json({ error: "Logout Error" });
      }
      res.status(200).json({ message: "Logged out Successfully" });
    });
};

/* Endpoint functions for All work */
exports.uploadArtWork = (req, res) => {
  const newArtWork = {
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    edit: false,
    category: req.body.category
  };
  if (
    !isEmpty(newArtWork.title) &&
    !isEmpty(newArtWork.imgUrl) &&
    !isEmpty(newArtWork.category) &&
    !isEmpty(newArtWork.edit)
  ) {
    db.collection("worksbycategory")
      .add(newArtWork)
      .then(doc => {
        const resArtWork = newArtWork;
        resArtWork.workId = doc.id;
        res.json(resArtWork);
      })
      .catch(err => {
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
      });
  } else {
    res.status(400).json({ error: "Don't forget to add the important data!" });
  }
};

// update work function
exports.updateArtWork = (req, res) => {
  const workId = req.params.workId;
  // get doc ref
  const artWorkDoc = db.doc(`/worksbycategory/${workId}`);

  artWorkDoc
    .get()
    .then(doc => {
      if (doc.exists) {
        // update if exists
        artWorkDoc.update({
          title: req.body.title,
          imgUrl: req.body.imgUrl,
          edit: false,
          category: req.body.category
        });
        return res.json({ message: "Update successful!" });
      } else {
        return res.status(404).json({ error: "Artwork does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "Uknown Error" });
    });
};

exports.deleteArtWork = (req, res) => {
  const workId = req.params.workId;
  // get doc ref
  const artWorkDoc = db.doc(`/worksbycategory/${workId}`);

  artWorkDoc
    .get()
    .then(doc => {
      if (doc.exists) {
        // del if exists
        return artWorkDoc.delete();
      } else {
        return res.status(404).json({ error: "Artwork does not exist" });
      }
    })
    .then(() => {
      res.json({ message: "Deletion successful!" });
    })
    .catch(err => {
      res.json({ error: "Uknown Error" });
    });
};

/* Endpoint functions for recent work */
exports.uploadRecentArtWork = (req, res) => {
  const newArtWork = {
    imgUrl: req.body.imgUrl,
    edit: false,
    createdAt: new Date().toISOString()
  };
  if (!isEmpty(newArtWork.imgUrl) && !isEmpty(newArtWork.edit)) {
    db.collection("recentwork")
      .add(newArtWork)
      .then(doc => {
        const resArtWork = newArtWork;
        resArtWork.workId = doc.id;
        res.json(resArtWork);
      })
      .catch(err => {
        res.status(500).json({ error: "something went wrong" });
        console.error(err);
      });
  } else {
    res.status(400).json({ error: "Don't forget to add the important data!" });
  }
};

// update work function
exports.updateRecentArtWork = (req, res) => {
  const workId = req.params.workId;
  // get doc ref
  const artWorkDoc = db.doc(`/recentwork/${workId}`);

  artWorkDoc
    .get()
    .then(doc => {
      if (doc.exists) {
        // update if exists
        artWorkDoc.update({
          imgUrl: req.body.imgUrl,
          edit: false,
          createdAt: new Date().toISOString()
        });
        return res.json({ message: "Update successful!" });
      } else {
        return res.status(404).json({ error: "Artwork does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "Uknown Error" });
    });
};

exports.deleteRecentArtWork = (req, res) => {
  const workId = req.params.workId;
  // get doc ref
  const artWorkDoc = db.doc(`/recentwork/${workId}`);

  artWorkDoc
    .get()
    .then(doc => {
      if (doc.exists) {
        // del if exists
        return artWorkDoc.delete();
      } else {
        return res.status(404).json({ error: "Artwork does not exist" });
      }
    })
    .then(() => {
      res.json({ message: "Deletion successful!" });
    })
    .catch(err => {
      res.json({ error: "Uknown Error" });
    });
};

/* Contact request function to display to client */
exports.getAllContactRequests = (req, res) => {
  db.collection("contactRequests")
    .orderBy("createdAt", "desc")
    .get()
    .then(querySnapshot => {
      let contactRequests = [];
      querySnapshot.forEach(doc => {
        // add work id to the objects so that we can update/delete the specific work in front end.
        contactRequests.push({
          contact: doc.data().contact,
          createdAt: doc.data().createdAt,
          email: doc.data().email,
          message: doc.data().message,
          name: doc.data().name,
          subject: doc.data().subject
        });
        console.log(doc.id, " => ", doc.data());
      });
      return res.json(contactRequests);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ general: "Server error, please try again" });
    });
};
