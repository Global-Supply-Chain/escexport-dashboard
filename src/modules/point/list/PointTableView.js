

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { auditColumns, paginateOptions } from '../../../constants/config';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { paths } from '../../../constants/paths';
import { datetime } from '../../../helpers/datetime';
import { Search } from '../../../shares/Search';
import { Calendar } from 'primereact/calendar';
import { pointPayload } from '../pointPayload';
import { pointService } from '../pointSerivce';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

const PointTableView = () => {

    const dispatch = useDispatch();
    const { points } = useSelector(state => state.point);
    const navigate = useNavigate();

    const [params, setParams] = useState(pointPayload.paginateParams);
    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const pointList = useRef(points);
    const total = useRef(0);
    const columns = useRef(pointPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

    const [first, setFirst] = useState(0);

    const dropdown = [
        {
            label: "Item",
            value: "T0001"
        },
        {
            label: "Item",
            value: "T0001"
        },
        {
            label: "Item",
            value: "T0001"
        }
    ];

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
            <>

                <div className=' grid align-items-center'>

                    <div className=' col-8 md:col-4 lg:col-3'>
                        <Search
                            tooltipLabel={"search by admin's id, name, email, phone"}
                            placeholder={"Search admin account"}
                            onSearch={(e) => onSearchChange(e)}
                        />
                    </div>

                    <div className=' col-12 lg:col-4'>
                        <label className=' block mb-1'>Select a point</label>
                        <Dropdown
                            options={dropdown}
                            placeholder="Select a point"
                            // disabled={loading}
                            // value={payload.label}
                            className="p-inputtext-sm text-black"
                        // onChange={(e) => payloadHandler(payload, e.value, 'label', (updateValue) => {
                        //     setPayload(updateValue);
                        // })}
                        />
                    </div>

                    <div className=' col-12 lg:col-5 block md:flex align-items-center justify-content-between'>
                        <div>
                            <label className=' block mb-1'>Start Date:</label>
                            <Calendar
                                placeholder='Select a start date'
                                className=' p-inputtext-sm'
                            />
                        </div>
                        <div className=' mt-3 md:mt-0'>
                            <label className=' block mb-1'>End Date:</label>
                            <Calendar
                                placeholder='Select a end date'
                                className=' p-inputtext-sm'
                            />
                        </div>
                    </div>

                </div>

                {/* <div className="w-full flex flex-column md:flex-row justify-content-between align-items-start">
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
                </div> */}

            </>
        )
    }


    /**
     *  Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await pointService.index(dispatch,params);
        if (result.status === 200) {
            pointList.current = result?.data?.data;
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
                value={pointList.current?.length > 0 && pointList.current}
                sortField={params ? params.order : ""}
                sortOrder={params ? params.sort : 1}
                onSort={(e) => onSortChange(e)}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No point found."
                globalFilterFields={pointPayload.columns}
                header={<HeaderRender />}
                footer={footer}
            >
                {showColumns.current.map((col, index) => {
                    return (
                        <Column
                            key={`point_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {

                                if (col.field === 'id') {
                                    return (<label className="nav-link" onClick={() => navigate(`${paths.point}/${value[col.field]}`)}> {value[col.field]} </label>)
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

export default PointTableView