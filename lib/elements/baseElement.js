var _ = require("lodash-node");
var extend = require("../extend");

function BaseElement (ref, name) {
  this.ref = ref;
  this.name = name;
  this.simulate = require("react/addons").addons.TestUtils.Simulate;

  _.extend.apply(this, [this].concat(this.mixins));
}

BaseElement.prototype = {
  getDOMNode: function () {
    return this.ref.getDOMNode();
  },
  val: function () {
    return this.getDOMNode().innerText;
  }
};

BaseElement.extend = function (protoProps) {
  var staticProps = _.pick(protoProps, "type", "isTypeOf");

  if (staticProps.type) {
    staticProps.isTypeOf = function (ref, element) {
      return element.type === staticProps.type;
    };
  }

  return extend.call(this, protoProps, staticProps);
};

module.exports = BaseElement;