import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { orderService } from '../orderService';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { Status } from '../../../shares/Status';
import { BreadCrumb } from '../../../shares/BreadCrumb';

const OrderDetail = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);
    console.log(order);

    const loadingData = useCallback(async () => {
        setLoading(true);
        await orderService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id])

    useEffect(() => {
        loadingData();
    }, [loadingData])

    return (
        <div className=' grid'>

            <div className=' col-12'>

                <BreadCrumb />

            </div>

            <div className=' col-12'>
                <Card
                    title={'Order Detail'}
                >
                    <div className=' grid'>
                        {
                            order?.user_name && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>User Name</h3>
                                    <p className=' m-0'>{order.user_name}</p>
                                </div>
                            )
                        }

                        {
                            order?.phone && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Phone</h3>
                                    <p className=' m-0'>{order.phone}</p>
                                </div>
                            )
                        }

                        {
                            order?.email && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Email</h3>
                                    <p className=' m-0'>{order.email}</p>
                                </div>
                            )
                        }


                        {
                            order?.delivery_address && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Delivery Address</h3>
                                    <p className=' m-0'>{order.delivery_address}</p>
                                </div>
                            )
                        }

                        {
                            order?.delivery_contact_person && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Delivery Contact Person</h3>
                                    <p className=' m-0'>{order.delivery_contact_person}</p>
                                </div>
                            )
                        }

                        {
                            order?.delivery_contact_phone && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Delivery Contact Phone</h3>
                                    <p className=' m-0'>{order.delivery_contact_phone}</p>
                                </div>
                            )
                        }

                        {
                            order?.payment_type && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Payment Type</h3>
                                    <p className=' m-0'>{order.payment_type}</p>
                                </div>
                            )
                        }

                        {
                            order?.status && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Status</h3>
                                    <Status status={order.status} />
                                </div>
                            )
                        }

                        {
                            order?.delivery_feed && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Delivery Feed</h3>
                                    <p className=' m-0'>{order.delivery_feed} MMK</p>
                                </div>
                            )
                        }

                        {
                            order?.discount && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Discount</h3>
                                    <p className=' m-0'>{order.discount} MMK</p>
                                </div>
                            )
                        }

                        {
                            order?.total_amount && (
                                <div className=' col-12 md:col-4'>
                                    <h3 className=' m-0'>Total</h3>
                                    <p className=' m-0'>{order.total_amount} MMK</p>
                                </div>
                            )
                        }
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default OrderDetail