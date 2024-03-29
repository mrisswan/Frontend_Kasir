import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";
import axios from "axios";
// import $ from "jquery";

export default class Manajer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      },
    };
    let user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("token") && user.role == "manajer") {
      this.state.token = localStorage.getItem("token");
    } else {
      window.alert("Anda tidak terdaftar sebagai manajer");
      window.location = "/";
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  componentDidMount() {
    axios
      .get("http://localhost:4040/cafe/transaksi/qtybymenu")
      .then((response) => {
        const categories = response.data.map((data) => data.nama_menu);
        const values = response.data.map((data) => data.total_qty);

        this.setState({
          data: [
            {
              name: "Value",
              data: values,
            },
          ],
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: categories,
              labels: {
                style: {
                  fontFamily: "Arial, sans-serif",
                  fontSize: "15px",
                },
              },
            },
            fill: {
              colors: "#1F2937",
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="p-4 sm:ml-64">
        <Sidebar />
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Chart
            options={this.state.options}
            series={this.state.data}
            type="bar"
            height={350}
          />
        </div>
      </div>
    );
  }
}
