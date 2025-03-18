const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    rental_item_id: { type: Number, unique: true, required: true },  
    product_description: { type: String, required: true },  
    security_deposit: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    location: { type: String, required: true },
    city: { type: String, required: true },  // Added City attribute
    renter_id: { type: Number, required: true },
    categories: [{ type: String, required: true }],
    item_condition: [{ type: String, required: true }],
    images: [{ type: String, required: true }], // Added Image field for storing URLs
});

module.exports = mongoose.model("Item", itemSchema, "rental_items");
