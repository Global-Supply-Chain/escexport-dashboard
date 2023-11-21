import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { categoryService } from '../categoryService';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import CategoryUpdate from '../entry/CategoryUpdate';

const CategoryDetail = () => {

    const params = useParams();
    console.log(params);

    const [dataSource, setDataSource] = useState();
    const dispatch = useDispatch();

    const loadingData = useCallback( async () => {

        const result = await categoryService.show(dispatch,params.id);
        if(result.status === 200){
            setDataSource(result.data)
        }


    }, [dispatch, params.id])

    useEffect(() => {
        loadingData();
    }, [loadingData])

    console.log(dataSource);

  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <CategoryUpdate dataSource={dataSource} />
        </div>

    </div>
  )
}

export default CategoryDetail