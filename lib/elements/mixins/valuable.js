var _ = require("lodash-node");

module.exports = {
  val: function (val) {
    var node = this.getDOMNode();

    if (_.isUndefined(val)) {
      return node.value;
    }

    node.value = val;
    this.simulate.change(node, {
      target: {
        value: val
      }
    });

    return val;
  }
};