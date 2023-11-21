import React from 'react'
import { UserUpdate } from '../entry/UserUpdate';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { UserDeliveryAddressTable } from '../../delivery/list/UserDeliveryAddressTable';

export const UserDetail = () => {

    return (
        <div className='grid'>
            <div className='col-12'>
                <BreadCrumb />
            </div>

            <div className='col-12'>
                <UserUpdate />
            </div>

            <div className='col-12'>
                <h2 className='text-black'> User Delivery Address </h2>
                <UserDeliveryAddressTable />
            </div>
        </div>
    )
}