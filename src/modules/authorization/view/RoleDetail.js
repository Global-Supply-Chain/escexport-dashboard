import React, { useCallback, useEffect, useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { RoleUpdate } from '../entry/RoleUpdate'
import { authorizationService } from '../authorizatonService'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RoleHasPermissionTableView } from '../list/RoleHasPermissionTableView'

function findDifferentElements(array1, array2) {
    const differentElements = [];
  
    array1?.forEach(element1 => {
      const found = array2?.some(element2 => element1.name === element2.name);
      if (!found) {
        differentElements?.push(element1);
      }
    });
  
    array2?.forEach(element2 => {
      const found = array1?.some(element1 => element1.name === element2.name);
      if (!found) {
        differentElements?.push(element2);
      }
    });
  
    return {differentElements};
  }

export const RoleDetail = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [permissionList, setPermissionList] = useState([]);
    const [roleHasPermissionList, setRoleHasPermissionList] = useState([]);
    const [differentPermissionList, setDifferentPermissionList] = useState([]);
    const [dataSource, setDataSource] = useState({
        id: params.id,
        permissionList: permissionList,
        role: null
    });

    const { role } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * loading Role Data
     * @returns
     * 
     * **/
    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await authorizationService.roleShow(dispatch,params.id)
        if (response.status === 200) {
            setRoleHasPermissionList(response?.data?.permissions)
        }
        setLoading(false);
    }, [dispatch,params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData])


    /**
     * loading permission list
     * @returns
     * 
     * **/
    const loadingPermissionData = useCallback(async () => {
        setLoading(true);
        const result = await authorizationService.permissionIndex(dispatch);
        if (result.status === 200) {
            setPermissionList(result.data);
        }
        setLoading(false);
    }, [dispatch])

    useEffect(() => {
        loadingPermissionData();
    }, [loadingPermissionData])

    useEffect(() => {
        
        const response = findDifferentElements(permissionList, roleHasPermissionList);
        if(response) {
            const formatData = response?.differentElements?.map((permission) => {
                return {
                    name: permission?.name,
                    code: permission?.id
                }
            })
            setDifferentPermissionList(formatData)
        }
    
    }, [permissionList, roleHasPermissionList])


    useEffect(() => {
        setDataSource({
            id : params.id,
            permissionList : differentPermissionList,
            role: role
        })
    }, [params.id, differentPermissionList, role])

    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <RoleUpdate dataSource={dataSource} callback={loadingData} />
            </div>

            <div className=' col-12'>
                <RoleHasPermissionTableView dataSource={dataSource} callback={loadingData} />
            </div>

        </div>
    )
}
