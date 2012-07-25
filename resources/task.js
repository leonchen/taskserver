var Resource = require('./base');

var Task = new Resource('tasks', 'Task', {

  index: function (req, res) {
    Models.TaskGroup.findAll().success(function (rows) {
      var taskGroups = {};
      rows.forEach(function (row) {
        taskGroups[row.id] = row;
      });

      self.model.findAll().success(function (rows) {
        res.render(self.name+"/index", dict({rows: rows, taskGroups: taskGroups}));
      });
    });
  }

});



module.exports = Task;
