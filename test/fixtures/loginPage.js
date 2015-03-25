

var React = require("react");
var AuthService = require("./services/authService");

var LoginPage = React.createClass({
  render: function () {
    return (
      <div className="login-page" id="login-page">

        <input ref="email"
               type="text"
               value={this.state.email}
               onChange={this.onEmailChanged} />

        <input ref="password"
               type="password"
               value={this.state.password}
               onChange={this.onPasswordChanged} />

        <input ref="login"
               value="Login"
               type="submit"
               onClick={this.login} />
      </div>
    );
  },
  login: function () {
    AuthService.authenticate(
      this.state.email,
      this.state.password
    );
  },
  onEmailChanged: function (e) {
    this.setState({
      email: e.target.value
    });
  },
  onPasswordChanged: function () {
    this.setState({
      password: this.refs.password.getDOMNode().value
    });
  },
  getInitialState: function () {
    return {
      email: "",
      password: ""
    };
  }
});

module.exports = LoginPage;