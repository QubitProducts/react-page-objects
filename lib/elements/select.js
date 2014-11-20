var BaseElement = require("./baseElement");
var valueable = require("./mixins/valueable");

var Select = BaseElement.extend({
  type: "select",
  mixins: [valueable],
  select: function (value) {
    this.simulate.select(this.getDOMNode(), {
      target: {
        value: value
      }
    });
  }
});

module.exports = Select;