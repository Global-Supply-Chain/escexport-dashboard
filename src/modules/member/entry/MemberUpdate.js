import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
import { Dropdown } from 'primereact/dropdown';
import { memberPayload } from '../memberPayload';
import { userService } from '../../user/userService';
import { memberService } from '../memberService';
import { memberCardService } from '../../memberCard/memberCardService';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { AppEditor } from '../../../shares/AppEditor';

export const MemberUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(memberPayload.create);
    const [userList, setUserList] = useState([]);
    const [memberCardList, setMemberCardList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [memberStatus, setMemberStatus] = useState([]);
    const [desc, setDesc] = useState();

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);
    const { member } = useSelector(state => state.member);

    /**
    * Loading user Data
    */
    const loadingUserData = useCallback(async () => {
        setLoading(true);

        const response = await getRequest(`${endpoints.status}?type=member`);
        if (response.status === 200) {
            setMemberStatus(response.data.member);
        };

        const memberLists = await memberService.index(dispatch);
        if (memberLists.status === 200) {
            const formatData = memberLists.data?.map((member) => {
                return {
                    label: member?.member_id,
                    value: member?.id
                }
            })
            setMemberList(formatData);
        }

        const result = await userService.index(dispatch);
        if (result.status === 200) {
            await memberService.show(dispatch, params.id)
            const formatData = result.data?.map((user) => {
                return {
                    label: user?.name,
                    value: user?.id
                }
            })
            setUserList(formatData);
        }

        setLoading(false);
    }, [dispatch,params.id]);

    useEffect(() => {
        loadingUserData()
    }, [loadingUserData])

    useEffect(() => {
        if (member) {
            setPayload(member)
        }
    }, [member])

    /**
    * Loading user Data
    */
    const loadingMemberCardData = useCallback(async () => {
        setLoading(true);

        const result = await memberCardService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((region) => {
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


    const submitMemberUpdate = async () => {
        setLoading(true);

        let updatePayload = {...payload};
        updatePayload.expired_at = moment(updatePayload.expired_at).format("yy-MM-DD")
        updatePayload.description = desc;

        await memberService.update(dispatch,params.id,updatePayload);
        setLoading(false);
    }

    return (
        <>

            <div className=' grid'>

                <div className=' col-12'>
                    <Card
                        title={translate.member_update}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="user" className='input-label text-black'>{translate.user} <span>(required*)</span> </label>
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
                                <label htmlFor="member_card" className='input-label text-black'>{translate.member_card} <span>(required*)</span> </label>
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
                                    <label htmlFor="amount" className=' text-black'>{translate.amount} <span>(required*)</span></label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="amount"
                                        name="amount"
                                        autoComplete='amont'
                                        aria-describedby="amount help"
                                        tooltip='Member id label'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter amount'
                                        value={payload.amount}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"amount"} />
                                </div>
                            </div>

                            <div className=" col-12 md:col-6 lg:col-4 py-3 ">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="expired_at" className=" text-black">
                                        {translate.expired_at}
                                    </label>
                                    <Calendar
                                        name='expired_at'
                                        className="p-inputtext-sm sm:w-full mt-3 md:mt-0"
                                        placeholder="Select expired at"
                                        selectionMode={"single"}
                                        value={payload.expired_at}
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

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="member_id" className=' text-black'>{translate.member_id}</label>
                                    <Dropdown
                                        inputId='member_id'
                                        name='member_id'
                                        className="p-inputtext-sm"
                                        options={memberList}
                                        placeholder="Select a member id"
                                        disabled={loading}
                                        value={payload.member_id}
                                        onChange={(e) => payloadHandler(payload, e.value, 'member_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />

                                    <ValidationMessage field={"member_id"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="status" className=' text-black'>{translate.status}</label>
                                    <Dropdown
                                        inputId='status'
                                        name='status'
                                        className="p-inputtext-sm"
                                        options={memberStatus}
                                        placeholder="Select a member status"
                                        disabled={loading}
                                        value={payload.status}
                                        onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />

                                    <ValidationMessage field={"status"} />
                                </div>
                            </div>

                            <div className=" col-12 py-3">
                                <div className="flex flex-column gap-2">
                                    <span className=" text-black">{translate.description} </span>
                                    <AppEditor value={payload.description} onChange={(e) => setDesc(e)} />
                                    <ValidationMessage field={"description"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.member)}
                                submit={translate.update}
                                onSubmit={submitMemberUpdate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
