import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { UpdateOrder } from '../entry/UpdateOrder';

const OrderDetail = () => {

    return (
        <div className=' grid'>

            <div className=' col-12'>

                <BreadCrumb />

            </div>

            <div className=' col-12'>
                <UpdateOrder />
            </div>

        </div>
    )
}

export default OrderDetail