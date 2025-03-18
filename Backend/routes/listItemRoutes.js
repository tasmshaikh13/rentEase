const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Item = require("../models/Rental_Item");

// 🖼️ Multer Configuration (File Storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// 🔹 1️⃣ Add New Item (Now Accepts Image Upload)
router.post("/api/items", upload.single("image"), async (req, res) => {
  try {
    const newItemData = { ...req.body };

    // Save image filename if a file is uploaded
    if (req.file) {
      newItemData.image = req.file.filename; // Store filename instead of full path
    }

    const newItem = new Item(newItemData);
    await newItem.save();

    res.status(201).json({ message: "Item created successfully", newItem });
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 2️⃣ Serve Images via API
router.get("/images/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads/", req.params.filename);
  
  // Check if file exists before sending
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Image not found" });
  }
});

// 🔹 3️⃣ Get All Listings
router.get("/all", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 4️⃣ Get Item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 5️⃣ Update an Item (Supports Image Upload)
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    let updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 6️⃣ Delete an Item
router.delete("/delete/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.image) {
      const filePath = path.join(__dirname, "../uploads/", item.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file from storage
      }
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 7️⃣ Get Listings
router.get("/", async (req, res) => {
  try {
    const listings = await Item.find();
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

module.exports = router;
