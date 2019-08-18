const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");

const FBAuth = require('./util/FBauth')
// access admin object
// const serviceAccount = require('../secrets/firebase/jerome-portfolio-firebase-adminsdk-4i93m-0a0b4d1ff8.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://jerome-portfolio.firebaseio.com"
// });

/* Import handlers */
const { postContact } = require('./handlers/contact')
const { getAllArtWork, getAllRecentArtWork } = require('./handlers/work')
const { adminLogin, adminLogout, uploadArtWork, updateArtWork, deleteArtWork, uploadRecentArtWork, updateRecentArtWork, deleteRecentArtWork, getAllContactRequests} = require('./handlers/admin')

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

// Admin routes
app.post("/admin/login", adminLogin);
app.get("/admin/logout", adminLogout);

// Contact routes
app.post("/contact", postContact);

// Work route
app.get("/work/info", getAllArtWork);
app.get("/home/info", getAllRecentArtWork);


// get req for contacts 
app.get('/admin/info/contact', FBAuth, getAllContactRequests)

// requests for recent work (Protected)
app.post('/admin/home/putrecentwork', FBAuth, uploadRecentArtWork)
app.post('/admin/home/updaterecentwork/:workId', FBAuth, updateRecentArtWork)
app.delete('/admin/home/deleterecentwork/:workId', FBAuth, deleteRecentArtWork)

// TODO: GET + POST request for all work (Protected)
app.post('/admin/work/putartwork', FBAuth, uploadArtWork)
app.post('/admin/work/updateartwork/:workId', FBAuth, updateArtWork)
app.delete('/admin/work/deleteartwork/:workId', FBAuth, deleteArtWork)

// automatically turns into multiple routes for endpoints
exports.api = functions.https.onRequest(app);
