var _ = require("underscore");
var defaultElement = require("../elements/base");
var ElementCollection = require("./elementCollection");

var elements = [
  require("../elements/input"),
  require("../elements/select"),
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
    var currentElement = ref._reactInternalInstance._currentElement;
    if (element.isTypeOf(ref, currentElement)) {
      return element;
    }
  }) || defaultElement;
}

module.exports = elementFactory;