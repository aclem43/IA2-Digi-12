// Change the following to require statements to imports
import express from "express";
import sprightlyExpress from "sprightly/express";
import bodyParser from "body-parser";
import { authenticateToken, generateAccessToken } from "./scripts/jwt.js";
import { getAllLocations, initilizeDatabase } from "./scripts/database.js";
import { getDefaultSite } from "./scripts/constants.js";
import admin from "./scripts/admin.js";
import location from "./scripts/locations.js";

const app = express();
const port = 3000;

initilizeDatabase();

app.engine(
  "html",
  sprightlyExpress({
    cache: false,
    throwOnKeyNotfound: false,
  })
);

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use("/", admin);
app.use("/", location);

app.get("/", (_, res) => {
  const data = {
    testData: "This is data from the server",
    site: getDefaultSite(),
  };
  res.render("../src/index.html", data);
});
app.get("/report", (_, res) => {
  const data = {
    testData: "This is data from the server",
    site: {
      ...getDefaultSite(),
      siteName: getDefaultSite().siteName + " - Report",
    },
  };
  res.render("../src/report.html", data);
});

app.get("/auth", authenticateToken, (req, res) => {
  res.cookie("authorization", generateAccessToken(req.user), {
    maxAge: "15000",
  });

  return res.sendStatus(200);
});

app.post("/login", (req, res) => {
  let error = false;
  let username,
    password = "";
  if (!req.body.username || !req.body.password) {
    error = true;
  }
  if (!error) {
    username = req.body.username;
    password = req.body.password;
    if (username == "admin") {
      res.cookie("authorization", generateAccessToken(username), {
        maxAge: "15000",
      });
      res.redirect("admin");
      return;
    }
  }
  if (error) {
    res.render("../src/index.html", {
      site: { siteName: getDefaultSite().siteName + " -Error" },
      error: {
        message: "Incorrect Username Or Password",
      },
    });
    return;
  }

  res.render("../src/report.html");
});

app.get("/maintainer", authenticateToken, (req, res) => {
  if (req.user == "maintainer") {
    res.render("../src/maintainer.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
