import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequest } from '../../../helpers/api';
import UserUpdate from '../entry/UserUpdate';
import { paths } from '../../../constants/paths';

const UserDetail = () => {

    const params = useParams();
    const [data, setData] = useState();

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        const response = await getRequest(`${paths.user}/${params.id}`);

        if(response && response.status === 200){
            setData(response.data);
        }


    },[]);

    useEffect(() => {
        loadingData();
    },[loadingData])

    console.log(data);


  return (
    <div className=' grid'>

        <div className=' col-12'>
            <UserUpdate dataSource={data} />
        </div>

    </div>
  )
}

export default UserDetail