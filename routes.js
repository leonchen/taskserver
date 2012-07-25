var resources = require('./resources');

var rules = [];

var helper = {
  redirect: function (req, res, next, path) {
    res.redirect(path);
  }
};

// home route
rules.push(['GET', '/', helper, 'redirect', '/taskgroups']);

var restable = function (name, model) {
  rules.push(['GET',   '/'+name,               model, 'index']);
  rules.push(['GET',   '/'+name+"/new",        model, 'new']);
  rules.push(['POST',  '/'+name,               model, 'create']);
  rules.push(['GET',   '/'+name+'/:id',        model, 'show']);
  rules.push(['GET',   '/'+name+'/:id/edit',   model, 'edit']);
  rules.push(['PUT',   '/'+name+'/:id',        model, 'update']);
  rules.push(['DELETE', '/'+name+'/:id',       model, 'destroy']);
  // use a simple way for delete
  rules.push(['GET',   '/'+name+'/:id/delete', model, 'destroy']);
};

for (var name in resources) {
  restable(name, resources[name]);
}


module.exports = function(app) {
  for(var i=0, r; r=rules[i]; i++) {
    var method = r[0].toLowerCase();
    var path = r[1];
    var handler = r[2];
    var action = r[3];
    var params = r.slice(4) || [];

    app[method](path, function (h, a, p) {
      return function (req, res, next) {
        h[a].apply(h, [req, res, next].concat(p));
      };
    }(handler, action, params));
  }
};
