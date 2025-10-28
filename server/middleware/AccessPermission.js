const jwt = require("jsonwebtoken");

const AccessPermission = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Unauthorized' });
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // if (err) 
            //     return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded;
        }
    );
    if(req.user.roles != 'manager')
        return res.status(403).send("You do not have permission to access this action.");
    next();
};

module.exports = AccessPermission;