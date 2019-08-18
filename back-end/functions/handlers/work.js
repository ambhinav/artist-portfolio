const { db } = require("../util/FBadmin");

exports.getAllArtWork = (req, res) => {
  db.collection("worksbycategory")
    .orderBy('category')
    .get()
    .then(querySnapshot => {
      let artWork = [];
      querySnapshot.forEach(doc => {
        // add work id to the objects so that we can update/delete the specific work in front end.
        artWork.push({
          title: doc.data().title,
          imgUrl: doc.data().imgUrl,
          edit: doc.data().edit,
          category: doc.data().category,
          workId: doc.id
        });
        console.log(doc.id, " => ", doc.data());
      });
      return res.json(artWork);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ general: 'Server error, please try again' });
    });
};

exports.getAllRecentArtWork = (req, res) => {
  db.collection("recentwork")
    .orderBy('createdAt', 'desc')
    .get()
    .then(querySnapshot => {
      let artWork = [];
      querySnapshot.forEach(doc => {
        // add work id to the objects so that we can update/delete the specific work in front end.
        artWork.push({
          imgUrl: doc.data().imgUrl,
          edit: doc.data().edit,
          createdAt: doc.data().createdAt,
          workId: doc.id
        });
        console.log(doc.id, " => ", doc.data());
      });
      return res.json(artWork);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ general: 'Server error, please try again' })
    });
};
