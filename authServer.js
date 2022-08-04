const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());
// routes

app.post("/login", (req, res) => {
  // authenticate user

  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
}
app.listen(4000);
