import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { MemberUpdate } from '../entry/MemberUpdate';

const MemberDetail = () => {

  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className='col-12'>
            <MemberUpdate />
        </div>

    </div>
  )
}

export default MemberDetail