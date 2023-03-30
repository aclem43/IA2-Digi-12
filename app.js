const express = require("express");
const sprightlyExpress = require("sprightly/express");
const bodyParser = require("body-parser");
const { authenticateToken, generateAccessToken } = require("./scripts/jwt");
const { initilizeDatabase } = require("./scripts/database");
const { getDefaultSite } = require("./scripts/constants");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });

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

app.post("/uploadcsv", upload.single("csv"), (req, res) => {
  console.log(req);
  fs.readFile(req.file.path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    console.log(data);
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
    res.render(
      "../src/index.html",
      (data = {
        site: { siteName: getDefaultSite().siteName + " -Error" },
        error: {
          message: "Incorrect Username Or Password",
        },
      })
    );
    return;
  }

  res.render("../src/report.html");
});

app.get("/admin", authenticateToken, (req, res) => {
  if (req.user == "admin") {
    res.render("../src/admin.html", (data = { site: getDefaultSite() }));
  } else {
    res.redirect("/");
  }
});

app.get("/maintainer", authenticateToken, (req, res) => {
  if (req.user == "maintainer") {
    res.render("../src/maintainer.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
