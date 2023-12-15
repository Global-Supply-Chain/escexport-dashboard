import moment from "moment";

export const datetime = {
  long: (value) => {
    if (value) {
      return moment(value).format("DD MMM YYYY - hh:mm:ss");
    } else {
      return value;
    }
  },
};
