import moment from "moment";
const prepareEvents = (events = []) => {
  return events.map((ev) => ({
    ...ev,
    end: moment(ev.end).toDate(),
    start: moment(ev.start).toDate(),
  }));
};

export { prepareEvents };
