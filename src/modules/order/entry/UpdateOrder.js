import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { orderService } from '../orderService';
import { deliveryService } from '../../delivery/deliveryService';
import { orderPayload } from '../orderPayload';
import { Card } from 'primereact/card';
import { paths } from '../../../constants/paths';
import { Dropdown } from 'primereact/dropdown';
import { userService } from '../../user/userService';
import { tooltipOptions } from '../../../constants/config';
import { payloadHandler } from '../../../helpers/handler';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { InputText } from 'primereact/inputtext';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';

export const UpdateOrder = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(orderPayload.update);
    const [deliveryList, setDeliveryList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [paymentTypeList, setPaymentTypeList] = useState([]);
    const [orderStatusList, setOrderStatusList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order } = useSelector((state) => state.order);
    const { translate } = useSelector(state => state.setting);

    /**
    * Loading delivery address
    */
    const loadingDeliveryAddressData = useCallback(async () => {
        setLoading(true);
        const result = await deliveryService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((delivery) => {
                return {
                    label: delivery?.address?.substring(0, 30) + '...',
                    value: delivery?.id
                }
            })
            setDeliveryList(formatData);
        }
        const userResponse = await userService.index(dispatch);
        if (userResponse.status === 200) {
            const formatData = userResponse.data?.map((user) => {
                return {
                    label: user?.name,
                    value: user?.id
                }
            })
            setUserList(formatData)
        }

        const response = await getRequest(`/${endpoints.status}?type=${endpoints.paymentType}`);
        if (response.status === 200) {
            const formateData = response.data.payment_type?.map((payment) => {
                return {
                    label: payment,
                    value: payment
                }
            })
            setPaymentTypeList(formateData)
        }

        const orderResponse = await getRequest(`/${endpoints.status}?type=${endpoints.order}`);
        if (orderResponse.status === 200) {
            const formateData = orderResponse.data.order?.map((order) => {
                return {
                    label: order,
                    value: order
                }
            })
            setOrderStatusList(formateData)
        }

        await orderService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        loadingDeliveryAddressData()
    }, [loadingDeliveryAddressData])

    useEffect(() => {
        if (order) {
            setPayload(order)
        }
    }, [order])

    const submitOrderUpdate = async () => {
        setLoading(true);
        await orderService.update(dispatch, payload.id, payload);
        setLoading(false);
    }

    return (
        <Card
            title={translate.order_update}
        >

            <Loading loading={loading} />

            <div className=' grid'>

                <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                    <label htmlFor="delivery" className='input-label'> {translate.delivery_address} (required*) </label>
                    <div className="p-inputgroup mt-2">
                        <Dropdown
                            id="delivery"
                            value={payload.delivery_address_id ? payload.delivery_address_id : ''}
                            onChange={(e) => payloadHandler(payload, e.value, 'delivery_address_id', (updateValue) => {
                                setPayload(updateValue);
                            })}
                            options={deliveryList}
                            placeholder="Select a delivery address"
                            disabled
                            className="p-inputtext-sm"
                        />
                    </div>
                    <ValidationMessage field="delivery_address_id" />
                </div>

                <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                    <label htmlFor="user" className='input-label'> {translate.user} (required*) </label>
                    <div className="p-inputgroup mt-2">
                        <Dropdown
                            id='user'
                            value={payload.user_id ? payload.user_id : ''}
                            onChange={(e) => payloadHandler(payload, e.value, 'user_id', (updateValue) => {
                                setPayload(updateValue);
                            })}
                            options={userList}
                            placeholder="Select a user"
                            disabled
                            className="p-inputtext-sm"
                        />
                    </div>
                    <ValidationMessage field="user_id" />
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'> {translate.user_name} (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            aria-describedby="name-help"
                            tooltip='User full name'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter user name'
                            disabled
                            value={payload?.user_name ? payload?.user_name : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'user_name', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"user_name"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="phone" className=' text-black'>{translate.phone}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="phone"
                            aria-describedby="code-help"
                            tooltip='Order Phone'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter phone number'
                            disabled
                            value={payload?.phone ? payload?.phone : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'phone', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"phone"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="email" className=' text-black'>{translate.email}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="email"
                            aria-describedby="email-help"
                            tooltip='Item email'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter order email'
                            disabled
                            value={payload?.email ? payload?.email : ''}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"email"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="delivery_address" className=' text-black'>{translate.delivery_address}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="delivery_address"
                            aria-describedby="price-help"
                            tooltip='Delivery Address'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter order delivery address'
                            disabled
                            value={payload?.delivery_address ? payload?.delivery_address : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'delivery_address', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"delivery_address"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="delivery_contact_person" className=' text-black'>{translate.delivery_contact_person}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="delivery_contact_person"
                            aria-describedby="delivery-contact-person-help"
                            tooltip='Order delivery contact person'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter order delivery contact person'
                            disabled
                            value={payload?.delivery_contact_person ? payload?.delivery_contact_person : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'delivery_contact_person', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"delivery_contact_person"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="delivery_contact_phone" className=' text-black'>{translate.delivery_contact_phone}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="delivery_contact_phone"
                            keyfilter="int"
                            aria-describedby="delivery-contact-phone-help"
                            tooltip='Order delivery contact phone'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter order delivery contact phone'
                            disabled
                            value={payload?.delivery_contact_phone ? payload?.delivery_contact_phone : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'delivery_contact_phone', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"delivery_contact_phone"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="discount" className=' text-black'>{translate.discount}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="discount"
                            keyfilter="int"
                            aria-describedby="discount-help"
                            tooltip='Order discount'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter order discount'
                            disabled
                            value={payload?.discount ? payload?.discount : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'discount', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"discount"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="delivery_feed" className=' text-black'>{translate.delivery_feed}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="delivery_feed"
                            keyfilter="int"
                            aria-describedby="delivery_feed-help"
                            tooltip='Order delivery feed'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter order delivery feed'
                            disabled
                            value={payload?.delivery_feed ? payload?.delivery_feed : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'delivery_feed', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"delivery_feed"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="total_amount" className=' text-black'>{translate.total_amount}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="total_amount"
                            keyfilter="int"
                            aria-describedby="total-amount-help"
                            tooltip='Order total amount'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter total amount'
                            disabled
                            value={payload?.total_amount ? payload?.total_amount : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'total_amount', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"total_amount"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="payment" className=' text-black'>{translate.payment_type}</label>
                        <Dropdown
                            options={paymentTypeList}
                            placeholder="Select a payment type"
                            disabled
                            value={payload.payment_type ? payload.payment_type : ''}
                            className="p-inputtext-sm text-black"
                            onChange={(e) => payloadHandler(payload, e.value, 'payment_type', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />

                        <ValidationMessage field={"payment_type"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="status" className=' text-black'>{translate.status}</label>
                        <Dropdown
                            id="status"
                            options={orderStatusList}
                            placeholder="Select a status"
                            disabled={loading}
                            value={payload.status ? payload.status : ''}
                            className="p-inputtext-sm text-black"
                            onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />

                        <ValidationMessage field={"status"} />
                    </div>
                </div>

                <FormMainAction
                    cancel={translate.cancel}
                    cancelClick={() => navigate(paths.order)}
                    submit={translate.update}
                    submitClick={submitOrderUpdate}
                    loading={loading}
                />

            </div>

        </Card>
    )
}
