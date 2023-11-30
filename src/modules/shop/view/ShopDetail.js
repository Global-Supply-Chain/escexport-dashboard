import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { UpdateShop } from '../entry/UpdateShop'

export const ShopDetail = () => {

  return (
    <div className=' grid'>

        <div className='col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
           <UpdateShop />
        </div>

    </div>
  )
}
