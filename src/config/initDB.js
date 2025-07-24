const pool = require('./db');
const dbCreateStrings = require("./dbStructure");

async function initDatabase() {
	const connection = await pool.getConnection();

	dbCreateStrings.map(async(query) => await connection.query(query));
	// await connection.query();

	connection.release();
	console.log("✅ All Tables Ready");
}

module.exports = initDatabase;
