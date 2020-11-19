import { types } from "../types/types";

// {
//   id: new Date().getTime(),
//   title: "Cumpleaños",
//   start: moment().toDate(),
//   end: moment().add(2, "hours").toDate(),
//   bgcolor: "#fafafa",
//   notes: "Comprar el pastel",
//   user: {
//     uid: "123",
//     name: "Daniel",
//   },
// },
const initialState = {
  events: [],
  activeEvent: null,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EVENT_ADD_NEW:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.EVENT_SET_ACTIVE:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.EVENT_CLEAN_ACTIVE:
      return {
        ...state,
        activeEvent: null,
      };
    case types.EVENT_CLEAN_ALL:
      return {
        ...initialState,
      };
    case types.EVENT_UPDATE:
      return {
        ...state,
        events: state.events.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        ),
      };
    case types.EVENT_DELETE:
      return {
        ...state,
        events: state.events.filter((ev) => ev.id !== state.activeEvent.id),
        activeEvent: null,
      };
    case types.EVENT_LOADED:
      return {
        ...state,
        events: [...action.payload],
      };

    default:
      return state;
  }
};

export { calendarReducer };
