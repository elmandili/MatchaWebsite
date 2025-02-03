const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

/// Set a custom folder for templates
app.set("views", path.join(__dirname)); // Change "your-custom-folder"

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname)));
// Sample product data
const products = [
    {
        id: 1,
        image: "assets/images/banner-matcha-1.webp",
        category: "Matcha",
        price: "$4.00",
        title: "Premium Japanese Matcha",
        description: "Organic ceremonial grade matcha powder.",
    },
    {
        id: 2,
        image: "assets/images/banner-matcha-2.webp",
        category: "Matcha",
        price: "$10",
        title: "Green Matcha Powder",
        description: "High-quality matcha for everyday use.",
    },
    {
        id: 3,
        image: "assets/images/banner-matcha-3.webp",
        category: "Matcha",
        price: "$25",
        title: "Superior Culinary Matcha",
        description: "Perfect for smoothies and lattes.",
    },
];








// Render index.ejs and pass products array
app.get("/", (req, res) => {
    res.render("index", { products });
});

app.get("/product-preview/:name/:description/:imgpath", (req,res)=>{
    const name = req.params.name
    const description = req.params.description
    const imgpath = decodeURIComponent(req.params.imgpath)
    
    res.render("property-details", {name, description,imgpath})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
