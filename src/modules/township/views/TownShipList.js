import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { TownShipTableView } from '../list/TownShipTableView'

export const TownShipList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <TownShipTableView />
        </div>

    </div>
  )
}
