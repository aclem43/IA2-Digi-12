import express from "express";
import fs from "fs";
import { getDefaultSite } from "./constants.js";
import multer from "multer";
import { authenticateToken } from "./jwt.js";
import { sql } from "./database.js";

const upload = multer({ dest: "tmp/" });
const router = express.Router();
export default router;
router.get("/admin", authenticateToken, (req, res) => {
  if (req.user == "admin") {
    res.render("../src/admin.html", (data = { site: getDefaultSite() }));
  } else {
    res.redirect("/");
  }
});

router.post("/uploadcsv", upload.single("csv"), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(500);
  }
  console.log("Recieved");
  fs.readFile(req.file.path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    rows = data.split("\n");
    const cleanData = [];
    for (let row of rows) {
      let cleanRow = row.split(",");
      cleanRow.forEach((column, idx) => {
        if (column == "\r" || !column) {
          cleanRow.splice(idx, 1);
        } else if (column.endsWith("\r")) {
          cleanRow[idx] = column.replace("\r", "");
        }
      });
      if (cleanRow.length > 1) {
        cleanData.push(cleanRow);
      }
    }

    if (req.body.action == "replace") {
      sql.query("DROP TABLE ");
      // Drop Table, Recreate
    } else {
      // Append
    }

    console.log(cleanData);
  });

  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    console.log("File deleted");
  });

  res.redirect("/admin");
});
