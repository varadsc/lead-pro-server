const pool = require('./db');
const {createDBqueries, dummyDataQueries} = require("./dbStructure");

async function initDatabase() {
	const connection = await pool.getConnection();

	createDBqueries.map(async(query) => await connection.query(query));
	console.log("✅ All Tables Ready");
	
	dummyDataQueries.map(async (query) => await connection.query(query));
	console.log("✅ Dummy data inserted");

	connection.release();
}

module.exports = initDatabase;
