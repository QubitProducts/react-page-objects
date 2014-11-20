var React = require("react");
var expect = require("chai").expect;
var Select = require("./fixtures/select");
var PageObject = require("../index");

var SelectPageObject = PageObject.extend({
  getComponent: function () {
    return <Select />;
  }
});

describe("Select", function () {
  var page, expectedValue;

  beforeEach(function () {
    expectedValue = "baz";
    page = new SelectPageObject();
    page.test.select(expectedValue);
  });

  it("should change the selected value", function () {
    expect(page.test.value).to.equal(expectedValue);
  });
});