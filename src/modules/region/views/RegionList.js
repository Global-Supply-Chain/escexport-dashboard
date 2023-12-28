import React from 'react'
import { RegionTableView } from '../list/RegionTableView'
import { BreadCrumb } from '../../../shares/BreadCrumb'

export const RegionList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <RegionTableView />
        </div>

    </div>
  )
}
