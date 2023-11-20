import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { promotionPayload } from '../promotionPayload';
import { promotionService } from '../promotionService';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { Status } from '../../../shares/Status';
import { paths } from '../../../constants/paths';
import { datetime } from '../../../helpers/datetime';

const PromotionTableView = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.promotion);
    const navigate = useNavigate();    

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const promotionList = useRef(state.user);
    const columns = useRef(promotionPayload.columns);
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

        const result = await promotionService.index(dispatch);
        if (result.status === 200) {
            promotionList.current = result.data;
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
            value={promotionList.current}
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
            emptyMessage="No promotion found."
            globalFilterFields={promotionPayload.columns}
            header={<HeaderRender />}
        >
            {showColumns.current.map((col, index) => {
                return (
                    <Column
                        key={`promotion_col_index_${index}`}
                        style={{ minWidth: "250px" }}
                        field={col.field}
                        header={col.header}
                        sortable
                        body={(value) => {
                            if (col.field === 'status') {
                                return (<Status status={value[col.field]} />)
                            }

                            if (col.field === 'id') {
                                return (<label className="nav-link" onClick={() => navigate(`${paths.promotion}/${value[col.field]}`)}> {value[col.field]} </label>)
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

export default PromotionTableView