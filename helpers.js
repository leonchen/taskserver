module.exports = {
  indexPath: function (resource) {
    return "/"+resource.name;
  },
  newPath: function (resource) {
    return "/"+resource.name+"/new";
  },
  showPath: function (resource, obj) {
    return "/"+resource.name+"/"+obj.id;
  },
  editPath: function (resource, obj) {
    return "/"+resource.name+"/"+obj.id+"/edit";
  },
  updatePath: function (resource, obj) {
    return "/"+resource.name+"/"+obj.id;
  },
  deletePath: function (resource, obj) {
    return "/"+resource.name+"/"+obj.id+"/delete";
  }
}
