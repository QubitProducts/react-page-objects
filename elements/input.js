var BaseElement = require("./base");
var input = require("./utils/isInput");
var valueable = require("./mixins/valueable");

var Input = BaseElement.extend({
  isTypeOf: input(),
  mixins: [valueable]
});

module.exports = Input;