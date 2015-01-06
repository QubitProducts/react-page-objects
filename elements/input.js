var BaseElement = require("./base");
var input = require("./utils/isInput");
var valueable = require("./mixins/valueable");
var clickable = require("./mixins/clickable");
var inputable = require("./mixins/inputable");

var Input = BaseElement.extend({
  isTypeOf: input(),
  mixins: [clickable, valueable, inputable]
});

module.exports = Input;