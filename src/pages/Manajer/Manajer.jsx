import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";
import axios from "axios";

export default class Manajer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       category: [],
//       data: [],
//     };
//   }

//   componentDidMount() {
//     const qty = [];
//     const menu = [];

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(
//               "http://localhost:4040/cafe/transaksi/detail"
//             );
//             this.setState({ data: response.data });
//           } catch (error) {
//             console.error(error);
//           }
//         };    
//           this.setState({
//             category: menu,
//             data: qty,
//           });
//           console.log("qty", qty, menu);
//       }
//     };

//     fetchData();
// //  }

//   render() {
//     const { category,data } = this.state;

//     if (!data) {
//       return <div>Loading...</div>;
//     }

//     // Group data by ID and sum the values
//     const chartData = category.reduce((acc, cur) => {
//       const id = cur.id;
//       const value = cur.value;
//       if (!acc[id]) {
//         acc[id] = 0;
//       }
//       acc[id] += value;
//       return acc;
//     }, {});

//     const chartOptions = {
//       chart: {
//         id: "example-chart",
//       },
//       xaxis: {
//         categories: Object.keys(chartData),
//       },
//     };

//     const chartSeries = [
//       {
//         name: "Example Series",
//         data: Object.values(chartData),
//       },
//     ];

//     return (
//       <Chart
//         options={chartOptions}
//         series={chartSeries}
//         type="line"
//         width={500}
//         height={300}
//       />
//     );
//   }
// }

/////////////////////////////////////////////////////////////////////////

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//     };
//   }

//   componentDidMount() {
//     const fetchData = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:4040/cafe/transaksi/detail"
//     );
//     this.setState({ data: response.data });
//   } catch (error) {
//     console.error(error);
//   }
// };

//     fetchData();
//   }

//   render() {
//     const { data } = this.state;

//     if (!data) {
//       return <div>Loading...</div>;
//     }

//     // Group data by ID and sum the values
//     const chartData = data.reduce((acc, cur) => {
//       const id = cur.id;
//       const value = cur.value;
//       if (!acc[id]) {
//         acc[id] = 0;
//       }
//       acc[id] += value;
//       return acc;
//     }, {});

//     const chartOptions = {
//       chart: {
//         id: "example-chart",
//       },
//       xaxis: {
//         categories: Object.keys(chartData),
//       },
//     };

//     const chartSeries = [
//       {
//         name: "Example Series",
//         data: Object.values(chartData),
//       },
//     ];

//     return (
//       <Chart
//         options={chartOptions}
//         series={chartSeries}
//         type="line"
//         width={500}
//         height={300}
//       />
//     );
//   }
// }

  constructor(props) {
    super(props);
    this.state = {
      category: [],
      data: [],
    };
  }

  componentDidMount() {
    const qty = [];
    const menu = [];

    axios
      .get("http://localhost:4040/cafe/transaksi/detail")
      .then((response) => {
        console.log('response', response);
        response.data.data.map((item) => {
          console.log('item', item);
          qty.push(item.qty);
          menu.push(item.id_menu);
        });
        this.setState({
          category: menu,
          data: qty,
        });
        console.log('qty', qty, menu);
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    const { category, data } = this.state;

    return (
      <div class="p-4 sm:ml-64">
        <Sidebar />
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Chart
            options={{
              chart: {
                id: "apexchart-example",
              },
              xaxis: {
                // categories: Object.keys(chartData),
                categories: category,
              },
            }}
            series={[
              {
                name: "Penjualan",
                // data: Object.values(chartData),
                data: data,
              },
            ]}
            type="bar"
            width={800}
            height={500}
          />
        </div>
      </div>
    );
  }
}
