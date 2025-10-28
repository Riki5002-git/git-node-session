require("dotenv").config();
const connectDB = require("./Config/dbConn");
const express = require("express");
const app = express();
const cors = require("cors");
const CorsOptions = require("./CorsOptions");
const PORT = process.env.PORT || 2700;

connectDB();

app.use(express.json());
app.use(cors(CorsOptions));
app.use("/api/user", require("./Routers/AuthRouter"));
app.use("/api/product", require("./Routers/ProductRouter"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});