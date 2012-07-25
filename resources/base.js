var prototype = {
  indexPath: function () {
    return "/"+self.name;
  },

  entityPath: function (entity) {
    return "/"+self.name+"/"+entity.id;
  },

  index: function (req, res) {
    self.model.findAll().success(function (rows) {
      res.render(self.name+"/index", dict({rows: rows}));
    });
  },

  "new": function (req, res) {
    res.render(self.name+"/new");
  },

  create: function (req, res) {
    self.model.build(req.body.entity).save().success(function (entity) {
      res.redirect(self.indexPath());
    });
  },

  show: function (req, res) {
    res.render(self.name+"/show");
  },

  edit: function (req, res) {
    res.render(self.name+"/edit");
  },

  update: function (req, res) {
    res.redirect(self.indexPath());
  },

  destroy: function (req, res) {
    self.model.find(parseInt(req.params.id)).success(function (entity) {
      entity.destroy();
      req.session.messages.push('Resource Deleted.');
      res.redirect(self.indexPath());
    });
  },

  handleError: function (err, req, res) {
    if (! err) return;
    req.session.messages.push(err.message);
  }
};


var Base = function (name, modelName, overrides) {
  var self = this;
  var Models = require('../model');
  var sync = require('fibers');

  var run = function (code) {
    sync(code).run();
  };

  var dict = function (mapping) {
    var dict = {
      resource: self
    };

    if (mapping) {
      for (var m in mapping) dict[m] = mapping[m];
    }

    return dict;
  }

  var attr = function (name, attr) {
    if (typeof attr == "function") {
      eval("self['"+name+"'] = "+attr.toString());
    } else {
      self[name] = attr;
    }
  };

  this.name = name;
  this.model = Models[modelName];

  for (var k in prototype) attr(k, prototype[k]);

  for (var k in overrides) attr(k, overrides[k]);
};

module.exports = Base;
