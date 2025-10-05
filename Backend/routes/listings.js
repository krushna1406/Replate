import express from "express";
import Surplus from "../models/Surplus.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("📦 Listings API is working!");
});

// Add new listing
router.post("/", async (req, res) => {
  try {
    const listing = new Surplus(req.body);
    await listing.save();
    res.status(201).json({ success: true, listing });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all listings
router.get("/all", async (req, res) => {
  try {
    const listings = await Surplus.find().sort({ createdAt: -1 });
    res.json({ success: true, listings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Claim a listing (NGO action)
router.put("/:id/claim", async (req, res) => {
  try {
    const listing = await Surplus.findByIdAndUpdate(
      req.params.id,
      { status: "claimed" },
      { new: true }
    );
    res.json({ success: true, listing });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
