import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { UpdateDelivery } from '../entry/UpdateDelivery'

export const DeliveryDetail = () => {

  return (
    <div className=' grid'>

        <div className='col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <UpdateDelivery />
        </div>

    </div>
  )
}
