import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import React, { useCallback, useEffect, useState } from 'react'
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { payloadHandler } from '../../../helpers/handler';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { tooltipOptions } from '../../../constants/config';
import { getRequest } from '../../../helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { userService } from '../userService';
import { userPayload } from '../userPayload';
import { endpoints } from '../../../constants/endpoints';
import { uploadFile } from '../../../helpers/uploadFile';
import { Loading } from '../../../shares/Loading';

export const UserUpdate = ({ dataSource }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { user } = useSelector(state => state.user);
    const { translate } = useSelector(state => state.setting);

    const [loading, setLoading] = useState(false);
    const [userStatus, setUserStatus] = useState([]);
    const [payload, setPayload] = useState(userPayload.update);
    
    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        await userService.show(dispatch, params.id);

        const response = await getRequest(`${endpoints.status}?type=user`);
        if(response.status === 200) {
            setUserStatus(response.data.user);
        };
        setLoading(false);
    },[dispatch, params.id]);

    /**
     * user update
     * payload [name,profile,email,phone,status]
     * @returns
     * **/
    const submitUpdateUser = async () => {
        setLoading(true);
        await userService.update(dispatch, params.id, payload)
        setLoading(false)
    }

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if(user) {
            setPayload(user);
        }
    },[user])

    return (
        <Card 
            title={translate.user_update}
            subTitle={translate.user_subtitle}
        >
            <Loading loading={loading} />

            <div className='grid'>
                <div className='col-12 flex align-items-center justify-content-center'>
                    <form className="w-full flex flex-column justify-content-center align-items-center">
                        <Avatar 
                            className="mb-3"
                            icon="pi pi-user" 
                            size="xlarge" 
                            shape="circle"
                            image={payload.profile ? `${endpoints.image}/${payload.profile}` : null}
                            onClick={() => {
                                document.getElementById('profile').click();
                            }}
                        />
                        <input 
                            className='hidden'
                            id="profile" 
                            type='file' 
                            accept="image/*"
                            onChange={async (e) => {
                                const result = await uploadFile.image(dispatch, e.target.files[0], 'ADMIN_PROIFLE');
                                if(result.status === 200) {
                                    payloadHandler(payload, result.data.id, 'profile', (updateValue) => {
                                        setPayload(updateValue);
                                    });
                                }
                            }}
                        />

                        <ValidationMessage field={'profile'} />
                        <ValidationMessage field={'file'} />
                    </form>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'>{translate.name}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            name="name"
                            autoComplete='User name'
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="email" className=' text-black'>{translate.email}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            keyfilter={'email'}
                            id="email"
                            name="email"
                            autoComplete='User email update'
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
                        <label htmlFor="phone" className=' text-black'>{translate.phone}</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            keyfilter={'num'}
                            id="phone"
                            name="phone"
                            autoComplete='User phone update'
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
                        <label htmlFor="status" className=' text-black'>{translate.status}</label>
                        <Dropdown 
                            inputId='status'
                            name='status'
                            className="p-inputtext-sm text-black"
                            options={userStatus} 
                            placeholder="Select a user status" 
                            disabled={loading}
                            value={payload.status}
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
                                label={translate.cancel}
                                severity="secondary"
                                outlined
                                size='small'
                                onClick={() => navigate(paths.user)}
                            />

                            <Button
                                severity="danger"
                                size='small'
                                disabled={loading}
                                label={translate.update}
                                onClick={() => submitUpdateUser()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}