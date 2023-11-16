const jwt = require('jsonwebtoken')

function verifyToken(role = 'user') {
    return (req, res, next) => {

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
            if (role == 'admin' && req.role != 'admin') {
                return res.sendStatus(403)
            } else if (role == 'staff' && req.role == 'user') {
                return res.sendStatus(403)
            }
            next()
        } catch (err) {
            // console.log(err)
            return res.sendStatus(403)
        }
    }
}

module.exports = {
    verifyToken,
}