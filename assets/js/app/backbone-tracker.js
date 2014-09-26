/*jslint browser: true*/

require([
  'jquery',
  'react'
], function ($, React) {
  'use strict';

  /** @jsx React.DOM */

  var CommentBox = React.createClass({
    getInitialState: function () {
      return { data: [] };
    },
    render: function () {
      return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm />
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function () {
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

  var CommentForm = React.createClass({
    render: function () {
      return (
        <div className="commentForm">
          Hello, I am a CommentForm
        </div>
      );
    }
  });

  var Comment = React.createClass({
    render: function () {
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

});



