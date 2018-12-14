import React from "react";
import { Link } from "react-router-dom";
import { setPostsFilter } from "../../actions/postActions";
import { connect } from "react-redux";
import renderHTML from "react-render-html";

const Post = (props) => {
  console.log(props);
  const d = new Date(parseInt(props.post.createdAt, 10));
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
  } = props.post;
  return (
    <Link to={`/posts/${id}`} className="text-dark">
      <div className="row list-posts__item border-top pt-3 pb-3 mt-1 mb-1">
        <div className="col-md-3">
          <img className="col-md-12" src={imgURL} alt="img" />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <h4>{title}</h4>
              <p>{engene}</p>
            </div>
            <div className="col-md-3">
              <h4>{price}$</h4>
            </div>
            <div className="col-md-2">
              <h4>{year} г.</h4>
            </div>
            <div className="col-md-3">
              <h4>{city}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="text-justify">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default connect(
  null,
  { setPostsFilter }
)(Post);

/**
 *     <div className="card mb-4">
      <img
        className="card-img-top"
        src={props.post.imgURL}
        alt="img for the post"
      />
      <div className="card-body">
        <h2 className="card-title">{props.post.title}</h2>
        <p>{props.post.description}</p>
        <Link to={`/posts/${props.post.serverKey}`} className="btn btn-primary">
          Read More →
        </Link>
      </div>
      <div className="card-footer text-muted">{strCreatedAt}</div>
    </div>
 */
