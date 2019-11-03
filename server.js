const express = require("express");
const app = express();
const PORT = 9001;
const path = require("path");
app.use(express.static(path.join(__dirname, "/static")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
const session = require("express-session");
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
app.get("/", (req, res) => {
res.render("index");
});
app.post("/createForm", (req, res) => {
    console.log("button Click", req.body)
    req.session.data = req.body
  res.redirect("/result");
//   res.render("result", { data: req.body });
});

app.get("/result", (req, res) => {
const { data } = req.session;
    let dt = {
        name: data.name,
        location: data.location,
        language: data.language,
        comment: data.comments
    }
    // console.log(dt)
  res.render("result", {data:dt});
});


app.listen(PORT, () => console.log(`listening on port ${PORT}`));