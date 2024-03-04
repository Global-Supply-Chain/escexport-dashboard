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
import { Dropdown } from 'primereact/dropdown';
import { memberPayload } from '../memberPayload';
import { userService } from '../../user/userService';
import { memberService } from '../memberService';
import { memberCardService } from '../../memberCard/memberCardService';
import { AppEditor } from '../../../shares/AppEditor';
import { getRequest } from '../../../helpers/api';

export const MemberCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(memberPayload.create);
    const [desc, setDesc] = useState('');
    const [userList, setUserList] = useState([]);
    const [memberCardList, setMemberCardList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    /**
    * Loading user Data
    */
    const loadingUserData = useCallback(async () => {
        setLoading(true);

        const result = await userService.index(dispatch, memberPayload.userPaginateParams);

        if (result.status === 200) {
            const formatData = result.data?.data?.map((region) => {
                return {
                    label: region?.name,
                    value: region?.id
                }
            })
            setUserList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingUserData()
    }, [loadingUserData])

    /**
    * Loading user Data
    */
    const loadingMemberCardData = useCallback(async () => {
        setLoading(true);

        const result = await memberCardService.index(dispatch, memberPayload.memberCardPaginateParams);
        if (result.status === 200) {
            const formatData = result.data?.data?.map((region) => {
                return {
                    label: region?.label,
                    value: region?.id
                }
            })
            setMemberCardList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingMemberCardData()
    }, [loadingMemberCardData])

    const loadingMemberNextIds = useCallback(async () => {
        setLoading(true);

        const result = await getRequest(paths.memberNextId);
        if(result.status === 200){
            setPayload({
                ...payload,
                member_id : result.data
            })
        }
        console.log(result);


        setLoading(false);
    }, [])

    useEffect(() => {
        loadingMemberNextIds()
    }, [loadingMemberNextIds])


    const submitMemberCreate = async () => {
        setLoading(true);
        let updatePayload = { ...payload };
        updatePayload.description = desc;

        await memberService.store(updatePayload, dispatch);
        setLoading(false);
    }

    // console.log(payload);

    return (
        <>

            <div className=' grid'>
                <div className=' col-12'>
                    <BreadCrumb />
                </div>

                <div className=' col-12'>
                    <Card
                        title={translate.member_create}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="user" className='input-label'>{translate.user} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='user'
                                        autoComplete='user name'
                                        name='user'
                                        filter
                                        value={payload.user_id}
                                        onChange={(e) => payloadHandler(payload, e.value, 'user_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={userList}
                                        placeholder="Select a user"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="user_id" />
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="member_card" className='input-label'>{translate.member_card} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='member_card'
                                        autoComplete='member card'
                                        name='member card'
                                        filter
                                        value={payload.membercard_id}
                                        onChange={(e) => payloadHandler(payload, e.value, 'membercard_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={memberCardList}
                                        placeholder="Select a member card"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="membercard_id" />
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="member_id" className=' text-black'>{translate.member_id} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="member_id"
                                        name="member_id"
                                        autoComplete='name'
                                        aria-describedby="name-help"
                                        tooltip='Member id label'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter member id'
                                        disabled={loading}
                                        value={payload.member_id ? payload.member_id : ''}
                                        onChange={(e) => payloadHandler(payload,e.target.value, 'member_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"member_id"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="amount" className=' text-black'>{translate.amount} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="amount"
                                        name="amount"
                                        autoComplete='amont'
                                        aria-describedby="amount help"
                                        tooltip='Member id label'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter amount'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"amount"} />
                                </div>
                            </div>

                            <div className=" col-12 md:col-6 lg:col-4 py-3">
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
                                onCancel={() => navigate(paths.member)}
                                submit={translate.submit}
                                onSubmit={submitMemberCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
