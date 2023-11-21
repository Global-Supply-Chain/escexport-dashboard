import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { itemService } from '../itemService';
import { useDispatch } from 'react-redux';

const ItemDetail = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const [dataSource, setDataSource] = useState();

    /**
     * loading data
     * **/
    const loadingData = async () => {
        const response = await itemService.show(dispatch,params.id)
        if(response.status === 200){
            setDataSource(response.data)
        }
    }


  return (
    <div>ItemDetail</div>
  )
}

export default ItemDetail