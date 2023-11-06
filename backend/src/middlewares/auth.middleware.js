const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {

    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) {
        console.log("No header");
        return res.sendStatus(401)
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
        console.log("no acc");
        return res.sendStatus(401)
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        req.id = decoded.id
        req.username = decoded.username
        req.role = decoded.role
        next()
    } catch (err) {
        // console.log(err)
        return res.sendStatus(403)
    }
}

module.exports = {
    verifyToken,
}