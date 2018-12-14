import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost, removePost, setPostsFilter } from "../../actions/postActions";

class ViewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const postId = match.params.id;
    this.props.getPost(postId);
  }

  hendelRemovePost = (postId) => {
    const result = window.confirm("Do you really want to delete the post?");

    if (result === false) return;

    this.props.removePost(postId);
    this.setState({
      isDeleted: true
    });
  };

  render() {
    if (!this.props.post) return null;

    const {
      id,
      title,
      brand,
      model,
      engene,
      year,
      city,
      price,
      description,
      imgURL,
      createdAt
    } = this.props.post;

    // const strCreatedAt = `Posted on ${d.toLocaleString()}, ${d.getFullYear()}`;
    const { user } = this.props;
    const adminButtons = user ? (
      <div>
        <Link to={"/edit/" + id} className="btn btn-primary mr-3">
          Edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            this.hendelRemovePost(id);
          }}
        >
          Remove
        </button>
      </div>
    ) : (
      <div>No login</div>
    );
    return (
      <main className="row">
        <div className="col-md-12 mt-1 bg-light">
          <div className="row">
            <div className="col-4">
              <h4>{title}</h4>
            </div>
            <div className="col-3">
              <h4>{price}$</h4>
            </div>
            <div className="col-2">
              <h4>{year} г.</h4>
            </div>
            <div className="col-3">
              <h4>{city}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-12 mb-1">
          <div className="row">
            <div className="col-md-6 mt-1 p-0">
              <img src={imgURL} className="col-md-12 p-0 pr-1" alt="auto" />
            </div>
            <div className="col-md-6 mt-1 bg-light p-3">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
    filter: state.filter
  };
}

export default connect(
  mapStateToProps,
  { getPost, removePost, setPostsFilter }
)(ViewPost);

/**
 *       <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="mt-4">{title}</h1>
            {adminButtons}
            <hr />
            <p>{strCreatedAt}</p>
            <hr />
            <img className="img-fluid rounded" src={imgURL} alt="" />
            <hr />
            {renderHTML(body)}
            <hr />
            <Disqus.CommentCount
              shortname={disqusShortname}
              config={disqusConfig}
            >
              Comments
            </Disqus.CommentCount>
            <div className="article">
              <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
              />
            </div>
          </div>
          <SideBar />
        </div>
      </div>
  
  
 */
