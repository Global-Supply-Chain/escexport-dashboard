import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useRef, useState } from 'react'
import { authorizationPayload } from '../authorizationPayload'

export const RoleHasPermissionTableView = ({dataSource}) => {

    const columns = useRef(authorizationPayload.roleHasPermissionColumns);
    const [checked, setChecked] = useState();
    const [checkList, setCheckList] = useState([]);
    console.log(checkList);

    return (
        <div>

            <DataTable 
                value={dataSource?.role?.permissions} 
                stripedRows 
                tableStyle={{ minWidth: '50rem' }}
            >
                {
                    columns.current?.map((col,index) => {
                        return (
                            <Column
                            key={`role_has_per_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {

                                // if (col.field === 'id') {
                                //     return (<label className="nav-link" onClick={() => navigate(`${paths.role}/${value[col.field]}`)}> {value[col.field]} </label>)
                                // }

                                if(col.field === 'action') {
                                    return (
                                            <input 
                                            type="checkbox" 
                                            id="scales" 
                                            name="scales"
                                            onChange={e => {
                                                setChecked(e.checked);
                                                setCheckList([
                                                    ...checkList,
                                                    value.id
                                                ])
                                            }}
                                            checked={checked}
                                            />
                                        )
                                }

                                return value[col.field]

                            }}
                            />
                        )
                    })
                }
                
            </DataTable>

        </div>
    )
}
