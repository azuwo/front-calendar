import { types } from "../types/types";

const uiOpenModal = () => ({
  type: types.UI_OPEN_MODAL,
});
const uiCloseModal = () => ({
  type: types.UI_CLOSE_MODAL,
});

export { uiOpenModal, uiCloseModal };
