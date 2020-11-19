const { types } = require("../types/types");

const initialState = {
  modalOpen: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UI_OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case types.UI_CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};

export { uiReducer };
