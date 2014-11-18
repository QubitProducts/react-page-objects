/** @jsx React.DOM */

var React = require("react");
var User = require("./user");
var PageObject = require("../../index");

module.exports = PageObject.extend({
  getComponent: function () {
    return <User />;
  }
});