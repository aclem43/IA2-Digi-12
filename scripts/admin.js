import express from "express";
import fs from "fs";
import { getDefaultSite } from "./constants.js";
import multer from "multer";
import { authenticateToken } from "./jwt.js";
import {
  insertLocationFromBoatRamp,
  insertLocationFromPark,
  insertLocationFromWaterSite,
  resetLocationTable,
} from "./database.js";
import { readCsv } from "./csv.js";

const upload = multer({ dest: "tmp/" });
const router = express.Router();
export default router;

router.get("/admin", authenticateToken, (req, res) => {
  if (req.user == "admin") {
    res.render("../src/admin.html", { site: getDefaultSite() });
  } else {
    res.redirect("/");
  }
});

router.post("/uploadcsv", upload.single("csv"), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(500);
  }
  console.log("Recieved");
  const fileContents = fs.readFileSync(req.file.path, "utf8");

  if (fileContents != null) {
    const csv = readCsv(fileContents);
    if (csv != null) {
      if (req.body.facility == "park") {
        if (req.body.action == "replace") {
          await resetLocationTable();
        }
        for (let row of csv) {
          await insertLocationFromPark(row);
        }
        console.log("Rows Inserted");
      } else if (req.body.facility == "boat") {
        if (req.body.action == "replace") {
          await resetLocationTable();
        }
        for (let row of csv) {
          await insertLocationFromBoatRamp(row);
        }
      } else if (req.body.facility == "water") {
        if (req.body.action == "replace") {
          await resetLocationTable();
        }
        for (let row of csv) {
          await insertLocationFromWaterSite(row);
        }
      }
      console.log("Rows Inserted");
    }
  } else {
    return res.sendStatus(500);
  }

  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    console.log("File deleted");
  });

  res.redirect("/admin");
});
