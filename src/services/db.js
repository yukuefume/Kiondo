const sqlite3 = require('sqlite3').verbose();                     


/**
 * Create and initialise database.
 */
let db = new sqlite3.Database('temperature.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the temperature database.');

  let sqlCreateTable = `
  CREATE TABLE IF NOT EXISTS logger (
    id INTEGER PRIMARY KEY,
    measured_temperature REAL,
    outdoor_temperature REAL,
    outdoor_timestamp TEXT,
    outdoor_location TEXT,
    timestamp TEXT
  );`

  db.run(sqlCreateTable)
});

module.exports = db


/**
 * Insert temperature values into the database.
 */
module.exports.logTemperature = function logTemperature(measuredTemp, outdoorTemp, outdoorTimestamp, outdoorLocation, timestamp) {
  let sqlInsert = `
  INSERT INTO logger (
    measured_temperature, 
    outdoor_temperature, 
    outdoor_timestamp,
    outdoor_location, 
    timestamp
    ) VALUES (?,?,?,?,?);`
  // insert one row into the langs table
  
  db.run(sqlInsert, [measuredTemp, outdoorTemp, outdoorTimestamp, outdoorLocation, timestamp], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`Recorded temperature readings at ${timestamp}`);
  });
}