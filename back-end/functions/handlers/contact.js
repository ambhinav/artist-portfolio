const { db } = require('../util/FBadmin');

exports.postContact = (req, res) => {
  const newContactReq = {
    contact: req.body.contact,
    createdAt: new Date().toISOString(),
    email: req.body.email,
    message: req.body.message,
    name: req.body.name,
    subject: req.body.subject
  };

  db.collection("contactRequests")
    .add(newContactReq)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};