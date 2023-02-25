import React from "react";
import $ from "jquery";
import axios from "axios";
import Sidebar from "./Sidebar";

export default class Dashboard extends React.Component {
  Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/";
  };

  render() {
    return (
      <div class="p-4 sm:ml-64">
        <Sidebar />
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"></div>
      </div>
    );
  }
}
