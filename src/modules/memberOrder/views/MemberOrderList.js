import React from 'react'
import { BreadCrumb } from "../../../shares/BreadCrumb"
import { MemberOrderTableView } from '../list/MemberOrderTableView'


const MemberOrderList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <MemberOrderTableView />
        </div>

    </div>
  )
}

export default MemberOrderList