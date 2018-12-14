import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPosts,
  getPostsByName,
  setPostsFilter,
  setPostsFilterInputValue
} from "../../actions/postActions";

class SideBarSearch extends Component {
  hendlerInputSearch = (e) => {
    const { value } = e.target;

    this.props.setPostsFilterInputValue(value);

    if (value === "") {
      this.props.getPosts();
      this.props.setPostsFilter(value);
    }

    console.log(this.props);
  };

  hendlerButtonSearch = () => {
    console.log({ filter: this.props.inputFilterValue });

    if (this.props.inputFilterValue) {
      this.props.getPostsByName(this.props.inputFilterValue);
      this.props.setPostsFilter(this.props.inputFilterValue);
    }
  };

  render() {
    return (
      <div className="card my-4">
        <h5 className="card-header">Search</h5>
        <div className="card-body">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
              value={this.props.inputFilterValue}
              onChange={this.hendlerInputSearch}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.hendlerButtonSearch}
              >
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    inputFilterValue: state.inputFilterValue
  };
}

export default connect(
  mapStateToProps,
  { getPosts, getPostsByName, setPostsFilter, setPostsFilterInputValue }
)(SideBarSearch);
