const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: {
        data: Buffer, // Image data as binary
        contentType: String // MIME type (e.g., 'image/png', 'image/jpeg')
    },
    category: String,
    price: Number,
    title: String,
    description: String
}, {
    strict: false
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
