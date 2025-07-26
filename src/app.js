const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { routesMap } = require("./routes/index");
const { userAuthMiddleware } = require('./midddlewares/authMiddlewares');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

Object.keys(routesMap).forEach((key) => app.use(`/api${key}`, routesMap[key]));



app.get("/api", userAuthMiddleware, async(req, res) => {
	res.send("Hi");
})

module.exports = app;