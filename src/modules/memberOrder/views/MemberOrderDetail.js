

import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memberOrderService } from '../memberOrderService';
import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Badge } from 'primereact/badge';

export const MemberOrderDetail = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { memberOrder } = useSelector(state => state.memberOrder);

    const loadingData = useCallback(async () => {

        await memberOrderService.show(dispatch, params.id);

    }, [dispatch,params.id])

    useEffect(() => {
        loadingData();
    }, [loadingData])

    console.log(memberOrder);


  return (
    <div className=' grid'>
        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <Card
                title='Detail'
            >
                <div className=' grid'>
                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Name - </p>
                        <p>{memberOrder?.name}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>User Name - </p>
                        <p>{memberOrder?.user_name}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className='font-bold'>Email - </p>
                        <p>{memberOrder?.email}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Phone - </p>
                        <p>{memberOrder?.phone}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Member ID - </p>
                        <p>{memberOrder?.member_id}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Card Number - </p>
                        <p>{memberOrder?.card_number}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Card Type - </p>
                        <p>{memberOrder?.card_type}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Orde Number - </p>
                        <p>{memberOrder?.order_number}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Amount - </p>
                        <p>{memberOrder?.amount}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Discount - </p>
                        <p>{memberOrder?.discount}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Pay Amount - </p>
                        <p>{memberOrder?.pay_amount}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Wallet - </p>
                        <Checkbox disabled={true} checked={memberOrder?.is_wallet} />
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>Status - </p>
                        <Badge value={memberOrder?.status}></Badge>
                    </div>

                </div>
            </Card>
        </div>

    </div>
  )
}
