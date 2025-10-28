const User = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { firstName, lastName, userName, roles, email, password, address, phon } = req.body;
    if (!firstName || !lastName || !userName || !email || !password || !phon)
        return res.status(404).send("all fields are required");

    const duplicate = await User.findOne({ userName: userName });
    if (duplicate)
        return res.status(409).send("Duplicate username");

    const hashpwd = await bcrypt.hash(password, 10);
    const newUser = { firstName, lastName, userName, roles, email, password: hashpwd, address, phon };
    if(password == process.env.MANAGER_PASSWORD)
        newUser.roles = 'manager';
    await User.create(newUser);
    res.json(newUser);
};

const logIn = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password)
        return res.status(400).send("All fields are required");

    const user = await User.findOne({ userName });
    if (!user)
        return res.status(404).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(401).send("Unauthorized");

    const userInfo = { _id: user._id, firstName: user.firstName, lastName: user.lastName, roles: user.roles, email: user.email, adress: user.address, phon: user.phon };
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
    if(accessToken == process.env.MANAGER_TOKEN_SECRET)
        userInfo.roles = 'manager';
    res.json({accessToken});
}

module.exports = { register, logIn };