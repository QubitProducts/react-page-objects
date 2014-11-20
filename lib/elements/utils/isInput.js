var isReactBootstrapInput = require("./isReactBootstrapInput");

function isInput(inputType) {
  return function (ref, element) {
    if (element.type === (inputType || "input")) {
      return true;
    }

    // support react-bootstrap
    return isReactBootstrapInput(ref);
  };
}

module.exports = isInput;