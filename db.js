var sqlite = require('sqlite');
var db = sqlite.Database();
db.open("tasks.db", function (error) {
  throw "db failed."
});
module.exports = db;
