

var React = require("react");
var User = require("./user");

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

module.exports = NewsFeedItem;