import { Chip } from 'primereact/chip';
import { statusOptions } from '../constants/config';
import { useEffect, useState } from 'react';

export const Status = ({ status }) => {

    const [dataSource, setDataSource] = useState(null);

    useEffect(() => {
        if(status) {
            const getStatus = statusOptions.filter(value => value.status === status)[0];
            setDataSource(getStatus);
        }
    },[status]);

    return(
        <>
            { dataSource && (
                <Chip 
                    className={dataSource.color}
                    label={dataSource.status}
                />
            )}  
        </>
    )
}