var BaseElement = require("./base");
var clickable = require("./mixins/clickable");

var Button = BaseElement.extend({
  type: "button",
  mixins: [clickable]
});

module.exports = Button;