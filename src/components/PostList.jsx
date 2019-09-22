import React, { Component, Fragment } from 'react';
import '../stylesheets/post_list.css';
import { addPost, getPosts } from '../utils';
import Avatar from './Avatar';
import { loggedUser } from '../utils';

class PostList extends Component {
  state = {
    posts: [],
    newPostText: ''
  }

  // Get the list of posts for the user in props
  componentDidMount() {
    const { user } = this.props;
    this.setState({ posts: getPosts(user) });
  }

  addPost = (event) => {
    event.preventDefault();
    const { user } = this.props;
    const { newPostText } = this.state;

    addPost(loggedUser(), user, newPostText);

    this.setState({ newPostText: '', posts: getPosts(user) });
  }

  handlePostChange = (event) => {
    const { value } = event.target;

    this.setState({ newPostText: value });
  }

  render() {
    const { newPostText, posts } = this.state;

    return (
      <Fragment>
        <h2 className="section-title">Posts</h2>

        <div className="post-list">
          {posts.map(post => {
            return (
              <div key={post.id} className="post">
                <div className="post-data">
                  <div className="user-info">
                    <Avatar user={post.user} /> {post.user.firstName} {post.user.lastName}
                  </div>
                  <small className="date">
                    {new Date(post.created).toLocaleDateString()} at {new Date(post.created).toLocaleTimeString()}
                  </small>
                </div>
                {post.text}
              </div>
            );
          })}
        </div>

        <h3 className="add-post-title">Add a new post</h3>
        <form className="add-post-form">
          <textarea rows="4" className="form-control" onChange={this.handlePostChange} value={newPostText}></textarea>
          <input type="submit" className="btn btn-danger" value="Add post" onClick={this.addPost} />
        </form>
      </Fragment>
    );
  }
}

export default PostList;
