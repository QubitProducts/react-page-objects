var BaseElement = require("./baseElement");
var valuable = require("./mixins/valuable");
var clickable = require("./mixins/clickable");

var Input = BaseElement.extend({
  type: "input",
  mixins: [clickable, valuable]
});

module.exports = Input;