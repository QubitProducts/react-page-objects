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

  wrapComponentDidUpdate(this.element, this);

  updateRefs(this);

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

  function updateRefs(po) {
    _.each(po.element.refs, function (ref, name) {
      this[name] = elementFactory(ref, name, po.elements);
    }, po);
  }

  function wrapComponentDidUpdate(component, po) {
    var oldComponentDidUpdate = component.componentDidUpdate;
    component.componentDidUpdate = function () {
      updateRefs(po);
      oldComponentDidUpdate && oldComponentDidUpdate.apply(this, arguments);
    };
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