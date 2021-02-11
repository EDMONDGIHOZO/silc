import axios from "axios";

// const API_URL = "http://localhost:3333/user/";
const API_URL = "http://silc.nceingenieurs.com/user/";
class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        const user = response.data.data;
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userInfo");
  }

  register(user) {
    return axios.post(API_URL + "register", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
