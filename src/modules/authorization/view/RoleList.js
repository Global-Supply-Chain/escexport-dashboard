import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { RoleTableView } from '../list/RoleTableView'

export const RoleList = () => {
  return (
    <div className=' grid'>
        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <RoleTableView />
        </div>
    </div>
  )
}
