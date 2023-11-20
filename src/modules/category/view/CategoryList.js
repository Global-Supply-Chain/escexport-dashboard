import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import CategoryTableView from '../list/CategoryTableView'

const CategoryList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <CategoryTableView />
        </div>


    </div>
  )
}

export default CategoryList