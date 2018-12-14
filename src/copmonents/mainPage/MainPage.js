import React, { Component } from "react";
import { SearchSection } from "../SearchSection";
import { SortSection } from "../SortSection";
import ListPosts from "./ListPosts";

export class MainPage extends Component {
  render() {
    return (
      <main>
        <SearchSection />
        <SortSection />
        <ListPosts />
      </main>
    );
  }
}

export default MainPage;
