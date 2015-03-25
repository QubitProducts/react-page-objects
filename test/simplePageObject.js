var sinon = require("sinon");
var React = require("react");
var expect = require("chai").expect;
var PageObject = require("../index");
var LoginPage = require("./fixtures/loginPage");
var AuthService = require("./fixtures/services/authService");

var LoginPageObject = PageObject.extend({
  getComponent: function () {
    return <LoginPage />;
  },
  loginAs: function (email, password) {
    this.email.value = email;
    this.password.value = password;
    this.login.click();
  }
});

describe("PageObject", function () {
  var page, authenticate, className, domNode, id;
  var email = "foo@bar.com", password = "password";

  beforeEach(function () {
    authenticate = sinon.spy(AuthService, "authenticate");
    page = new LoginPageObject();
    page.loginAs(email, password);
    className = page.getClassName();
    domNode = page.getDOMNode();
    id = page.getAttribute("id");
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

  it("should proxy getAttribute", function () {
    expect(id).to.equal(page.getDOMNode().getAttribute("id"));
  });

  it("should proxy getDOMNode", function () {
    expect(domNode).to.equal(page.getDOMNode());
  });

  it("should proxy getClassName", function () {
    expect(className).to.equal(page.getDOMNode().getAttribute("class"));
  });
});