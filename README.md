# React Page Object

Implementation of the [Page Objects](https://code.google.com/p/selenium/wiki/PageObjects) pattern for [React](http://facebook.github.io/react/) components.

## Examples

### Simple

```js
var LoginPage = React.createClass({
  render: function () {
    return (
      <div className="login-page">
        <input ref="email" type="text" value={this.state.email} onChange={this.onEmailChanged} />
        <input ref="password" type="password" value={this.state.password} onChange={this.onPasswordChanged} />
        <input ref="login" value="Login" type="submit" onClick={this.login} />
      </div>
    );
  },
  login: function () {
    AuthService.authenticate(this.state.email, this.state.password);
  },
  onEmailChanged: function (e) {
    this.setState({ email: e.target.value });
  },
  onPasswordChanged: function () {
    this.setState({ password: this.refs.password.getDOMNode().value });
  },
  getInitialState: function () {
    return {
      email: "",
      password: ""
    };
  }
});

var LoginPageObject = PageObject.extend({
  getComponent: function () {
    return <LoginPage />;
  },
  loginAs: function (email, password) {
    this.email.val(email);
    this.password.val(password);
    this.login.click();
  }
});

var loginPage = new LoginPageObject();

loginPage.loginAs("foo@bar.com", "password");

expect(loginAs.state).to.eql({
  email: "foo@bar.com",
  password: "password"
});
```

## Nested page objects

```js
var NewsFeed = React.createClass({
  render: function () {
    return (
      <div className="news-feed">
        <div className="news-feed-items" ref="items">
          {this.state.items.map(function (item) {
            return <NewsFeedItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    );
  },
  getInitialState: function () {
    return {
      items: NewsFeedService.getNewsFeedItemsFor(this.props.user)
    };
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

var NewsFeedItem = React.createClass({
  render: function () {
    return (
      <div className="news-feed-item">
        <User ref="user" user={this.props.item.user} />
        <h1 ref="title">{this.props.item.title}</h1>
        <div ref="body">{this.props.item.body}</div>
      </div>
    );
  }
});

var NewsFeedItemPageObject = PageObject.extend({
  elements: {
    user: PageObject
  },
  getComponent: function () {
    return <NewsFeed />;
  }
});

var User = React.createClass({
  render: function () {
    return (
      <div className="user">
        <span ref="name">{this.props.user.name}</span>
      </div>
    );
  }
});

var newsFeed = new NewsFeedPageObject({
  props: {
    user: "foo"
  }
});

expect(newsFeed.items).to.not.be.empty;
expect(newsFeed.items.get(1).user.name).to.equal("foo");
```