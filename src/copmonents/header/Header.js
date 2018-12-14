import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignOutLinks from "./SignOutLinks";
import { connect } from "react-redux";
import logo from "./logo.png";

class Header extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { user } = this.props;
    const links = user ? <SignedInLinks /> : <SignOutLinks />;

    return (
      <header className="row d-flex bg-dark pl-3 pr-3 justify-content-between align-items-center">
        <div className="col-xs|sm|md|lg|xl-1-12 p-1">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              className="img-fluid d-flex"
              alt="img"
              style={{ height: "120px" }}
            />
          </Link>
        </div>
        <div className="col-xs|sm|md|lg|xl-1-12 text-light">
          <h1>Cars.by</h1>
          <h3>Сайт автообъявлений</h3>
        </div>
        <div className="col-xs|sm|md|lg|xl-1-12 ">
          <Link className="btn btn-danger" to="/new">
            Подать объявление
          </Link>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  null
)(Header);
