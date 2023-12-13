import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

export const RoleHasPermissionTableView = ({dataSource}) => {
    return (
        <div>

            <DataTable value={dataSource?.role?.permissions} stripedRows tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="description" header="Description"></Column>
            </DataTable>

        </div>
    )
}
