// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Get MongoDB URI and credentials from environment variables
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost/your-database-name";
const mongoUser = process.env.MONGODB_USER || "";
const mongoPass = process.env.MONGODB_PASSWORD || "";

// Create the MongoDB connection string
const mongoConnectionString = mongoUri.includes("://")
  ? mongoUri
  : `mongodb://${mongoUser}:${mongoPass}@${mongoUri}`;

// Connect to MongoDB
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a mongoose schema and model (you can create a separate models folder for this)
const Schema = mongoose.Schema;
const ShopSchema = new Schema({
  name: String,
  price: String,
});

const ShopModel = mongoose.model("Shop", ShopSchema);

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h3>Welcome to the shop API!</h3>");
});

// Define your API routes
app.get("/shop", async (req, res) => {
  try {
    const shopItems = await ShopModel.find();
    res.json(shopItems);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch shop items." });
  }
});

app.post("/shop", async (req, res) => {
  try {
    // Add three items to the shop
    const item1 = new ShopModel({ name: "Item 1", price: "10.99" });
    const item2 = new ShopModel({ name: "Item 2", price: "12.99" });
    const item3 = new ShopModel({ name: "Item 3", price: "14.99" });

    await item1.save();
    await item2.save();
    await item3.save();

    res.status(201).json({ message: "Three items added to the shop." });
  } catch (error) {
    res.status(500).json({ error: "Could not add items to the shop." });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
