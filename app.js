// Change the following to require statements to imports
import express from "express";
import sprightlyExpress from "sprightly/express";
import bodyParser from "body-parser";
import { authenticateToken, generateAccessToken } from "./scripts/jwt.js";
import {
  getAllLocations,
  initilizeDatabase,
  insertReport,
} from "./scripts/database.js";
import { getDefaultSite } from "./scripts/constants.js";
import admin from "./scripts/admin.js";
import location from "./scripts/locations.js";
import team from "./scripts/team.js";
import { getLocationByName } from "./scripts/utils.js";
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
app.use("/", team);

app.get("/", (_, res) => {
  const data = {
    site: getDefaultSite(),
  };
  res.render("../src/index.html", data);
});
app.get("/report", (_, res) => {
  const data = {
    site: {
      ...getDefaultSite(),
      siteName: getDefaultSite().siteName + " - Report",
    },
  };
  res.render("../src/report.html", data);
});

app.post("/report", async (req, res) => {
  if (req.body.location != null && req.body.type != "Select A Problem") {
    const data = {
      site: {
        ...getDefaultSite(),
        siteName: getDefaultSite().siteName + " - Report",
      },
    };
    const date = new Date().toLocaleString();
    console.log(date);
    await insertReport(
      getLocationByName(req.body.location, await getAllLocations()).id,
      date,
      req.body.type,
      req.body.notes
    );
    res.render("../src/report.html", data);
    return;
  }
  const data = {
    error: {
      message: "Invalid Input",
    },
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
    if (username == "team") {
      res.cookie("authorization", generateAccessToken(username), {
        maxAge: "15000",
      });
      res.redirect("team");
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

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
