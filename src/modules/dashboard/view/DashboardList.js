import React, { useEffect, useState } from 'react'
import { dashboardService } from '../dashboardService';
import { useDispatch, useSelector } from 'react-redux';

export const DashboardList = () => {

    const [loading,setLoading] = useState(false);

    const dashboard = useSelector((state) => state.dashboard)
    const dispatch = useDispatch()

    const loadingOrderCountStatus = async () => {
        setLoading(true);
        await dashboardService.orderIndex(dispatch);
        setLoading(false)
    }

    useEffect(() => {
        loadingOrderCountStatus()
    }, [])

    console.log(dashboard);

  return (
    <div className=' p-5'>

        <div className=' count-card'>

        </div>

    </div>
  )
}
