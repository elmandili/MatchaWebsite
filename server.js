const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json());

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
        price: 4.00,
        title: "Premium Japanese Matcha",
        description: "Organic ceremonial grade matcha powder.",
    },
    {
        id: 2,
        image: "assets/images/banner-matcha-2.webp",
        category: "Matcha",
        price: 10.00,
        title: "Green Matcha Powder",
        description: "High-quality matcha for everyday use.",
    },
    {
        id: 3,
        image: "assets/images/banner-matcha-3.webp",
        category: "Matcha",
        price: 25.00,
        title: "Superior Culinary Matcha",
        description: "Perfect for smoothies and lattes.",
    },
];








app.post("/order-mail/:product_name/:price", async (req,res)=>{
    const { name, email, phone, address, city, state, zip, quantity } = req.body;
    console.log("name: " + name);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    let customerName = "customer example";
    let customerEmail = "customerPhone"
    let customerPhone = "customerPhone"
    let shippingAddress = "shippingAddress"
    let price = req.params.price
    let productName = req.params.product_name
    let productPrice = "productPrice"
    
    let totalPrice = "totalPrice"




    const htmlContent = `
<table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif; border: 1px solid #dddddd;">
  <thead>
    <tr>
      <th colspan="2" style="background-color: #0066cc; color: #ffffff; padding: 15px; text-align: center; font-size: 24px;">
        Order Confirmation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" style="padding: 15px; font-size: 16px;">
        <strong>Customer Details:</strong><br>
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 15px; font-size: 16px; background-color: #f8f8f8;">
        <strong>Shipping Address:</strong><br>
        ${address}<br>
        ${city}, ${state}<br>
        ${zip}
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 15px; font-size: 16px;">
        <strong>Order Summary:</strong>
      </td>
    </tr>
    <tr>
      <td style="padding: 15px; font-size: 16px; border: 1px solid #dddddd;">
        <strong>Product</strong><br>
        ${productName}
      </td>
      <td style="padding: 15px; font-size: 16px; border: 1px solid #dddddd;">
        <strong>Price</strong><br>
        $${price}
      </td>
    </tr>
    <tr>
      <td style="padding: 15px; font-size: 16px; border: 1px solid #dddddd;">
        <strong>Quantity</strong><br>
        ${quantity}
      </td>
      <td style="padding: 15px; font-size: 16px; border: 1px solid #dddddd;">
        <strong>Total</strong><br>
        $${price * quantity}
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 15px; font-size: 16px; text-align: center; background-color: #f8f8f8;">
        Thank you for your order! If you have any questions, feel free to contact us.
      </td>
    </tr>
  </tbody>
</table>
`;

    const info = await transporter.sendMail({
        from: {
            name: "Aymane",
            address: process.env.USER_EMAIL
        }, // sender address
        to: "takedazenchen@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlContent, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
})

// Render index.ejs and pass products array
app.get("/", (req, res) => {
    res.render("index", { products });
});

app.get("/product-preview/:product_name/:description/:imgpath/:price", (req,res)=>{
    const product_name = req.params.product_name
    const description = req.params.description
    const imgpath = decodeURIComponent(req.params.imgpath)
    price = req.params.price
    
    res.render("property-details", {product_name, description,imgpath, price})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
