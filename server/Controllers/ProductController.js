const Product = require("../Models/Product");
const User = require("../Models/User");

const totalSum = (basket) => {
    let sum = 0;
    for (let i = 0; i < basket.length; i++) {
        const product = basket[i];
        const pricePerUnit = product.price || 0;
        const quantity = product.quantity || 1;
        sum += pricePerUnit * quantity;
    }
    return sum;
};

const addProduct = async (req, res) => {
    const { barCode, name, madeIn, designer, price, amount, isSale, percents, img, category, description } = req.body;
    if (!barCode || !name || (!madeIn && !designer) || !price || !amount || !category)
        return res.status(400).send("All fields are required");
    let newPrice = price;
    if (isSale && percents > 0)
        newPrice = price - percents * (price / 100);
    if (isSale && !percents)
        return res.status(404).send("ther is no percent");
    if (!isSale && percents > 0)
        return res.status(404).send("the product is not in sale");
    const duplicate = await Product.findOne({ barCode }).lean();
    if (duplicate)
        return res.status(409).send("Duplicate barCode");
    const newProduct = { barCode, name, madeIn, designer, price: newPrice, amount, isSale, percents, img, category, description };
    await Product.create(newProduct);
    res.json({ message: "Product added", product: newProduct });
};

const deleteProduct = async (req, res) => {
    const { barCode } = req.body;
    const deleteProduct = await Product.findOne({ barCode });
    if (!deleteProduct)
        return res.status(404).send("Product is not found");
    await Product.deleteOne(deleteProduct);
    res.json({ message: "Product is delete", product: deleteProduct });
};

const updateProduct = async (req, res) => {
    const { name, isSale, amount, price, percents, img, category, description } = req.body;
    const barCode = Number(req.params.barCode);
    if (!barCode)
        return res.status(400).send("barCode is required");
    if (!isSale && percents > 0)
        return res.status(404).send("the product is not in sale");
    if (isSale && !percents)
        return res.status(404).send("there is no percent");
    const updateProduct = await Product.findOne({ barCode });
    if (!updateProduct)
        return res.status(404).send("product is not found");
    if (price)
        updateProduct.price = price;
    if (amount)
        updateProduct.amount = amount;
    if (name)
        updateProduct.name = name;
    if (img)
        updateProduct.img = img;
    if (category)
        updateProduct.category = category;
    if (description)
        updateProduct.description = description;
    if (isSale == true || isSale == false) {
        updateProduct.isSale = isSale;
        if (updateProduct.isSale == true)
            updateProduct.price = updateProduct.price - percents * (updateProduct.price / 100);
        if (updateProduct.isSale == false) {
            updateProduct.price = updateProduct.price + updateProduct.percents * (updateProduct.price / 100);
            updateProduct.percents = 0;
        };
        if (percents)
            updateProduct.percents = percents;
    };
    await updateProduct.save();
    res.json({ message: "Product is updated", product: updateProduct });
};

const veiwAll = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

const addProdToBasket = async (req, res) => {
    const { barCode } = req.body;
    if (!barCode)
        return res.status(400).send("barCode is required");
    const addProduct = await Product.findOne({ barCode });
    if (!addProduct)
        return res.status(404).send("barCode is not found");
    const thisUser = await User.findById(req.user._id);
    if (!thisUser)
        return res.status(404).send("user is not found");
    const prod = thisUser.basket.find((p) => {
        if (p.barCode == addProduct.barCode) {
            if (p.amount < addProduct.quantity) {
                addProduct.quantity += 1;
            } else {
                return res.status(400).send("Reached maximum available amount");
            }
            return p;
        }
    });
    if (!prod) {
        thisUser.basket.push({
            name: addProduct.name,
            barCode: addProduct.barCode,
            quantity: 1,
            price: addProduct.price,
            amount: addProduct.amount,
            img: addProduct.img,
            category: addProduct.category
        });
    }
    thisUser.totalSum = totalSum(thisUser.basket);
    await thisUser.save();
    res.json({ basket: thisUser.basket, totalSum: thisUser.totalSum });
};

const deleteProdFromBasket = async (req, res) => {
    const { barCode } = req.body;
    if (!barCode)
        return res.status(400).send("barCode is required");
    const thisUser = await User.findById(req.user._id);
    if (!thisUser)
        return res.status(404).send("user is not found");
    const index = thisUser.basket.findIndex(p => p.barCode === barCode);
    if (index == -1)
        return res.status(404).send("Product not found in basket");
    thisUser.basket.splice(index, 1);
    thisUser.totalSum = totalSum(thisUser.basket);
    await thisUser.save();
    res.json({ message: "product is delete succsesfully", totalSum: thisUser.totalSum });
};

const plusProdToBasket = async (req, res) => {
    const { barCode } = req.body;
    if (!barCode)
        return res.status(400).send("barCode is required");
    const addProduct = await Product.findOne({ barCode });
    if (!addProduct)
        return res.status(404).send("barCode is not found");
    const thisUser = await User.findById(req.user._id);
    if (!thisUser)
        return res.status(404).send("user is not found");
    const index = thisUser.basket.findIndex(p => p.barCode === barCode);
    if (index == -1)
        return res.status(404).send("Product not found in basket");
    thisUser.basket[index].quantity += 1;
    thisUser.totalSum = totalSum(thisUser.basket);
    await thisUser.save();
    res.json({ message: "producr added succsesfully", totalSum: thisUser.totalSum });
};

const minusProdFromBasket = async (req, res) => {
    const { barCode } = req.body;
    if (!barCode)
        return res.status(400).send("barCode is required");
    const addProduct = await Product.findOne({ barCode });
    if (!addProduct)
        return res.status(404).send("barCode is not found");
    const thisUser = await User.findById(req.user._id);
    if (!thisUser)
        return res.status(404).send("user is not found");
    const index = thisUser.basket.findIndex(p => p.barCode === barCode);
    if (index == -1)
        return res.status(404).send("Product not found in basket");
    thisUser.basket[index].quantity -= 1;
    if (thisUser.basket[index].quantity == 0)
        thisUser.basket.splice(index, 1);
    thisUser.totalSum = totalSum(thisUser.basket);
    await thisUser.save();
    res.json({ message: "producr redused succsesfully", totalSum: thisUser.totalSum });
};

const veiwBasket = async (req, res) => {
    const userId = req.user._id;
    const thisUser = await User.findById(userId);
    if (!thisUser)
        return res.status(404).send("User not found");
    thisUser.totalSum = totalSum(thisUser.basket || []);
    await thisUser.save();
    return res.json({ basket: thisUser.basket, totalSum: thisUser.totalSum });
};

const deleteBasket = async (req, res) => {
    const userId = req.user._id;
    const thisUser = await User.findById(userId);
    if (!thisUser) return res.status(404).send("User not found");
    thisUser.basket = [];
    thisUser.totalSum = 0;
    await thisUser.save();
    return res.json({ basket: thisUser.basket, totalSum: thisUser.totalSum });
};

const bigProduct = async (req, res) => {
    const { barCode } = req.params;
    const newBarCode = Number(barCode);
    if (isNaN(newBarCode)) {
        return res.status(400).send("Invalid barCode");
    }
    const product = await Product.findOne({ barCode: newBarCode });
    if (!product)
        return res.status(404).send("Product is not defined");
    return res.json({
        name: product.name,
        barCode: product.barCode,
        price: product.price,
        img: product.img,
        category: product.category,
        description: product.description,
        designer: product.designer,
        madeIn: product.madeIn,
        amount: product.amount,
        isSale: product.isSale,
        percents: product.percents
    });
};

module.exports = { addProduct, deleteProduct, updateProduct, veiwAll, addProdToBasket, deleteProdFromBasket, plusProdToBasket, minusProdFromBasket, veiwBasket, deleteBasket, bigProduct };