var React = require("react");
var expect = require("chai").expect;
var PageObject = require("../index");
var NewsFeed = require("./fixtures/newsFeed");
var NewsFeedItem = require("./fixtures/newsFeedItem");
var NewsFeedService = require("./fixtures/services/newsFeedService");

var NewsFeedItemPageObject = PageObject.extend({
  elements: {
    user: PageObject
  },
  getComponent: function () {
    return <NewsFeedItem />;
  }
});

var NewsFeedPageObject = PageObject.extend({
  elements: {
    items: [NewsFeedItemPageObject]
  },
  getComponent: function () {
    return <NewsFeed />;
  }
});

describe("Child page objects", function () {

  describe("when the custom element is an array containing a page object", function () {
    var page, expectedNewsFeedItems;

    beforeEach(function () {
      page = new NewsFeedPageObject();
      expectedNewsFeedItems = NewsFeedService.getNewsFeedItems();
    });


    it("convert the children of the ref into page objects with the given page object type", function () {
      expect(page.items.length).to.equal(expectedNewsFeedItems.length);
    });

    it("should child page objects", function () {
      page.items.forEach(function (item, i) {
        var expectedItem = expectedNewsFeedItems[i];
        expect(item.body.value).to.equal(expectedItem.body);
        expect(item.title.value).to.equal(expectedItem.title);
        expect(item.user.name.value).to.equal(expectedItem.user.name);
      });
    });
  });
});