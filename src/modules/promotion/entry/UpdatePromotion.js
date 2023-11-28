import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { promotionService } from '../promotionService';

const UpdatePromotion = () => {

    const params = useParams();

    const dispatch = useDispatch();
    const { promotion } = useSelector((state) => state.promotion);

    console.log(promotion);

    const [loading, setLoading] = useState(false);

    const loadingData = useCallback(async() => {
        setLoading(true);
        await promotionService.show(dispatch,params.id)
        setLoading(false);
    }, [dispatch,params])

    useEffect(() => {
        loadingData()
    }, [loadingData])


  return (
    <div>UpdatePromotion</div>
  )
}

export default UpdatePromotion