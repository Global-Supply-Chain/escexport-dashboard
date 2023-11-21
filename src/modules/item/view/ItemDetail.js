import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { itemService } from '../itemService';
import { useDispatch } from 'react-redux';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import ItemUpdate from '../entry/ItemUpdate';

const ItemDetail = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const [dataSource, setDataSource] = useState();

    /**
     * loading data
     * **/
    const loadingData = useCallback(async () => {
        const response = await itemService.show(dispatch,params.id)
        if(response.status === 200){
            setDataSource(response.data)
        }
    }, [dispatch, params.id])

    useEffect(() => {
        loadingData()
    }, [loadingData])

    console.log(dataSource);


  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div>
            <ItemUpdate dataSource={dataSource} />
        </div>

    </div>
  )
}

export default ItemDetail