export const formBuilder = (payload, fields) => {

    const formData = new FormData();

    Object.keys(fields).map((value) => {
        if(payload[value] !== undefined || payload[value] !== null){
            Object.keys(payload).filter(filterValue => {
                if(filterValue === value){
                    formData.append(value,payload[value]);
                    return value;
                }
            })
        }
    })

    formData.append('method', 'PUT');

    return formData;

}