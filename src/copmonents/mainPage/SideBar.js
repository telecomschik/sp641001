import React from "react";
import SideBarSearch from "./SideBarSearch";

const SideBar = (props) => {
  return (
    <aside className="col-md-4">
      <SideBarSearch />

      <div className="card my-4">
        <h5 className="card-header">Side Widget</h5>
        <div className="card-body">Your ad could be here!</div>
      </div>
    </aside>
  );
};

export default SideBar;
