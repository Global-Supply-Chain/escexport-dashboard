import moment from 'moment';

export const datetime = {
    long: (value) => {
        if(value) {
            return moment(value).format('DD-MM-YYYY hh:mm:ss')
        } else {
            return value;
        }
    }
}