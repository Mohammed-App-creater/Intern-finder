const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { NODE_ENV } = require("./config/env");
const talentAuthRouter = require("./modules/auth/talentAuth.route");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

const app = express();

if (NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/auth/talent", talentAuthRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
