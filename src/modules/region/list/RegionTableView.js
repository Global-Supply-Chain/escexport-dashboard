import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { Paginator } from 'primereact/paginator';
import { regionPayload } from '../regionPayload';
import { regionService } from '../regionService';

export const RegionTableView = () => {

    const [params, setParams] = useState(regionPayload?.paginateParams);

    const dispatch = useDispatch();
    const { regions } = useSelector(state => state.region);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const regionList = useRef(regions);
    const total = useRef(0);
    const columns = useRef(regionPayload?.columns);
    const showColumns = useRef(columns?.current?.filter(col => col.show === true));

    const [first, setFirst] = useState(0);


    const onPageChange = (event) => {
        setFirst(event?.first);
        setParams({
            ...params,
            page: event?.page + 1,
            per_page: event?.rows,
        })
    };

    const onSortChange = (event) => {
        if(event) {
            const orderFormat = event?.sortOrder === 1 ? "DESC" : "ASC";
            setParams({
                ...params,
                order: event?.sortField,
                sort : orderFormat
            })
        }
    }

    const onSearchChange = (event) => {
        setParams({
            ...params,
            search: event
        })
    }

    /**
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const result = await regionService.index(dispatch, params);
        if (result.status === 200) {
            regionList.current = result?.data?.data;
            total.current = result?.data?.total;
        }

        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

    const FooterRender = () => {
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
    }

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
                <Search
                    tooltipLabel={"search by name"}
                    placeholder={"Search region"}
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

    return (
        <>

            <DataTable
                dataKey="id"
                size="normal"
                value={regionList.current.length > 0 && regionList.current}
                sortField={params ? params.order : ""}
                sortOrder={params ? params.sort : 1}
                onSort={(e) => onSortChange(e)}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No region found."
                globalFilterFields={regionPayload.columns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns && showColumns.current?.map((col, index) => {
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

                                if (col.field === 'id') {
                                    return (<label className="nav-link" onClick={() => navigate(`${paths.region}/${value[col.field]}`)}> {value[col.field]} </label>)
                                }
                                return value[col.field]

                            }}
                        />
                    )
                })}

                {showAuditColumn && auditColumns?.map((col, index) => {
                    return (
                        <Column
                            key={`audit_column_key_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                if (col.field === 'created_at' || col.field === 'updated_at' || col.field === 'deleted_at') {
                                    return <label> {datetime.long(value[col.field])} </label>
                                } else {
                                    return <label> {value[col.field] && value[col.field].name} </label>
                                }
                            }}
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
