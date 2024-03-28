import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { RegionAndStateTableView } from '../list/RegionAndStateTableView'

export const RegionAndStateList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <RegionAndStateTableView />
        </div>

    </div>
  )
}
