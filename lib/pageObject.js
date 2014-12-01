var React = require("react");
var _ = require("underscore");
var extend = require("./extend");
var elementFactory = require("./elementFactory");

function PageObject(props) {
  if (isReactInstance(props)) {
    this.element = props;
  } else {
    this.element = getElement(this);
  }

  this.dispose = dispose;

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
    var component = po.getComponent(props);

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
    console.warn("Implement PageObject#getComponent");
  }
};

PageObject.extend = extend;

module.exports = PageObject;