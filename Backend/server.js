const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is missing in .env file");
  process.exit(1);
}

// Import models & routes
const listItemRoutes = require("./routes/listItemRoutes");
const ListItem = require("./models/Rental_Item"); // ✅ Import model correctly

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/items", listItemRoutes);

// ✅ `/listings` Route
app.get("/listings", async (req, res) => {
  try {
    const items = await ListItem.find();
    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching listings:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Improved Database Connection Handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected Successfully");

    // 🔹 Fetch & Log All Items After Connection
    const items = await ListItem.find();
    console.log("📢 Current Items in DB:", items);

  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

// Start the server after connecting to DB
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

// ✅ Global Error Handling for Unexpected Errors
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception! Shutting down...");
  console.error(err.stack || err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Promise Rejection! Shutting down...");
  console.error(err.stack || err);
  process.exit(1);
});
