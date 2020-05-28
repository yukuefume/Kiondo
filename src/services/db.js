const sqlite3 = require('sqlite3').verbose();


exports.connection = {
  create: () => {
    let db = new sqlite3.Database('temperature.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the temperature database.');
    });
  }
}