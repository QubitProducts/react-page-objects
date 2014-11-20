var input = require("./utils/isInput");
var BaseElement = require("./baseElement");
var valueable = require("./mixins/valueable");
var inputable = require("./mixins/inputable");


var Select = BaseElement.extend({
  isTypeOf: input("select"),
  mixins: [valueable, inputable],
  select: function (value) {
    this.simulate.select(this.getDOMNode(), {
      target: {
        value: value
      }
    });
  }
});

module.exports = Select;