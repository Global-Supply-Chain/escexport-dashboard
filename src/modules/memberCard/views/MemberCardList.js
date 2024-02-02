import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { MemberCardTableView } from '../list/MemberCardTableView'

export const MemberCardList = () => {
    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <MemberCardTableView />
            </div>

        </div>
    )
}
