var BaseElement = require("../base");

module.exports = {
  getDOMNode: function () {
    // react-bootstrap makes input node accessible via getInputDOMNode
    if (this.ref.getInputDOMNode) {
      return this.ref.getInputDOMNode();
    }

    return BaseElement.prototype.getDOMNode.apply(this, arguments);
  }
};