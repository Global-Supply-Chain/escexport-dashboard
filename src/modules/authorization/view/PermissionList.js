import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { PermissionTableView } from '../list/PermissionTableView'

export const PermissionList = () => {
  return (
    <div className=' grid'>
        <div className=' col-12'>
            <BreadCrumb />
        </div>
        <div className=' col-12'>
            <PermissionTableView />
        </div>
    </div>
  )
}
