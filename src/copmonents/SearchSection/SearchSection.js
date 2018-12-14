import React, { Component } from "react";

export class SearchSection extends Component {
  render() {
    return (
      <div className="row p-3 bg-light">
        <p>Поиск объявлений о продаже автомобилей:</p>
        <form>
          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Марка или модель авто"
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="Цена от"
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="number"
                  max="999999"
                  className="form-control"
                  placeholder="Цена до"
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="number"
                  min="1971"
                  max="2018"
                  className="form-control"
                  placeholder="Год от"
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="number"
                  min="1970"
                  max="2019"
                  className="form-control"
                  placeholder="Год до"
                  aria-describedby="helpId"
                />
              </div>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary w-100">
                Поиск
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchSection;
