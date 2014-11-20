var BaseElement = require("./baseElement");
var valueable = require("./mixins/valueable");
var clickable = require("./mixins/clickable");

var Input = BaseElement.extend({
  type: "input",
  mixins: [clickable, valueable]
});

module.exports = Input;