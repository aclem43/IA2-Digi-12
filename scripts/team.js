import express from "express";
import { getDefaultSite } from "./constants.js";
import { authenticateToken } from "./jwt.js";

const router = express.Router();
export default router;

router.get("/team", authenticateToken, (req, res) => {
  if (req.user == "team") {
    res.render("../src/team.html", { site: getDefaultSite() });
  } else {
    res.redirect("/");
  }
});
