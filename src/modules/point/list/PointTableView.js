

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
import { setPaginate } from '../pointSlice';

const PointTableView = () => {

    const dispatch = useDispatch();
    const { points,paginateParams } = useSelector(state => state.point);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(pointPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

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

  /**
   * Event - Paginate Page Change
   * @param {*} event 
   */
  const onPageChange = (event) => {
    first.current = event.page * paginateParams.per_page;
    dispatch(
      setPaginate({
        ...paginateParams,
        page: event?.page + 1,
        per_page: event?.rows,
      })
    );
  };

  /**
   * Event - Search
   * @param {*} event 
   */
  const onSearchChange = (event) => {
    dispatch(
      setPaginate({
        ...paginateParams,
        search: event,
      })
    );
  };

  /**
   * Event - Column sorting "DESC | ASC"
   * @param {*} event 
   */
  const onSort =(event) => {
    const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
    console.log(event);
    dispatch(
      setPaginate({
        ...paginateParams,
        sort: sortOrder,
        order: event.sortField
      })
    );
  }

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
            <>

                <div className=' grid align-items-center'>

                    <div className=' col-8 md:col-4 lg:col-3'>
                        <Search
                            tooltipLabel={"search by point id, label, point"}
                            placeholder={"Search point"}
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

        const result = await pointService.index(dispatch,paginateParams);
        if (result.status === 200) {
            total.current = result?.data?.total;
        }

        setLoading(false);
    }, [dispatch,paginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData])

    return (
        <>
            <DataTable
                dataKey="id"
                size="normal"
                value={points}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No point found."
                globalFilterFields={pointPayload.columns}
                header={<HeaderRender />}
                footer={<FooterRender />}
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
                first={first.current}
                rows={paginateParams.per_page}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </>
    )
}

export default PointTableView