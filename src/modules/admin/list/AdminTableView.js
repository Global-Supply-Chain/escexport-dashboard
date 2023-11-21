import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPayload } from "../adminPayload";
import { Search } from "../../../shares/Search";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { adminService } from "../adminService";
import { Button } from "primereact/button";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { datetime } from "../../../helpers/datetime";
import { Status } from '../../../shares/Status';
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";

export const AdminTableView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.admin);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const adminList = useRef(state.admins);
    const columns = useRef(adminPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    /**
     * Table Header Render
     */
    const HeaderRender = () => {
        return(
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

        const result = await adminService.index(dispatch);
        if(result.status === 200) {
            adminList.current = result.data;
        }
        
        setLoading(false);
    },[dispatch]);

    useEffect(() => {
        loadingData();
    },[loadingData])

    return(
        <DataTable
            dataKey="id"
            size="normal"
            value={adminList.current}
            lazy={paginateOptions.lazy}
            loading={loading}
            resizableColumns={paginateOptions.resizableColumns}
            emptyMessage="No admin accounts found."
            globalFilterFields={adminPayload.columns}
            paginator
            rows={paginateOptions.rows}
            rowsPerPageOptions={paginateOptions.rowsPerPageOptions} 
            paginatorTemplate={paginateOptions.paginatorTemplate}
            sortMode={paginateOptions.sortMode}
            paginatorLeft={paginateOptions.paginatorLeft}
            paginatorRight={
                <PaginatorRight 
                    show={showAuditColumn}
                    onHandler={(e) => setShowAuditColumn(e)}
                />
            }
            header={<HeaderRender />}
            onSort={(e) => console.log(e)}
        >
           { showColumns.current.map((col, index) => {
                return(
                    <Column 
                        key={`admin_col_index_${index}`} 
                        style={{ minWidth: "250px"}}
                        field={col.field} 
                        header={col.header}
                        sortable
                        body={(value) => {
                            if(col.field === 'status') {
                                return(<Status status={value[col.field]}/>)
                            }

                            if(col.field === 'id') {
                                return(
                                    <label 
                                        className="nav-link" 
                                        onClick={() => navigate(`${paths.admin}/${value[col.field]}`)}
                                    > 
                                        {value[col.field]} 
                                    </label>
                                )
                            }

                            return value[col.field];
                        }}
                    />
                )
           })}

           { showAuditColumn && auditColumns.map((col, index) => {
                return(
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
           }) }
        </DataTable>
    )
}