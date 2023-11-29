import React, { useCallback, useEffect, useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { ValidationMessage } from '../../../shares/ValidationMessage'
import { payloadHandler } from '../../../helpers/handler'
import { deliveryPayload } from '../deliveryPayload'
import { userService } from '../../user/userService'
import { useDispatch } from 'react-redux'

export const CreateDelivery = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(deliveryPayload.create);
    const [userList, setUserList] = useState([]);

    const dispatch = useDispatch();

    /**
    * Loading Category Data
    */
    const loadingUserData = useCallback(async () => {
        setLoading(true);

        const result = await userService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((user) => {
                return {
                    label: user?.name,
                    value: user?.id
                }
            })
            setUserList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingUserData()
    }, [loadingUserData])

    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>

                <Card
                    title={'Create Delivery'}
                >

                    <div className=' grid'>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="user" className='input-label'> User (required*) </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    id='user'
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

                    </div>

                </Card>

            </div>

        </div>
    )
}
