var Resource = require('./base');

var TaskGroup = new Resource('taskgroups', 'TaskGroup', {
  destroy: function (req, res) {
    var id = parseInt(req.params.id);
    Models.Task.count({where: ["TaskGroupId=?", id]}).success(function (c) {
      if (c) {
        res.redirect(self.indexPath());
      } else {
        self.model.find(id).success(function (entity) {
          entity.destroy();
          res.redirect(self.indexPath());
        });
      }
    });
  }

});



module.exports = TaskGroup;
