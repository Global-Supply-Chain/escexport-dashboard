import moment from "moment";

/** To Delete */
export const datetime = {
  long: (value) => {
    if (value) {
      return moment(value).format("DD MMM YYYY - hh:mm:ss");
    } else {
      return value;
    }
  },
};


export const dateFormat = (value, type) => {
  if(value && type === 'DEFAULT') {
    return moment(value).format("DD/MM/YYYY");
  }

  if(value && type === 'DATETIME_LONG') {
    return moment(value).format("DD MM YYYY - hh:mm:ss");
  }
}

export const dateAge = (value) => {
  const currentYear = moment().get('year');
  const acturalYear = value ? moment(value).get('year') : 0;
  const diff = currentYear - acturalYear;

  if(diff<=0) {
    return {
      age: moment(value).dayOfYear(),
      unit: 'Days'
    };
  }

  return {
    age: diff,
    unit: 'Years'
  }
}