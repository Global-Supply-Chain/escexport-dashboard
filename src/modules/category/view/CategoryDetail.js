import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import CategoryUpdate from '../entry/CategoryUpdate';

const CategoryDetail = () => {

  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <CategoryUpdate />
        </div>

    </div>
  )
}

export default CategoryDetail