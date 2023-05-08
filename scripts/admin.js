import express from "express";
import fs from "fs";
import { getDefaultSite } from "./constants.js";
import multer from "multer";
import { authenticateToken } from "./jwt.js";
import {
  deleteReport,
  insertLocationFromBoatRamp,
  insertLocationFromPark,
  insertLocationFromWaterSite,
  resetLocationTable,
  updateReport,
  updateReportComplete,
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
  const fileContents = fs.readFileSync(req.file.path, "utf8");

  if (fileContents != null) {
    const csv = readCsv(fileContents);
    if (csv != null) {
      if (req.body.facility === "park") {
        if (req.body.action == "replace") {
          await resetLocationTable();
        }
        for (let row of csv) {
          await insertLocationFromPark(row);
        }
        console.log("Rows Inserted");
      } else if (req.body.facility === "boat") {
        if (req.body.action == "replace") {
          await resetLocationTable();
        }
        for (let row of csv) {
          await insertLocationFromBoatRamp(row);
        }
      } else if (req.body.facility === "water") {
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

router.get("/deleteReport/:id", authenticateToken, async (req, res) => {
  if (req.user == "admin") {
    await deleteReport(req.params.id);
    res.redirect("/admin");
  } else {
    res.redirect("/");
  }
});

router.post("/editReport", authenticateToken, async (req, res) => {
  if (req.user == "admin") {
    await updateReport(req.body.id, req.body.notes, req.body.type);
    res.redirect("/admin");
  } else {
    res.redirect("/");
  }
});

router.post("/updateCompleteReport", (req, res) => {
  updateReportComplete(req.body.id, req.body.complete);
});
