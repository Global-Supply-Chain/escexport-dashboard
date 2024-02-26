export const formBuilder = (payload, fields) => {

    const formData = new FormData();


    let formFileds = Object.keys(fields).filter((value) => {
        if (payload[value] != undefined || payload[value] != null) {
            return value;
        }
    });

    formFileds.map((value) => {
        formData.append(value, payload[value]);
        return value;
    })
    
    formData.append('method', 'PUT');

    return formData;

}