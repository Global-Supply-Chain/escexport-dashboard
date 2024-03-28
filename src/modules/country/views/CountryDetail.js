import React from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { CountryUpdate } from '../entry/CountryUpdate'

export const CountryDetail = () => {
  return (
    <div className=' grid'>

        <div className=' col-12'>
            <BreadCrumb />
        </div>

        <div className=' col-12'>
            <CountryUpdate />
        </div>

    </div>
  )
}