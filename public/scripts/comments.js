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
        <Comment author="Lara Parvinsmith">This is one comment</Comment>
        <Comment author="Brett Wallace">This is *another* comment</Comment>
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

// creates Comment component, depends on data from parent CommentList
// properties of parent component available through this.props
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
          {this.props.children}
      </div>
    );
  }
});

// instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
