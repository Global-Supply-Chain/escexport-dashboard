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
import { Paginator } from 'primereact/paginator';

const PromotionTableView = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.promotion);
    const navigate = useNavigate();

    const [first, setFirst] = useState(0);
    const [params, setParams] = useState(promotionPayload?.paginateParams);
    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const promotionList = useRef(state.user);
    const total = useRef(0);
    const columns = useRef(promotionPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));


    const onPageChange = (event) => {
        setFirst(event?.first);
        setParams({
            ...params,
            page: event?.page + 1,
            per_page: event?.rows,
        })
    };

    const onSortChange = (event) => {
        if (event) {
            const orderFormat = event?.sortOrder === 1 ? "DESC" : "ASC";
            setParams({
                ...params,
                order: event?.sortField,
                sort: orderFormat
            })
        }
    }

    const onSearchChange = (event) => {
        setParams({
            ...params,
            search: event
        })
    }

    const footer = useCallback(() => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div>Total - <span style={{ color: "#4338CA" }}>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => loadingData()}
                    />
                    <PaginatorRight
                        show={showAuditColumn}
                        onHandler={(e) => setShowAuditColumn(e)}
                    />
                </div>
            </div>
        )
    }, [total, showAuditColumn])

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
                <Search
                    tooltipLabel={"search by admin's id, name, email, phone, status"}
                    placeholder={"Search admin account"}
                    onSearch={(e) => onSearchChange(e)}
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

        const result = await promotionService.index(dispatch,params);
        if (result.status === 200) {
            promotionList.current = result?.data?.data;
            total.current = result?.data?.total;
        }

        setLoading(false);
    }, [dispatch,params]);

    useEffect(() => {
        loadingData();
    }, [loadingData])




    return (
        <>

            <DataTable
                dataKey="id"
                size="normal"
                value={promotionList.current?.length > 0 && promotionList?.current}
                sortField={params ? params.order : ""}
                sortOrder={params ? params.sort : 1}
                onSort={(e) => onSortChange(e)}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No promotion found."
                globalFilterFields={promotionPayload.columns}
                header={<HeaderRender />}
                footer={footer}
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
            <Paginator
                first={first}
                rows={params.per_page ? params.per_page : paginateOptions.rows}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                onPageChange={onPageChange}
            />

        </>
    )
}

export default PromotionTableView