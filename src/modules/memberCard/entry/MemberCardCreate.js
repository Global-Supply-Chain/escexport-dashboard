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
import { discountService } from '../../discount/discountService';
import { Dropdown } from 'primereact/dropdown';
import { formBuilder } from '../../../helpers/formBuilder';
import { AppEditor } from '../../../shares/AppEditor';

export const MemberCardCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(memberCardPayload.create);
    const [discountList, setDiscountList] = useState([]);
    const [desc, setDesc] = useState()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    /**
    * Loading discount Data
    */
    const loadingDiscountData = useCallback(async () => {
        setLoading(true);

        const result = await discountService.index(dispatch, memberCardPayload.discountPaginateParams);
        if (result.status === 200) {
            const formatData = result.data?.data?.map((region) => {
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
        let updatePayload = { ...payload };
        updatePayload.expired_at = moment(updatePayload.expired_at).format('yy-MM-DD')
        updatePayload.description = desc;
        const formData = formBuilder(updatePayload,memberCardPayload.create)

        const result = await memberCardService.store(formData, dispatch);
        console.log(result);
        if(result.status === 200) {
            setLoading(false);
            navigate(`${paths.memberCard}/${result.data.id}`);
        }
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
                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className='text-black'> {translate.label} <span> (required*) </span></label>
                                    <InputText
                                        className="p-inputtext-sm"
                                        id="name"
                                        name="name"
                                        autoComplete='name'
                                        aria-describedby="name-help"
                                        tooltip={translate.label}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder={translate.label}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'label', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"label"} />
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="discount" className='input-label text-black'>{translate.discount} <span> (required*) </span> </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='discount'
                                        autoComplete='discount name'
                                        name='discount'
                                        value={payload.discount_id}
                                        filter
                                        onChange={(e) => payloadHandler(payload, e.value, 'discount_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={discountList}
                                        placeholder={translate.discount}
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="discount_id" />
                            </div>

                            <div className=" col-12 md:col-6 lg:col-4 py-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="expired_at" className="text-black">  {translate.expired_at} <span> (required*) </span> </label>
                                    <Calendar
                                        name='expired_at'
                                        className="p-inputtext-sm sm:w-full mt-3 md:mt-0"
                                        placeholder={translate.expired_at}
                                        selectionMode={"single"}
                                        onChange={(e) =>
                                            payloadHandler(
                                                payload,
                                                e.target.value,
                                                "expired_at",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            )
                                        }
                                    />

                                    <ValidationMessage field={"expired_at"} />
                                </div>
                            </div>

                            <div className=" col-12 py-3">
                                <div className="flex flex-column gap-2">
                                    <span className=" text-black">{translate.description} </span>
                                    <AppEditor onChange={(e) => setDesc(e)} />
                                    <ValidationMessage field={"description"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.memberCard)}
                                submit={translate.submit}
                                onSubmit={submitMemberCardCreate}
                                loading={loading}
                            />

                        </div>
                    </Card>
                </div>
            </div>

        </>
    )
}
