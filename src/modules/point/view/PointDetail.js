import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import PointUpdate from '../entry/PointUpdate'

const PointDetail = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <PointUpdate />
        </div>

    </div>
  )
}

export default PointDetail