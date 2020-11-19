import Swal from "sweetalert2";
import { fetchConToken } from "../components/helpers/fetch";
import { prepareEvents } from "../components/helpers/prepareEvents";
import { types } from "../types/types";

const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.EVENT_ADD_NEW,
  payload: event,
});
const eventSetActive = (event) => ({
  type: types.EVENT_SET_ACTIVE,
  payload: event,
});

const eventClearActiveEvent = () => ({
  type: types.EVENT_CLEAN_ACTIVE,
});

const eventCleanAll = () => ({
  type: types.EVENT_CLEAN_ALL,
});

const eventUpdate = (event) => ({
  type: types.EVENT_UPDATE,
  payload: event,
});

const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventUpdate(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchConToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        dispatch(eventDelete());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDelete = () => ({
  type: types.EVENT_DELETE,
});

const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();
      if (body.ok) {
        const events = prepareEvents(body.events);
        dispatch(eventLoaded(events));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const eventLoaded = (events) => ({
  type: types.EVENT_LOADED,
  payload: events,
});

export {
  eventSetActive,
  eventClearActiveEvent,
  eventCleanAll,
  eventStartDelete,
  eventStartAddNew,
  eventStartLoading,
  eventStartUpdate,
};
