import moment from 'moment';

export const datetime = {
    long: () => {
        return moment().format('DD-MM-YYYY hh:mm:ss')
    }
}