import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { defineAbilityFor } from '../ability';


export const Can = ({children}) => {
    const { role,permission } = useLoaderData();
    console.log(permission);
   
    const transformedPermission = `"${permission.join('","')}"`;
    console.log(transformedPermission);
    const auth = defineAbilityFor({ role : role, permission: transformedPermission});

    console.log(auth.can(transformedPermission));
  return (
    <>
        {auth.can(transformedPermission) ? children : <p className=' text-black'>You can not have the right permission</p>}
    </>
  )
}