import express from "express";
import { getAllLocations } from "./database.js";
import { getNearestLocations } from "./utils.js";

const router = express.Router();
export default router;

router.get("/locations", async (req, res) => {
  const locations = await getAllLocations();
  if (!locations) {
    res.json([]);
    return;
  }
  res.json(locations);
});

router.post("/nearest", async (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  const locations = await getNearestLocations(
    lat,
    long,
    await getAllLocations()
  );
  if (!locations) {
    res.json([]);
    return;
  }
  console.log(locations);
  res.json(locations);
});
