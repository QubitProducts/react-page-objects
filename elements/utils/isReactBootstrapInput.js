function isReactBootstrapInput(input) {
  return !!input.getInputDOMNode;
}

module.exports = isReactBootstrapInput;