import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { DiscountTableView } from '../list/DiscountTableView'

export const DiscountList = () => {
    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <DiscountTableView />
            </div>

        </div>
    )
}
