const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization denied.' });
    }
    const token = authHeaders.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

module.exports = auth;
