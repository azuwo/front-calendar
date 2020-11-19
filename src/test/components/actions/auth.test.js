import { StrictMode } from "react";
import configureStore from "redux-mock-store";
import thunk from "../../../actions/node_modules/redux-thunk";
import Swal from "sweetalert2";
import { startCheking, startLogin, startRegister } from "../../../actions/auth";
import * as fetchModule from "../../../components/helpers/fetch";
import { types } from "../../../types/types";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

//jest.setTimeout(10000);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("Test in Auth Actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin works", async () => {
    await store.dispatch(startLogin("nando@gmail.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.AUTH_LOGIN,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    // token = localStorage.setItem.mock.calls[0][1];
    // console.log(localStorage.setItem.mock.calls[0][1]);
  }, 30000);

  test("startLogin fails", async () => {
    await store.dispatch(startLogin("nando@gmail.com", "123456789")); //wrong password
    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "User or Password don't match",
      "error"
    );

    await store.dispatch(startLogin("nando@gmails.com", "123456")); //wrong email
    actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "User or Password don't match",
      "error"
    );
  }, 30000);

  test("startRegister works ", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "ABC123ABC123",
        };
      },
    }));
    await store.dispatch(startRegister("test2@test.com", "123456", "testName"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.AUTH_LOGIN,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking works", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "ABC123ABC123",
        };
      },
    }));

    await store.dispatch(startCheking());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.AUTH_LOGIN,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123");
  });
});
