import React, { Component } from "react";
import { connect } from "react-redux";

export class SortSection extends Component {
  render() {
    return (
      <div class="row pl-3 pt-0 bg-light d-flex align-items-center border-top">
        <p class="m-0">Сортировать по:</p>
        <a name="" id="" class="btn btn-link" href="#" role="button">
          Цене
        </a>
        <a name="" id="" class="btn btn-link" href="#" role="button">
          Году выпуска
        </a>
        <a name="" id="" class="btn btn-link" href="#" role="button">
          Дате
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortSection);
