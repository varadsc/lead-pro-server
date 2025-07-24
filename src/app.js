const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
// const authRoutes = require('./routes/auth.routes');
// app.use('/api/auth', authRoutes);

// 404 & Error handler
// app.use((req, res) => res.status(404).send('Not Found'));
// app.use(require('./middlewares/errorHandler'));

app.get("/api", async(req, res) => {
	res.send("Hi");
})

module.exports = app;