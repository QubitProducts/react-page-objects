var _ = require("lodash-node");

function ElementCollection(ref, name, type) {
  this.ref = ref;
  this.name = name;
  this.type = type;

  Object.defineProperty(this, "length", {
    get: function () {
      return this.elements.length;
    }
  });

  Object.defineProperty(this, "elements", {
    get: function () {
      var Element = this.type;

      return _.map(this.ref._renderedChildren, function (element) {
        return new Element(element);
      }, this.type);
    }
  });
}

ElementCollection.prototype = {
  get: function (index) {
    return this.elements[index];
  }
};

var methods = [
  "forEach", "each", "map", "collect", "reduce", "foldl",
  "inject", "reduceRight", "foldr", "find", "detect", "filter", "select",
  "reject", "every", "all", "some", "any", "include", "contains", "invoke",
  "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest",
  "tail", "drop", "last", "without", "difference", "indexOf", "shuffle",
  "lastIndexOf", "isEmpty", "chain", "sample", "partition"
];

// Mix in each Underscore method as a proxy to `Collection#models`.
_.each(methods, function(method) {
  if (!_[method]) return;
  ElementCollection.prototype[method] = function() {
    var args = [].slice.call(arguments);
    args.unshift(this.elements);
    return _[method].apply(_, args);
  };
});

module.exports = ElementCollection;