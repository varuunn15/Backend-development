const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next) { // as a middleware use hota h next use krke
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    req.user = decoded

    next()
}

module.exports = identifyUser