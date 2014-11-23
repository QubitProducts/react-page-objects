var React = require("react");
var _ = require("underscore");
var extend = require("./extend");
var elementFactory = require("./elementFactory");

var viewOptions = ["props"];

function PageObject(options) {
  if (isReactInstance(options)) {
    this.element = options;
  } else {
    this.element = getElement(this);
  }

  _.each(this.element.refs, function (ref, name) {
    this[name] = elementFactory(ref, name, this.elements);
  }, this);

  Object.defineProperty(this, "state", {
    get: function () {
      return this.element.state;
    }
  });

  function getElement(po) {
    var utils = require("react/addons").addons.TestUtils;

    _.extend(po, _.pick(options, viewOptions));

    var component = po.getComponent();

    if (!component) {
      throw new Error("component required");
    }

    return utils.renderIntoDocument(component);
  }

  function dispose() {
    React.unmountComponentAtNode(this.element.getDOMNode().parentNode);
  }
}

function isReactInstance(obj) {
  return _.has(obj, "_owner");
}

PageObject.prototype = {
  getComponent: function () {
    console.error("Implement PageObject#getComponent");
  }
};

PageObject.extend = extend;

module.exports = PageObject;