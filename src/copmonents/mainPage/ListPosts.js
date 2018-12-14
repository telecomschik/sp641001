import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { getPosts, setPostsFilter } from "../../actions/postActions";

export class ListPosts extends Component {
  componentDidMount() {
    if (!this.props.filter) {
      this.props.getPosts();
    }
  }

  renderPosts = () => {
    return this.props.posts.map((post) => {
      return <Post key={post.id} post={post} />;
    });
  };

  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.length ? null : <h3>Сейчас объявлений нет.</h3>}
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    filter: state.filter
  };
}

export default connect(
  mapStateToProps,
  { getPosts, setPostsFilter }
)(ListPosts);
