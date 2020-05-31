const sqlite3 = require('sqlite3').verbose();                     


/**
 * Create and initialise database.
 */
let db = new sqlite3.Database('temperature.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the temperature database.');

  let sqlCreateTable = `CREATE TABLE IF NOT EXISTS logger (
    id INTEGER PRIMARY KEY,
    indoor_temperature REAL,
    outdoor_temperature REAL,
    timestamp TEXT
  );`

  db.run(sqlCreateTable)
  db.close()
});

module.exports = db