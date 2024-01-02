import React from 'react'
import { FaqUpdate } from '../entry/FaqUpdate'
import { BreadCrumb } from '../../../shares/BreadCrumb'

export const FaqDetail = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <FaqUpdate />
        </div>

    </div>
  )
}
