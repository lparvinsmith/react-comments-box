// written in JSX Syntax

// create a new React component CommentBox
// The JSX compiler will automatically rewrite HTML tags to React.createElement(tagName)
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

// create component CommentList
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});

// create component CommentForm
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

// instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
