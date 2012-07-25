// load sequelize
var Sequelize = require("sequelize")
var sequelize= new Sequelize('', '', '', {
  dialect: 'sqlite',
  storage: "./taskserver.db"
});

// models
var TaskGroup = sequelize.define('TaskGroup', {
  name: { type: Sequelize.STRING, unique: true },
  config: { type: Sequelize.TEXT },
  enabled: { type: Sequelize.BOOLEAN, defaultValue: true }
}, {

});

var Task = sequelize.define('Task', {
  name: { type: Sequelize.STRING, unique: true },
  resource: { type: Sequelize.TEXT, allowNull: false },
  enabled: { type: Sequelize.BOOLEAN, defaultValue: true }
}, {

});

var Result = sequelize.define('Result', {
  data: { type: Sequelize.TEXT, allowNull: false },
  success: { type: Sequelize.BOOLEAN, defaultValue: true }
}, {

});


// model associations
TaskGroup.hasMany(Task, {as: 'Tasks'});
Task.hasMany(Result, {as: 'Results'});


// sync db
sequelize.sync().success(function () {
  console.log('sync db successfully');
}).error(function(error) {
  console.log('sync db failed: ', error);
});

// export models
module.exports = {
  TaskGroup: TaskGroup,
  Task: Task,
  Result: Result
};
