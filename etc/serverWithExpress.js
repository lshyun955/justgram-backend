const http = require("http");
const express = require("express");
const sendProducts = require("./sendProducts");
const sendFeeds = require("./sendFeeds");
const sendFeedById = require("./sendFeedById");

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "/pong" });
});

app.post("/signup", (req, res) => {
  res.json("signup success!");
});

app.post("/login", (req, res) => {
  res.json("login success!");
});

app.get("/products", sendProducts);
app.get("/feeds", sendFeeds);
app.get("/feed/:id", sendFeedById);

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
