

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userPayload } from '../userPayload';
import { userService } from '../userService';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { Status } from '../../../shares/Status';
import { datetime } from '../../../helpers/datetime';
import { paths } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';

export const UserTableView = () => {

    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const userList = useRef(users);
    const columns = useRef(userPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
                <Search
                    tooltipLabel={"search by admin's id, name, email, phone, status"}
                    placeholder={"Search admin account"}
                    onSearch={(e) => console.log(e)}
                />

                <div className="flex flex-row justify-content-center align-items-center">
                    <Button
                        outlined
                        icon="pi pi-filter"
                        size="small"
                    />
                </div>
            </div>
        )
    }

    /**
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await userService.index(dispatch);
        if (result.status === 200) {
            userList.current = result.data;
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingData();
    }, [loadingData])


    return (
        <DataTable
            dataKey="id"
            size="normal"
            value={userList.current}
            paginator
            rows={paginateOptions.rows}
            rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
            paginatorTemplate={paginateOptions.paginatorTemplate}
            paginatorLeft={paginateOptions.paginatorLeft}
            paginatorRight={
                <PaginatorRight
                    show={showAuditColumn}
                    onHandler={(e) => setShowAuditColumn(e)}
                />
            }
            sortMode={paginateOptions.sortMode}
            loading={loading}
            emptyMessage="No user accounts found."
            globalFilterFields={userPayload.columns}
            header={<HeaderRender />}
        >
            {showColumns.current.map((col, index) => {
                return (
                    <Column
                        key={`user_col_index_${index}`}
                        style={{ minWidth: "250px" }}
                        field={col.field}
                        header={col.header}
                        sortable
                        body={(value) => {
                            if (col.field === 'status') {
                                return (<Status status={value[col.field]} />)
                            }

                            if(col.field === 'email_verified_at' || col.field === 'phone_verified_at') {
                                return (<label> { datetime.long(value[col.field])} </label>)
                            }

                            if (col.field === 'id') {
                                return (<label className="nav-link" onClick={() => navigate(`${paths.user}/${value[col.field]}`)}> {value[col.field]} </label>)
                            }
                            return value[col.field]

                        }}
                    />
                )
            })}

            {showAuditColumn && auditColumns.map((col, index) => {
                return (
                    <Column
                        key={`audit_column_key_${index}`}
                        style={{ minWidth: "250px"}}
                        field={col.field} 
                        header={col.header}
                        sortable
                        body={(value) => {
                            if(col.field === 'created_at' || col.field === 'updated_at' || col.field === 'deleted_at') {
                                return <label> { datetime.long(value[col.field])} </label>
                            } else {
                                return <label> {value[col.field] && value[col.field].name} </label>
                            }
                        }}
                    />
                )
            })}
        </DataTable>
    )
}