import React, { useCallback, useEffect, useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import ItemUpdate from '../entry/ItemUpdate';

const ItemDetail = () => {

  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div>
            <ItemUpdate dataSource={dataSource} />
        </div>

    </div>
  )
}

export default ItemDetail