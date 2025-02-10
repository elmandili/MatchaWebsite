require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const multer = require('multer')
const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

//mongoose server setup
const Product = require('./models/product.model')
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ilqpr9n.mongodb.net/Hakone?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true, }, serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000
};

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, clientOptions);
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit on failure
  }
}
connectDB(); // Call this function once at startup









app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json());


// Set EJS as the template engine
app.set("view engine", "ejs");

/// Set a custom folder for templates
app.set("views", path.join(__dirname)); // Change "your-custom-folder"

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname)));
// Sample product data
const products = [];




app.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { category, price, title, description } = req.body;

    // Create a new product with the image
    const newProduct = new Product({
      image: {
        data: req.file.buffer, // Store image as Buffer
        contentType: req.file.mimetype
      },
      category,
      price,
      title,
      description
    });

    // Save the product to the database
    await newProduct.save();

    // Send a JSON response without redirecting or showing a new page
    res.status(201).json({ message: "Product added successfully!" });
    res.render('admin/admin')

  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Error adding product" });
  }
});

app.delete('/delete-product/:id', async (req, res) => {
  try {
      const productId = req.params.id;
      const result = await Product.findByIdAndDelete(productId);

      if (result) {
          res.status(200).json({ message: 'Product deleted successfully!' });
      } else {
          res.status(404).json({ error: 'Product not found!' });
      }
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
  }
});



async function AddProduct() {
  try {
    const newProduct = new Product({
      image: "String",
      category: "String",
      price: 10,
      title: "String",
      description: "String",
    });

    await newProduct.save();
    console.log("Product Added:", newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

async function GetProducts() {
  try {
    products = await Product.find();
    // console.log(products);
  }
  catch (err) {
    console.log(err.message)
  }

}





app.post("/order-mail/:product_name/:price", async (req, res) => {
  const { name, email, phone, address, city, state, zip, quantity } = req.body;
  // console.log("name: " + name);
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

app.get('/admin', async (req, res) => {
  try {
    const products = await Product.find();

    // Convert Binary image data to Base64 if available
    const processedProducts = products.map(product => {
      let imageBase64 = null;

      if (product.image && product.image.buffer) {
        // If stored as a Buffer
        imageBase64 = `data:image/png;base64,${product.image.buffer.toString('base64')}`;
      } else if (product.image && product.image.toString) {
        // If stored as Binary (MongoDB BinData)
        imageBase64 = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;


      }

      return {
        _id: product._id,
        title: product.title,
        category: product.category,
        price: product.price,
        description: product.description,
        image: imageBase64
      };
    });

    res.render('admin/admin', { products: processedProducts });
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
});



// Render index.ejs and pass products array
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    // Convert Binary image data to Base64 if available
    const processedProducts = products.map(product => {
      let imageBase64 = null;

      if (product.image && product.image.buffer) {
        // If stored as a Buffer
        imageBase64 = `data:image/png;base64,${product.image.buffer.toString('base64')}`;
      } else if (product.image && product.image.toString) {
        // If stored as Binary (MongoDB BinData)
        imageBase64 = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;


      }

      return {
        _id: product._id,
        title: product.title,
        category: product.category,
        price: product.price,
        description: product.description,
        image: imageBase64
      };
    });

    res.render('index', { products: processedProducts, activePage: "home" });
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
});



app.get("/product-preview/:id", async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send("Invalid product ID");
  }

  try {
    const product = await Product.findById(productId);


    
    
    if (!product) {
      return res.status(404).send("Product not found");
    }
    else{
      product.image = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`
      
    }
    res.render("product-details", { product, activePage: 'products' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving product");
  }
});


app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    // Convert Binary image data to Base64 if available
    const processedProducts = products.map(product => {
      let imageBase64 = null;

      if (product.image && product.image.buffer) {
        // If stored as a Buffer
        imageBase64 = `data:image/png;base64,${product.image.buffer.toString('base64')}`;
      } else if (product.image && product.image.toString) {
        // If stored as Binary (MongoDB BinData)
        imageBase64 = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;


      }

      return {
        _id: product._id,
        title: product.title,
        category: product.category,
        price: product.price,
        description: product.description,
        image: imageBase64
      };
    });

    res.render('products', { products: processedProducts, activePage: "products" });
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
})

app.get("/contact-us", (req, res) => {
  res.render("contact", { activePage: "contact-us" })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
