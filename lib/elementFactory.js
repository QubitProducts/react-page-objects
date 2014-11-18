var _ = require("lodash-node");
var ElementCollection = require("./elementCollection");
var defaultElement = require("./elements/baseElement");

var elements = [
  require("./elements/input")
];

function elementFactory(ref, name, customElements) {

  if (customElements) {
    var CustomElement = customElements[name];

    if (CustomElement) {
      if (_.isArray(CustomElement)) {
        return new ElementCollection(ref, name, CustomElement[0]);
      }

      return new CustomElement(ref, name);
    }
  }

  var Element = getElementForRef(ref);

  return new Element(ref, name);
}


function getElementForRef(ref) {
  return _.find(elements, function (element) {
    if (element.isTypeOf(ref, ref._currentElement)) {
      return element;
    }
  }) || defaultElement;
}

module.exports = elementFactory;