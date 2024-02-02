import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { MemberTableView } from '../list/MemberTableView'

export const MemberList = () => {
    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <MemberTableView />
            </div>

        </div>
    )
}
