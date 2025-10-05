import mongoose from "mongoose";

const surplusSchema = new mongoose.Schema({
  role: { type: String, required: true },       // restaurant / event / caterer
  name: { type: String, required: true },       // business/event/NGO name
  phone: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, required: true },       // vegetarian / non-veg / mixed
  qty: { type: Number, required: true },        // servings
  safeBy: { type: String },                     // expiry time
  notes: { type: String },
  status: { type: String, default: "open" },    // open / claimed / completed
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Surplus", surplusSchema);
