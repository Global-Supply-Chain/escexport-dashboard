import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
import { memberCardService } from '../memberCardService';
import { memberCardPayload } from '../memberCardPayload';
import { MemberCardImg } from '../../../shares/MemberCardImg';
import { discountService } from '../../discount/discountService';
import { Dropdown } from 'primereact/dropdown';

export const MemberCardCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(memberCardPayload.create);
    const [discountList, setDiscountList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    /**
    * Loading discount Data
    */
    const loadingDiscountData = useCallback(async () => {
        setLoading(true);

        const result = await discountService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((region) => {
                return {
                    label: region?.label,
                    value: region?.id
                }
            })
            setDiscountList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingDiscountData()
    }, [loadingDiscountData])


    const submitMemberCardCreate = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("label", payload.label);
        formData.append("discount_id", payload.discount_id);
        formData.append("front_background", payload.front_background)
        formData.append("back_background", payload.back_background);
        formData.append("expired_at", payload.expired_at);

        await memberCardService.store(formData, dispatch);
        setLoading(false);
    }

    return (
        <>

            <div className=' grid'>
                <div className=' col-12'>
                    <BreadCrumb />
                </div>

                <div className=' col-12'>
                    <Card
                        title={translate.member_card_create}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className=' col-12 md:col-6 my-3 md:my-0'>
                                <MemberCardImg
                                    payload={payload}
                                    setPayload={setPayload}
                                    field={'front_background'}
                                />
                                <ValidationMessage field={"front_background"} />
                            </div>

                            <div className=' col-12 md:col-6 my-3 md:my-0'>
                                <MemberCardImg
                                    payload={payload}
                                    setPayload={setPayload}
                                    field={'back_background'}
                                />
                                <ValidationMessage field={"back_background"} />
                            </div>


                            <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>{translate.label} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="name"
                                        name="name"
                                        autoComplete='name'
                                        aria-describedby="name-help"
                                        tooltip='Member label'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter member label'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'label', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"label"} />
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                                <label htmlFor="discount" className='input-label'>{translate.discount} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='discount'
                                        autoComplete='discount name'
                                        name='discount'
                                        value={payload.discount_id}
                                        onChange={(e) => payloadHandler(payload, e.value, 'discount_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={discountList}
                                        placeholder="Select a discount"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="discount_id" />
                            </div>

                            <div className=" col-12 md:col-6 lg:col-4 my-3 md:my-0">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="expired_at" className=" text-black">
                                        {translate.expired_at}
                                    </label>
                                    <Calendar
                                        name='expired_at'
                                        className="p-inputtext-sm sm:w-full mt-3 md:mt-0"
                                        placeholder="Select expired at"
                                        selectionMode={"single"}
                                        onChange={(e) =>
                                            payloadHandler(
                                                payload,
                                                moment(e.target.value).format("yy-MM-DD"),
                                                "start_date",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            )
                                        }
                                    />

                                    <ValidationMessage field={"expired_at"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                cancelClick={() => navigate(paths.memberCard)}
                                submit={translate.submit}
                                submitClick={submitMemberCardCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}