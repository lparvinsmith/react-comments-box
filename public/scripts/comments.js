// written in JSX Syntax

// create a new React component CommentBox
// The JSX compiler will automatically rewrite HTML tags to React.createElement(tagName)
var CommentBox = React.createClass({
  // executes once during the lifecycle of the component, sets up the initial state of the component
  getInitialState: function() {
    return {data: []};
  },
  // uses jQuery to make an asynchronous request to the server to fetch the data
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        // allows for dynamic updates
        // replace the old array of comments with the new one from the server and the UI automatically updates itself
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // submit comment to the server and refresh the list
  handleCommentSubmit: function(comment) {
    // optimizes speed by adding comment to list before request completes
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // componentDidMount is a method called automatically by React when a component is rendered
  componentDidMount: function() {
    this.loadCommentsFromServer();
    //
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    // this.state is mutable, this.props is immutable
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

// create component CommentList
var CommentList = React.createClass({
  render: function() {
    // transform each element of data array into node with properties author and text
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

// create component CommentForm
// uses the ref attribute to assign a name to a child component and this.refs to reference the DOM node
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }
    // passes data from the child component CommentForm back up to its parent CommentBox
    this.props.onCommentSubmit({author: author, text: text});
    // clears form after submit
    this.refs.author.value = '';
    this.refs.text.value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

// creates Comment component, depends on data from parent CommentList
// properties of parent component available through this.props
var Comment = React.createClass({
  rawMarkup: function() {
    // pass 'sanitize: true' to tell marked to escape any HTML markup in the source
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
    // Sanitizing user input for display is notoriously error-prone, and failure to properly sanitize is one of the leading causes of web vulnerabilities
    // the prop value (an object instead of a string) can be used to indicate sanitized data
  }
});

// instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
