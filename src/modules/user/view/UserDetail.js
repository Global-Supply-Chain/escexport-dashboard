import React from 'react'
import { UserUpdate } from '../entry/UserUpdate';
import { BreadCrumb } from '../../../shares/BreadCrumb';

export const UserDetail = () => {

    return (
        <div className='grid'>
            <div className='col-12'>
                <BreadCrumb />
            </div>

            <div className='col-12'>
                <UserUpdate />
            </div>
        </div>
    )
}