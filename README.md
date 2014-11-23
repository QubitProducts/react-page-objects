# React Page Objects

[React](http://facebook.github.io/react/) [page objects](https://code.google.com/p/selenium/wiki/PageObjects) make it easy to test [react](http://facebook.github.io/react/) components.

They wrap your component, injecting them into them the DOM and making any [refs](http://facebook.github.io/react/docs/more-about-refs.html) available with a simple object orientated API.

##Tutorial

Say you have a React component

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
```

If you pass an instance of a component into a page object, any [refs](http://facebook.github.io/react/docs/more-about-refs.html) will be available with a simple API

```js
var page = new PageObject(<LoginPage />);

page.email.value = "foo@bar.com";
page.password.value = "password";
page.login.click();
```

You can also create a custom page object type using ``PageObject#extend``

```js
var LoginPageObject = PageObject.extend({
  getComponent: function () {
    return <LoginPage />;
  },
  loginAs: function (email, password) {
    this.email.value = "foo@bar.com";
    this.password.value = "password";
    this.login.click();
  }
});

var page = new LoginPageObject();

page.loginAs("foo@bar.com", "password");
```

The ``elements`` hash map allows you to specify the page object type of any [refs](http://facebook.github.io/react/docs/more-about-refs.html) allowing to build more complex pages. They key in the ``elements`` has is the name of the [ref](http://facebook.github.io/react/docs/more-about-refs.html) and the value is the page object type.

```js
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

var item = new NewsFeedItem({
  props: {
    item: {
      user: { name: "Foo Bar" },
      title: "Foo",
      body: "Lorum Ipsum"
    }
  }
});

expect(item.title).to.equal("Foo");
expect(item.user.name).to.equal("Foo Bar");
```

If you have an array of page objects, you should add a ref to the parent element and then in elements hash the value should be an array containing the page object type.

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

var newsFeed = new NewsFeedPageObject({
  props: {
    user: "foo"
  }
});

expect(newsFeed.items).to.not.be.empty;
expect(newsFeed.items.get(1).user.name).to.equal("foo");
```