import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch";
import { types } from "../types/types";
import { eventCleanAll } from "./events";

const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/new",
      { name, email, password },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const startCheking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.AUTH_CHECKING_FINISH });

const login = (user) => ({
  type: types.AUTH_LOGIN,
  payload: user,
});

const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(eventCleanAll());
  };
};
const logout = () => ({ type: types.AUTH_LOGOUT });

export { startLogin, startRegister, startCheking, startLogout, logout };
