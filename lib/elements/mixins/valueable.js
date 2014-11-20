module.exports = {
  initialize: function () {
    Object.defineProperty(this, "value", {
      get: function () {
        return this.getDOMNode().value;
      },
      set: function (value) {
        var node = this.getDOMNode();

        node.value = value;
        this.simulate.change(node, {
          target: {
            value: value
          }
        });
      }
    });
  }
};