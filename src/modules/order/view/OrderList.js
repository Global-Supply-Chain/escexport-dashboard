import React from 'react'
import { BreadCrumb } from "../../../shares/BreadCrumb"
import { OrderTableView } from '../list/OrderTableView'


const OrderList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <OrderTableView />
        </div>

    </div>
  )
}

export default OrderList