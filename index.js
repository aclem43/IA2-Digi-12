const express = require("express");
const sprightlyExpress = require("sprightly/express");
const app = express();
const port = 3000;

app.engine(
  "html",
  sprightlyExpress({
    cache: false,
    keyFallback: "obada",
    throwOnKeyNotfound: false,
  })
);

app.use(express.static("static"));
app.get("/", (_, res) => {
  const data = {
    testData: "This is data from the server",
  };
  res.render("../src/index.html", data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
