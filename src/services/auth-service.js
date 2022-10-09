import { SERVER_BASE } from "../consts/server-base";
import { CREDS } from "../consts/default-credentials";

const login = (login, password) => {
  if (checkIfDefaultCreds(login, password)) {
    return Promise.resolve({
      data: {
        token: "1234fsdrdggvsfsd",
        login,
      },
    });
    // return fetch(`${SERVER_BASE}login', {
    //   method: 'post',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     "login": login,
    //     "password": password
    //  }),
    // });
  }
  return Promise.reject(new Error("wrong password or login"));
};

const logout = () => {
  return Promise.resolve({ message: "session closed" });
};

const authService = {
  login,
  logout,
};

export default authService;

const checkIfDefaultCreds = (login, password) => {
  if (login === CREDS.login && password === CREDS.password) {
    return true;
  }
  return false;
};
