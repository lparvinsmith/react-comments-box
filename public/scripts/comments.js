// written in JSX Syntax

// create a new React component
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

// instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
