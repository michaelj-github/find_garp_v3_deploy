const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const { authenticateJWT } = require("./middleware/auth");

// cors may be required to prevent cors errors
// cors will need to be installed (npm i cors) and in package.json // can be used if necessary
// see: https://expressjs.com/en/resources/middleware/cors.html

app.use(express.json());
app.use(authenticateJWT);
//

// routes
const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);
const companiesRoutes = require("./routes/companies");
app.use("/companies", companiesRoutes);
const analysesRoutes = require("./routes/analyses");
app.use("/analyses", analysesRoutes);
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);
//

//
app.get("/", (req, res) => {
  console.log("Find GARP Home Page");
  return res.send("Find GARP Home Page");
});

//

//
// standard error handlers and server startup
//

// 404 error for page not found if no other route is matched
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  return next(e);
});

// error handler
app.use((error, req, res, next) => {
  let status = error.status || 500; // default to 500
  let message = error.message;
  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
