import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import PointTableView from '../list/PointTableView'

const PointList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <PointTableView />
        </div>

    </div>
  )
}

export default PointList