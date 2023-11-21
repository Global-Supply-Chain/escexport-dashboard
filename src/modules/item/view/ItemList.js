import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import ItemTableView from '../list/ItemTableView'

const ItemList = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <ItemTableView />
        </div>

    </div>
  )
}

export default ItemList