const types = {
  //UI TYPES
  UI_OPEN_MODAL: "[ui] Open Modal",
  UI_CLOSE_MODAL: "[ui] Close Modal",

  //EVENT TYPES
  EVENT_START_ADD: "[event] Start Add New",
  EVENT_SET_ACTIVE: "[event] Set Active",
  EVENT_ADD_NEW: "[event] Add New",
  EVENT_CLEAN_ACTIVE: "[event] Clean Active",
  EVENT_CLEAN_ALL: "[event] Clean All",
  EVENT_UPDATE: "[event] Update",
  EVENT_DELETE: "[event] Delete",
  EVENT_LOADED: "[event] Loaded",

  //AUTHENTICATION TYPES
  AUTH_CHECKING: "[auth] Checking login state",
  AUTH_CHECKING_FINISH: "[auth] Finish checking login state",
  AUTH_START_LOGIN: "[auth] Start login",
  AUTH_LOGIN: "[auth] Login",
  AUTH_START_REGISTER: "[auth] Start register",
  AUTH_START_TOKEN_RENEW: "[auth] Start token renew",
  AUTH_LOGOUT: "[auth] Logout",
};

export { types };
