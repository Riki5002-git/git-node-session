const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        barCode: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        madeIn: String,
        designer: String,
        price: {
            type: Number,
            required: true
        },
        amount: Number,
        isSale: {
            type: Boolean,
            default: false
        },
        percents: {
            type: Number,
            default: 0
        },
        img: String,
        category: {
            type: String,
            enum: ["boys", "girls", "parents", "livingRooms", "kitchens"],
            required: true
        },
        description: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", ProductSchema)