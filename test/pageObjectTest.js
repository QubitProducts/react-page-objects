var sinon = require("sinon");
var expect = require("chai").expect;
var NewsFeed = require("./fixtures/newsFeedPageObject");
var LoginPage = require("./fixtures/loginPagePageObject");
var AuthService = require("./fixtures/services/authService");
var NewsFeedService = require("./fixtures/services/newsFeedService");

describe("PageObject", function () {
  var page;

  describe("when you have simple elements", function () {
    var authenticate;
    var email = "foo@bar.com", password = "password";

    beforeEach(function () {
      authenticate = sinon.spy(AuthService, "authenticate");
      page = new LoginPage();
      page.loginAs(email, password);
    });

    afterEach(function () {
      authenticate.restore();
    });

    it("should simulate setting text", function () {
      expect(page.state.email).to.equal(email);
      expect(page.state.password).to.equal(password);
    });

    it("should simulate clicks", function () {
      expect(authenticate).to.have.been.calledWith(email, password);
    });
  });

  describe("when you have child elements", function () {
    var expectedNewsFeedItems;

    beforeEach(function () {
      page = new NewsFeed();
      expectedNewsFeedItems = NewsFeedService.getNewsFeedItems();
    });

    it("should have newsfeed items", function () {
      expect(page.items.length).to.equal(expectedNewsFeedItems.length);
    });

    it("should child page objects", function () {
      page.items.forEach(function (item, i) {
        var expectedItem = expectedNewsFeedItems[i];
        expect(item.body.val()).to.equal(expectedItem.body);
        expect(item.title.val()).to.equal(expectedItem.title);
        expect(item.user.name.val()).to.equal(expectedItem.user.name);
      });
    });
  });
});