const User = require("../Models/User")

const getUser = async (req, res) => {
    const users = await User.find().lean()
    res.json(users)
}

const updateUser = async (req, res) => {
    const { _id, firstName, lastName, userName, email, password, address, phon } = req.body
    const user = await User.findById(_id)
    user.firstName = firstName
    user.lastName = lastName
    user.userName = userName
    user.email = email
    user.password = password
    user.address = address
    user.phon = phon
    await user.save()
    res.json(user)
}

const deleteUser = async (req, res) => {
    const { _id } = req.body
    const user = await User.findById(_id)
    if (!user)
        return res.status(404).send("user is not found!!")
    await user.deleteOne()
    res.send(`${user.firstName} is delete!`)
}

module.exports = { updateUser, deleteUser, getUser }