var BaseElement = require("./base");
var input = require("./utils/isInput");
var valueable = require("./mixins/valueable");

var Select = BaseElement.extend({
  isTypeOf: input("select"),
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