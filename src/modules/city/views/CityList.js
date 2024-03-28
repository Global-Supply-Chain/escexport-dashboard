import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { CityTableView } from '../list/CityTableView'

export const CityList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <CityTableView />
        </div>

    </div>
  )
}
