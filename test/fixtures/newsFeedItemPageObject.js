/** @jsx React.DOM */

var React = require("react");
var NewsFeed = require("./newsFeed");
var PageObject = require("../../index");
var UserPageObject = require("./userPageObject");

module.exports = PageObject.extend({
  elements: {
    user: UserPageObject
  },
  getComponent: function () {
    return <NewsFeed />;
  }
});