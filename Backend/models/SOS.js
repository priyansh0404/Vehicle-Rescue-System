import mongoose from "mongoose";

const sosSchema = new mongoose.Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SOS = mongoose.model("SOS", sosSchema);

export default SOS;
