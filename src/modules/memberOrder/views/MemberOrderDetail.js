

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
    const { translate } = useSelector(state => state.setting);

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
                        <p className=' font-bold'>{translate.name} - </p>
                        <p>{memberOrder?.name}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.user_name} - </p>
                        <p>{memberOrder?.user_name}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className='font-bold'>{translate.email} - </p>
                        <p>{memberOrder?.email}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.phone} - </p>
                        <p>{memberOrder?.phone}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.member_id} - </p>
                        <p>{memberOrder?.member_id}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.card_number} - </p>
                        <p>{memberOrder?.card_number}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.card_type} - </p>
                        <p>{memberOrder?.card_type}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.order_number} - </p>
                        <p>{memberOrder?.order_number}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.amount} - </p>
                        <p>{memberOrder?.amount}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.discount} - </p>
                        <p>{memberOrder?.discount}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.pay_amount} - </p>
                        <p>{memberOrder?.pay_amount}</p>
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.is_wallet} - </p>
                        <Checkbox disabled={true} checked={memberOrder?.is_wallet} />
                    </div>

                    <div className=' col-12 md:col-4 flex align-items-center justify-content-start gap-5'>
                        <p className=' font-bold'>{translate.status} - </p>
                        <Badge value={memberOrder?.status}></Badge>
                    </div>

                </div>
            </Card>
        </div>

    </div>
  )
}
