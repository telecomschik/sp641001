import React, { Component } from "react";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import { getUser } from "../actions/userActions";

class LoadingComponent extends Component {
  componentWillMount() {
    console.log(this.props);

    const { userLoading } = this.props;
    if (userLoading === true) {
      this.props.getUser();
    }
  }

  render() {
    const { userLoading, user, children } = this.props;

    if (!userLoading || user !== null) {
      return <div>{children}</div>;
    } else {
      return (
        <div id="preloader">
          <div id="loader" />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userLoading: state.userLoading,
    user: state.user
  };
}
/*
const mapDispatchToProps = (dispatch) => {
  return {
    getUser
  };
};*/

export default connect(
  mapStateToProps,
  { getUser }
)(LoadingComponent);
