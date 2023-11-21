

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../itemService';
import { itemPayload } from '../itemPayload';
import { DataTable } from 'primereact/datatable';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { Status } from '../../../shares/Status';
import { paths } from '../../../constants/paths';
import { datetime } from '../../../helpers/datetime';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';

const ItemTableView = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.item);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const itemList = useRef(state.user);
    const columns = useRef(itemPayload.columns);
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
    
            const result = await itemService.index(dispatch);
            if (result.status === 200) {
                itemList.current = result.data;
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
            value={itemList.current}
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
            emptyMessage="No item found."
            globalFilterFields={itemPayload.columns}
            header={<HeaderRender />}
        >
            {showColumns.current.map((col, index) => {
                return (
                    <Column
                        key={`item_col_index_${index}`}
                        style={{ minWidth: "250px" }}
                        field={col.field}
                        header={col.header}
                        sortable
                        body={(value) => {
                            if (col.field === 'status') {
                                return (<Status status={value[col.field]} />)
                            }

                            if (col.field === 'id') {
                                return (<label className="nav-link" onClick={() => navigate(`${paths.item}/${value[col.field]}`)}> {value[col.field]} </label>)
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
                        style={{ minWidth: "250px" }}
                        field={col.field}
                        header={col.header}
                        sortable
                        body={(value) => <label> {datetime.long(value[col.field])} </label>}
                    />
                )
            })}
        </DataTable>
  )
}

export default ItemTableView