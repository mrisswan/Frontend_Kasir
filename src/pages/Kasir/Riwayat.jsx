import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import $ from "jquery";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      detail_transaksi: [],
      transaksiBelumBayar: [],
      transaksiLunas: [],
      menu: [],
      meja: [],
      token: "",
      id_transaksi: 0,
      status: "",
    };
    let user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem("token") && user.role == "kasir") {
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/";
    }
  }
  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };
  getMeja = () => {
    let url = "http://localhost:4040/cafe/meja/";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ meja: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  getMenu = () => {
    let url = "http://localhost:4040/cafe/menu/";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ menu: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  getTransaksiBelumBayar = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let url =
      "http://localhost:4040/cafe/transaksi/riwayat/belum_bayar/" +
      user.id_user;
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ transaksiBelumBayar: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  getTransaksiLunas = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let url =
      "http://localhost:4040/cafe/transaksi/riwayat/lunas/" + user.id_user;
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ transaksiLunas: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  getDetail = (selectedItem) => {
    $("#modal_detail").show();
    let url =
      "http://localhost:4040/cafe/transaksi/detail/" +
      selectedItem.id_transaksi;
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ detail_transaksi: response.data.data });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            window.location = "/";
          }
        } else {
          console.log(error);
        }
      });
  };

  Edit = (selectedItem) => {
    let sendData = {
      id_transaksi: selectedItem.id_transaksi,
      status: "lunas",
    };
    let data = {
      id_meja: selectedItem.id_meja,
      status_meja: "tersedia",
    };
    axios.put(
      "http://localhost:4040/cafe/transaksi/",
      sendData,
      this.headerConfig()
    );
    axios
      .put("http://localhost:4040/cafe/meja/", data, this.headerConfig())
      .then((response) => {
        window.alert(response.data.message);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  componentDidMount() {
    this.getMeja();
    this.getMenu();
    this.getTransaksiBelumBayar();
    this.getTransaksiLunas();
  }

  convertTime = (time) => {
    let date = new Date(time);
    return `${date.getDate()}/${
      Number(date.getMonth()) + 1
    }/${date.getFullYear()}`;
  };
  close = () => {
    $("#modal_detail").hide();
  };

  render() {
    return (
      <div class="p-4 sm:ml-64">
        <Sidebar />
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
            <div className="flex justify-between items-center">
              <h2 className="dark:text-black text-xl font-sans ml-3">
                Riwayat Pemesanan
              </h2>
            </div>
            <br />
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Belum Bayar
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Nama Pelanggan
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nomor Meja
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Tanggal Pemesanan
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Jenis Pesanan
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.transaksiBelumBayar.map((item) => (
                  <tr
                    class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={item.id_transaksi}
                  >
                    <td class="px-6 py-4">{item.nama_pelanggan}</td>
                    <td class="px-6 py-4">{item.meja.nomor_meja}</td>
                    <td class="px-6 py-4">
                      {this.convertTime(item.tgl_transaksi)}
                    </td>
                    <td class="px-6 py-4">{item.jenis_pesanan}</td>
                    <td class="px-6 py-4">{item.status}</td>
                    <td class="px-6 py-4 text-center flex justify-evenly">
                      <button
                        className="hover:bg-green-500 float-right mr-3 bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => this.Edit(item)}
                      >
                        Sudah Bayar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
            {/* <h2 className="dark:text-black text-lg font-serif mt-6 ml-3">
              Lunas
            </h2> */}
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Lunas
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Nama Pelanggan
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nomor Meja
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Tanggal Pemesanan
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Jenis Pesanan
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Status
                  </th>
                  {/* <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.transaksiLunas.map((item) => (
                  <tr
                    class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={() => this.getDetail(item)}
                    key={item.id_transaksi}
                  >
                    <td class="px-6 py-4">{item.nama_pelanggan}</td>
                    <td class="px-6 py-4">{item.meja.nomor_meja}</td>
                    <td class="px-6 py-4">
                      {this.convertTime(item.tgl_transaksi)}
                    </td>
                    <td class="px-6 py-4">{item.jenis_pesanan}</td>
                    <td class="px-6 py-4">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        <div
          id="modal_detail"
          tabindex="-1"
          aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="flex md:h-auto w-auto justify-center ">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => this.close()}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Tutup modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Detail Pemesanan
                </h3>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Nama Menu
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.detail_transaksi.map((item) => (
                      <tr
                        class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={item.id_detail_transaksi}
                      >
                        <td class="px-6 py-4">{item.menu.nama_menu}</td>
                        <td class="px-6 py-4">{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
