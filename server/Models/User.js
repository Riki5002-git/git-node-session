const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        roles: {
            type: String,
            enum: ['user', 'manager'],
            default: 'user'
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phon: {
            type: String,
            required: true
        },
        address: {
            city: String,
            street: String,
            number: Number
        },
        basket: {
            type: [{
                barCode: Number,
                name: String,
                quantity: {
                    type: Number,
                    default: 1
                },
                price: Number,
                amount: Number,
                img: String,
                category: String
            }],
            default: []
        },
        totalSum: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", UserSchema)