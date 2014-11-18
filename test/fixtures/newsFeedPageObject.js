/** @jsx React.DOM */

var React = require("react");
var NewsFeed = require("./newsFeed");
var PageObject = require("../../index");
var NewsFeedItemPageObject = require("./newsFeedItemPageObject");

module.exports = PageObject.extend({
  elements: {
    items: [NewsFeedItemPageObject]
  },
  getComponent: function () {
    return <NewsFeed />;
  }
});