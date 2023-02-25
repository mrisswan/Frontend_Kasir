import React from "react";
import $ from "jquery";
import axios from "axios";
import Sidebar from "./Sidebar";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      action: "",
      token: "",
      id_user: 0,
      nama_user: "",
      role: "",
      username: "",
      password: "",
      fillpassword: true,
    };
    if (localStorage.getItem("token")) {
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
  getUser = () => {
    $("#dropdown").hide();
    let url = "http://localhost:4040/cafe/user";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ user: response.data.data });
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

  getUserStatus = (status) => {
    $("#dropdown").hide();
    let url = "http://localhost:4040/cafe/user/jabatan/" + status;
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ user: response.data.data });
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

  Add = () => {
    $("#modal_user").show();
    this.setState({
      id_user: 0,
      nama_user: "",
      role: "",
      username: "",
      password: "",
      fillpassword: true,
      action: "insert",
    });
  };
  Edit = (selectedItem) => {
    $("#modal_user").show();
    this.setState({
      action: "update",
      id_user: selectedItem.id_user,
      nama_user: selectedItem.nama_user,
      role: selectedItem.role,
      username: selectedItem.username,
    });
  };
  saveUser = (event) => {
    event.preventDefault();
    $("#modal_user").show();
    let sendData = {
      id_user: this.state.id_user,
      nama_user: this.state.nama_user,
      role: this.state.role,
      username: this.state.username,
      password: this.state.password,
    };
    let url = "http://localhost:4040/cafe/user";
    if (this.state.action === "insert") {
      axios.post(url, sendData, this.headerConfig()).then((response) => {
        window.alert(response.data.message);
        this.getUser();
      });
    } else if (this.state.action === "update") {
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getUser();
        })
        .catch((error) => console.log(error));
    }
    $("#modal_user").hide();
  };
  dropUser = (selectedItem) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let url = "http://localhost:4040/cafe/user/" + selectedItem.id_user;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getUser();
        })
        .catch((error) => console.log(error));
    }
  };
  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.getUser();
  }
  close = () => {
    $("#modal_user").hide();
  };

  render() {
    return (
      <div class="p-4 sm:ml-64">
        <Sidebar />
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Daftar User
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Nama
                </th>
                <th scope="col" class="px-6 py-3">
                  Username
                </th>
                <th scope="col" class="px-6 py-3">
                  Jabatan
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.user.map((item) => (
                <tr
                  class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={item.id_user}
                >
                  <td class="px-6 py-4">{item.nama_user}</td>
                  <td class="px-6 py-4">{item.username}</td>
                  <td class="px-6 py-4">{item.role}</td>
                  <td class="px-6 py-4 text-center flex justify-evenly">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => this.Edit(item)}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => this.dropUser(item)}
                    >
                      Hapus
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Modal */}
          <div
            id="modal_user"
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
                    User
                  </h3>
                  <form
                    class="space-y-6"
                    onSubmit={(event) => this.saveUser(event)}
                  >
                    <div>
                      <label
                        for="nama_user"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        name="nama_user"
                        id="nama_user"
                        value={this.state.nama_user}
                        onChange={this.bind}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Masukkan nama anda"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="role"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Jabatan
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Role"
                        name="role"
                        value={this.state.role}
                        onChange={this.bind}
                        required
                      >
                        <option value="">Pilih Jabatan</option>
                        <option value="manajer">Manajer</option>
                        <option value="admin">Admin</option>
                        <option value="kasir">Kasir</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.bind}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Masukkan username anda"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={this.state.password}
                        placeholder="Masukkan Password"
                        onChange={this.bind}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}