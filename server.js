require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5500;

const initDatabase = require('./src/config/initDB');

initDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
});
