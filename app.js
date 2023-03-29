const express = require("express");
const sprightlyExpress = require("sprightly/express");
const bodyParser = require("body-parser");
const { authenticateToken, generateAccessToken } = require("./scripts/jwt");
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
      siteName: "Bribane City Council Facilities",
      tabName: "Bribane City Council Facilities - Home",
    },
  };
  res.render("../src/index.html", data);
});
app.get("/report", (_, res) => {
  const data = {
    testData: "This is data from the server",
    site: {
      siteName: "Bribane City Council Facilities",
      tabName: "Bribane City Council Facilities - Report",
    },
  };
  res.render("../src/report.html", data);
});
app.post("/login", (req, res) => {
  let error = false;
  let username = "";
  let password = "";
  if (!req.body.username) {
    error = true;
  }
  if (!req.body.password) {
    error = true;
  }

  console.log(error);
  if (!error) {
    // Verify User
    username = req.body.username;
    password = req.body.password;
    if (username == "admin") {
      console.log("Admin");
      res.cookie("authorization", generateAccessToken(username), {
        maxAge: "1800000",
      });
      res.redirect("admin");
      return;
    }
  }
  console.log(username);

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

app.get("/admin", authenticateToken, (req, res) => {
  res.send("This route is protected");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
