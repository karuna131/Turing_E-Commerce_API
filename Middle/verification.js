const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {

 const auth = req.cookies;

    if (auth) {
        const token = auth.user;

        jwt.verify(token, "KarunaJaiswal", (err, userToken) => {
            if (err) {
                res.send({message : err});
            }
            res.userToken = userToken;
            next();
        });
    } else {
        res.send('Token is not valid');
    }
};
module.exports = authentication;