const { admin } = require('./FBadmin');

module.exports = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.log('No token found')
        return res.status(403).json( {error: 'Unauthorized'});
    }

    // let FB verify the token
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            console.log(decodedToken);
            next();
            return;
        })
        .catch(err => {
            console.log('Error while verifying token', err)
            res.status(403).json(err);
            return;
        })

}
