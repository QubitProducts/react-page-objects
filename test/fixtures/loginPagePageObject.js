/** @jsx React.DOM */

var React = require("react");
var LoginPage = require("./loginPage");
var PageObject = require("../../index");

module.exports = PageObject.extend({
  getComponent: function () {
    return <LoginPage />;
  },
  loginAs: function (email, password) {
    this.email.val(email);
    this.password.val(password);
    this.login.click();
  }
});