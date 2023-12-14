import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import { authorizationPayload } from '../authorizationPayload'
import { InputText } from 'primereact/inputtext'

export const RoleHasPermissionTableView = ({dataSource}) => {

    const columns = useRef(authorizationPayload.roleHasPermissionColumns);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: dataSource?.role?.permissions },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [checkList, setCheckList] = useState([]);

    const onPerChange = (e) => {
        let permission = [...checkList];

        if (e.checked)
            permission.push(e.value);
        else
            permission = permission.filter(per => per !== e.value);

        setCheckList(permission);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        // let _filters = { ...filters };

        // _filters['global'].value = value;

        setFilters(filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    useEffect(() => {
        if(dataSource){
            setFilters(dataSource?.role?.permissions)
        }
    }, [dataSource])

    return (
        <div>

            <DataTable 
                dataKey='id'
                value={dataSource?.role?.permissions}
                stripedRows 
                filterDisplay="row"
                filters={filters}
                tableStyle={{ minWidth: '50rem' }}
                globalFilterFields={['id','name']}
                header={header}
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

                                if(col.field === 'action') {
                                    return (
                                        <Checkbox 
                                        inputId={value.id}
                                        value={value.id}
                                        checked={checkList.some((che) => che === value.id)}
                                        onChange={onPerChange}
                                        multiple
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
