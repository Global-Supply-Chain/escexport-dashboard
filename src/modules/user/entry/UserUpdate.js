import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useState } from 'react'
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { payloadHandler } from '../../../helpers/handler';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { tooltipOptions } from '../../../constants/config';
import { getRequest } from '../../../helpers/api';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { userService } from '../userService';
import { userPayload } from '../userPayload';

const UserUpdate = ({ dataSource }) => {

    const [loading, setLoading] = useState(false);
    const [userStatus, setUserStatus] = useState([]);
    const [payload, setPayload] = useState(userPayload.update);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * user update
     * payload [name,profile,email,phone,status]
     * @returns
     * **/
    const submitUpdateUser = async () => {
        setLoading(true);
        
        await userService.updateUser(payload,dispatch,dataSource)

        setLoading(false)

    }

    /**
     * Loading User Status
     * @returns
     * **/
    const loadingUserStatus = useCallback(async () =>    {

        const response = await getRequest(`/status?type=user`);

        if(response){

            const formateData = response.data.user?.map((item) => {
                return {
                    label : item, 
                    value: item
                }
            })

            setUserStatus(formateData);
        }

    }, []);

    const loadingDataSource = useCallback(() => {
        if(dataSource) {
            setPayload(dataSource);
        }
    }, [dataSource]);


    useEffect(() => {

        loadingUserStatus();

    }, [loadingUserStatus]);

    useEffect(() => {
        loadingDataSource();
    },[loadingDataSource]);

    useEffect(() => {
        userService.show('360833533268745');
    },[]);


    return (
        <>

            <Card title="User Update" >

                <div className=' grid'>

                    <div className=' col-12 flex align-items-center justify-content-center'>

                        <form>

                            <Avatar
                                icon="pi pi-user"
                                size="xlarge"
                                shape="circle"
                                onClick={() => {
                                    document.getElementById('profile').click();
                                }}
                            />
                            <input id="profile" type='file' className=' hidden' />

                        </form>

                    </div>

                    <div className=' col-12 md:col-6 lg:col-4 py-3'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="name" className=' text-black'>Name</label>
                            <InputText
                                className="p-inputtext-sm text-black"
                                id="name"
                                aria-describedby="name-help"
                                tooltip='user name'
                                value={payload?.name ? payload?.name : ""}
                                tooltipOptions={{ ...tooltipOptions }}
                                placeholder='Enter user name'
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                            <ValidationMessage field={"name"} />
                        </div>
                    </div>

                    {/* <div className=' md:col-6'>
    <div className="flex flex-column gap-2">
        <label htmlFor="rewardPoint">Reward Point</label>
        <InputNumber
            id="rewardPoint"
            aria-describedby="rewardPoint-help"
            tooltip='user reward point'
            placeholder='Enter user reward point'
        />
    </div>
</div> */}
                    {/* <div className=' md:col-6'>
    <div className="flex flex-column gap-2">
        <label htmlFor="profile">Profile</label>
        <InputText
            id="profile"
            aria-describedby="profile-help"
            tooltip='user profile'
            placeholder='Enter user profile'
        />
    </div>
</div> */}

                    <div className=' col-12 md:col-6 lg:col-4 py-3'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="email" className=' text-black'>Email</label>
                            <InputText
                                className="p-inputtext-sm text-black"
                                keyfilter={'email'}
                                id="email"
                                aria-describedby="email-help"
                                tooltip='user email'
                                value={payload?.email ? payload?.email : ""}
                                tooltipOptions={{ ...tooltipOptions }}
                                placeholder='Enter user email'
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                            <ValidationMessage field={"email"} />
                        </div>
                    </div>
                    <div className=' col-12 md:col-6 lg:col-4 py-3'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="phone" className=' text-black'>Phone</label>
                            <InputText
                                className="p-inputtext-sm text-black"
                                keyfilter={'num'}
                                id="phone"
                                aria-describedby="phone-help"
                                tooltip='user phone'
                                value={payload?.phone ? payload.phone : ""}
                                tooltipOptions={{ ...tooltipOptions }}
                                placeholder='Enter user phone'
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'phone', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                            <ValidationMessage field={"phone"} />
                        </div>
                    </div>

                    <div className=' col-12 md:col-6 lg:col-4 py-3'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="phone" className=' text-black'>Status</label>
                            <Dropdown 
                            options={userStatus} 
                            placeholder="Select a user status" 
                            disabled={loading}
                            value={payload.status}
                            className=' text-black'
                            onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                setPayload(updateValue);
                            })}
                            />
 
                            <ValidationMessage field={"status"} />
                        </div>
                    </div>

                    <div className=' md:col-12 mx-2 md:mx-0 my-3'>
                        <div className=' flex align-items-center justify-content-end'>
                            <div className=' flex align-items-center justify-content-between gap-3'>

                                <Button
                                    label="CANCEL"
                                    severity="secondary"
                                    outlined
                                    size='small'
                                    onClick={() => navigate(paths.user)}
                                />

                                <Button
                                    severity="danger"
                                    size='small'
                                    disabled={loading}
                                    label="SUBMIT"
                                    onClick={() => submitUpdateUser()}
                                />

                            </div>
                        </div>
                    </div>

                </div>

            </Card>

        </>
    )
}

export default UserUpdate