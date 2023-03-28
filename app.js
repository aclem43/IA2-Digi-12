const express = require("express");
const sprightlyExpress = require("sprightly/express");
const basicAuth = require("express-basic-auth");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

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
    site: {
      siteName: "site Name",
      tabName: "Sitename - Home",
    },
  };
  res.render("../src/index.html", data);
});
app.get("/report", (_, res) => {
  const data = {
    testData: "This is data from the server",
    site: {
      siteName: "site Name",
      tabName: "Sitename - Report",
    },
  };
  res.render("../src/report.html", data);
});
app.post("/login", (req, res) => {
  let error = false;
  if (!req.body.username) {
    error = true;
  }
  if (!req.body.password) {
    error = true;
  }
  if (error) {
    res.render(
      "../src/index.html",
      (data = {
        site: { siteName: "site Name", tabName: "Sitename - Error" },
        error: {
          message: "Incorrect Username Or Password",
        },
      })
    );
    return;
  }

  res.render("../src/report.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
