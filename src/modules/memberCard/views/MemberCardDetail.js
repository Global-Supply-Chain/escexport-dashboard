import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { MemberCardUpdate } from '../entry/MemberCardUpdate';

const MemberCardDetail = () => {

  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className='col-12'>
            <MemberCardUpdate />
        </div>

    </div>
  )
}

export default MemberCardDetail