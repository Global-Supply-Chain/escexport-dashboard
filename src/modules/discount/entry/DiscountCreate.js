import React, { useState } from 'react'
import { discountPayload } from '../discountPayload';
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
import { discountService } from '../discountService';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

export const DiscountCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(discountPayload.create);
    const [isExpenLimit, setIsExpendLimit] = useState(false);
    const [isFixAmount, setIsFixAmount] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    const submitDiscountCreate = async () => {
        setLoading(true);
        await discountService.store(payload, dispatch);
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
                        title={translate.discount_create}
                    >
                        <Loading loading={loading} />

                        <div className=' grid'>
                            <div className=" col-12 md:col-6 lg:col-6 py-3">
                                <div className="flex flex-row align-items-center gap-2">
                                    <Checkbox
                                        className="p-inputtext-sm"
                                        inputId="is_expend_limit"
                                        name="is expend limit"
                                        autoComplete="is expend limit"
                                        aria-describedby="is expend limit help"
                                        tooltip={translate.is_expend_limit}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder={translate.is_expend_limit}
                                        disabled={loading}
                                        checked={payload.is_expend_limit}
                                        onChange={(e) => {
                                            setIsExpendLimit(e.checked);
                                            payloadHandler(
                                                payload,
                                                e.checked,
                                                "is_expend_limit",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            )
                                        }
                                        }
                                    />
                                    <label htmlFor="is_expend_limit" className="text-black"> {translate.is_expend_limit} </label>
                                </div>
                            </div>

                            <div className=" col-12 md:col-6 lg:col-6 py-3">
                                <div className="flex flex-row align-items-center gap-2">
                                    <Checkbox
                                        className="p-inputtext-sm"
                                        inputId="is_fix_amount"
                                        name="is fix amount"
                                        autoComplete="is fix amount"
                                        aria-describedby="is fix amount help"
                                        tooltip={translate.is_fix_amount}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        checked={payload.is_fix_amount}
                                        onChange={(e) => {
                                            setIsFixAmount(e.checked)
                                            payloadHandler(
                                                payload,
                                                e.checked,
                                                "is_fix_amount",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            )
                                        }
                                        }
                                    />
                                    <label htmlFor="is_fix_amount" className="text-black"> {translate.is_fix_amount} </label>
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className='text-black'>{translate.label} <span> (required*) </span></label>
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

                            <div className=" col-12 md:col-6 lg:col-4 py-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="start_date" className=" text-black"> {translate.start_date} <span> (required*) </span> </label>
                                    <Calendar
                                        name='start_date'
                                        className="p-inputtext-sm sm:w-full mt-3 md:mt-0"
                                        placeholder={translate.start_date}
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
                                    <ValidationMessage field={"start_date"} />
                                </div>
                            </div>

                            <div className=" col-12 md:col-6 lg:col-4 py-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="end_date" className=" text-black"> {translate.end_date} <span> (required*)</span> </label>
                                    <Calendar
                                        name='end_date'
                                        className="p-inputtext-sm sm:w-full mt-3 md:mt-0"
                                        placeholder={translate.end_date}
                                        selectionMode={"single"}
                                        onChange={(e) =>
                                            payloadHandler(
                                                payload,
                                                moment(e.target.value).format("yy-MM-DD"),
                                                "end_date",
                                                (updateValue) => {
                                                    setPayload(updateValue);
                                                }
                                            )
                                        }
                                    />

                                    <ValidationMessage field={"end_date"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="discount_percentage" className='text-black'>{translate.discount_percentage} </label>
                                    <InputText
                                        className="p-inputtext-sm"
                                        id="discount_percentage"
                                        name="discount_percentage"
                                        keyfilter={'int'}
                                        autoComplete='discount percentage'
                                        aria-describedby="discount percentage help"
                                        tooltip={translate.discount_percentage}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder={translate.discount_percentage}
                                        disabled={loading ? loading : isFixAmount}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'discount_percentage', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"discount_percentage"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="discount_fix_amount" className='text-black'>{translate.discount_fix_amount} </label>
                                    <InputText
                                        className="p-inputtext-sm"
                                        id="discount_fix_amount"
                                        name="discount_fix_amount"
                                        keyfilter={'int'}
                                        autoComplete='discount fix amount'
                                        aria-describedby="discount fix amount help"
                                        tooltip={translate.discount_fix_amount}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder={translate.discount_fix_amount}
                                        disabled={loading ? loading : !isFixAmount}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'discount_fix_amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"discount_fix_amount"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="expend_limit" className='text-black'>{translate.expend_limit} </label>
                                    <InputText
                                        disabled={loading ? loading : !isExpenLimit}
                                        className="p-inputtext-sm text-black"
                                        id="expend_limit"
                                        name="expend_limit"
                                        keyfilter={'int'}
                                        autoComplete='expend limit'
                                        aria-describedby="expend limit help"
                                        tooltip={translate.expend_limit}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder={translate.expend_limit}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'expend_limit', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"expend_limit"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.discount)}
                                submit={translate.submit}
                                onSubmit={submitDiscountCreate}
                                loading={loading}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}