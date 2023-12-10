import React from 'react'
import { FaqTableView } from '../list/FaqTableView'
import { BreadCrumb } from '../../../shares/BreadCrumb'

export const FaqList = () => {
  return (
    <div className=' grid'>

      <div className=' col-12'>
        <BreadCrumb />
      </div>

      <div className=' col-12'>
          <FaqTableView />
      </div>

    </div>
  )
}
