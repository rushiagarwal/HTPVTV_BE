var express = require("express");
var indexRouter = require("./routes/index.js");
const { auth } = require("express-openid-connect");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'tPam7fBxv6SVQDlsrxbp3J9JltxMlGaXP3nMwKZHBepui0po4gT7uFRmXWZy6e2cZlwXNjFW6JNHFH52Ia3K9ENzowKyS5n4UmhU',
    baseURL: 'http://localhost:3000',
    clientID: 'go49zXdDEz2XWmYfF4e3zAbGcgHfOKPI',
    issuerBaseURL: 'https://dev-auvr5n7c8bx1ndfc.us.auth0.com'
  };


var app = express();
app.set("views","views");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use("/",indexRouter);

app.listen(3000, () =>{
    console.log('express is running on port 3000');
});