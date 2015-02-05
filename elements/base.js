var _ = require("underscore");
var extend = require("../lib/extend");

function BaseElement(ref, name) {
  this.ref = ref;
  this.name = name;
  this.simulate = require("react/addons").addons.TestUtils.Simulate;

  _.extend.apply(_, [this].concat(mixinsWithoutInitialize(this.mixins)));

  callMixinInitializers(this.mixins, this, arguments);

  if (!_.has(this, "value")) {
    Object.defineProperty(this, "value", {
      get: function () {
        return this.getDOMNode().innerText;
      }
    });
  }

  function mixinsWithoutInitialize(mixins) {
    return _.map(mixins, function (mixin) {
      return _.omit(mixin, "initialize");
    });
  }

  function callMixinInitializers(mixins, context, args) {
    return _.each(mixins, function (mixin) {
      if (mixin.initialize) {
        mixin.initialize.apply(context, args);
      }
    });
  }
}

BaseElement.prototype = {
  getDOMNode: function () {
     // react-bootstrap makes input node accessible via getInputDOMNode
    if (this.ref.getInputDOMNode) {
      return this.ref.getInputDOMNode();
    }

    return this.ref.getDOMNode();
  },
  click: function () {
    this.simulate.click(this.getDOMNode());
  }
};

BaseElement.extend = function (protoProps) {
  var staticProps = _.pick(protoProps, "type", "isTypeOf");

  if (staticProps.type) {
    staticProps.isTypeOf = function (ref, element) {
      var type = element.type;

      if (_.isFunction(type) && type.displayName) {
        type = type.displayName;
      }

      return type.toLowerCase() === staticProps.type.toLowerCase();
    };
  }

  return extend.call(this, protoProps, staticProps);
};

module.exports = BaseElement;