import express from "express";
import { getDefaultSite } from "./constants.js";
import { authenticateToken } from "./jwt.js";
import { getALLReportsWithLocation } from "./database.js";

const router = express.Router();
export default router;

router.get("/team", authenticateToken, (req, res) => {
  if (req.user == "team") {
    res.render("../src/team.html", { site: getDefaultSite() });
  } else {
    res.redirect("/");
  }
});

router.get("/active", authenticateToken, (req, res) => {
  if (req.user == "team") {
    res.render("../src/active.html", { site: getDefaultSite() });
  } else {
    res.redirect("/");
  }
});

router.get("/reports", async (req, res) => {
  const reports = await getALLReportsWithLocation();

  return res.json(reports);
});
