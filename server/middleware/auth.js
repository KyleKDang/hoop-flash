const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (authHeader == 'Bearer null') {

        req.user = { userId: 1, username: 'guest' }
        next()

    } else {

        const token = authHeader && authHeader.split(' ')[1]
        if (token === null) {
            return res.sendStatus(403)
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                req.user = { userId: 1, username: 'guest'}
            } else {
                req.user = user
            }
            next()
        })
        
    }
}

module.exports = authenticateToken