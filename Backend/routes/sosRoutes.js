import express from "express";
import SOS from "../models/SOS.js";

const router = express.Router();

// GET all SOS
router.get("/", async (req, res) => {
  try {
    const sosList = await SOS.find().sort({ createdAt: -1 });
    res.json(sosList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch SOS" });
  }
});

export default router;
