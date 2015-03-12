

var React = require("react");
var NewsFeedItem = require("./newsFeedItem");
var NewsFeedService = require("./services/newsFeedService");

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
      items: NewsFeedService.getNewsFeedItems()
    };
  }
});

module.exports = NewsFeed;